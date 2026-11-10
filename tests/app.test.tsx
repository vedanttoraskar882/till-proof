import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "../src/App";

describe("TillProof landing page", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders the seven sections in exact order", () => {
    const { container } = render(<App />);
    const ids = Array.from(
      container.querySelectorAll("main > section, footer")
    ).map((el) => el.id);

    expect(ids).toEqual([
      "home",
      "about",
      "platform",
      "how-it-works",
      "market-pricing",
      "faq",
      "footer",
    ]);
  });

  it("displays exact pricing data, pilot terms and the £299.90 Growth worked example", () => {
    render(<App />);
    const pricing = screen.getByRole("region", { name: /founding pilot terms/i });
    expect(pricing).toHaveTextContent("£0 in TillProof platform fees");
    expect(pricing).toHaveTextContent("Venues still fund their agreed creator payments");

    const table = screen.getByRole("table");
    expect(table).toHaveTextContent("Pay-as-you-go");
    expect(table).toHaveTextContent("£0 per month");
    expect(table).toHaveTextContent("£2.50");
    expect(table).toHaveTextContent("20%");
    expect(table).toHaveTextContent("June 2027");

    expect(table).toHaveTextContent("Growth");
    expect(table).toHaveTextContent("£59 per site per month");
    expect(table).toHaveTextContent("£0.75");
    expect(table).toHaveTextContent("12%");
    expect(table).toHaveTextContent("July 2027");

    expect(table).toHaveTextContent("Multi-site");
    expect(table).toHaveTextContent("£199 per group of up to 10 sites per month");
    expect(table).toHaveTextContent("July 2028");

    expect(table).toHaveTextContent("Pro");
    expect(table).toHaveTextContent("£99 per site per month");
    expect(table).toHaveTextContent("£0.40");
    expect(table).toHaveTextContent("10%");
    expect(table).toHaveTextContent("January 2029");

    const worked = screen.getByText(/Example month on Growth/i).closest("article")!;
    expect(worked).toHaveTextContent("£195.00");
    expect(worked).toHaveTextContent("£104.90");
    expect(worked).toHaveTextContent("£299.90");
  });

  it("opens the same modal from all four Request a Pilot buttons and closes on Escape", () => {
    render(<App />);
    const buttons = screen.getAllByRole("button", { name: "Request a Pilot" });
    expect(buttons).toHaveLength(4);

    for (const button of buttons) {
      fireEvent.click(button);
      const dialog = screen.getByRole("dialog", { name: "Request a Pilot" });
      expect(dialog).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });
      expect(
        screen.queryByRole("dialog", { name: "Request a Pilot" })
      ).not.toBeInTheDocument();
    }
  });

  it("saves two distinct pilot requests in localStorage preserving phone strings and timestamps", () => {
    render(<App />);
    const [headerBtn] = screen.getAllByRole("button", {
      name: "Request a Pilot",
    });
    fireEvent.click(headerBtn);

    const dialog = screen.getByRole("dialog");
    fireEvent.change(within(dialog).getByLabelText("Full Name"), {
      target: { value: "Priya Patel" },
    });
    fireEvent.change(within(dialog).getByLabelText("Phone Number"), {
      target: { value: "07700 900123" },
    });
    fireEvent.change(within(dialog).getByLabelText("Email Address"), {
      target: { value: "priya@spicekitchen.example" },
    });
    fireEvent.change(within(dialog).getByLabelText("Organisation Name"), {
      target: { value: "Bexley Spice Kitchen" },
    });

    fireEvent.click(
      within(dialog).getByRole("button", { name: "Save pilot request" })
    );

    expect(
      within(dialog).getByText(
        "Your pilot request has been saved in this browser."
      )
    ).toBeInTheDocument();

    // Start a second intentional request
    fireEvent.click(
      within(dialog).getByRole("button", { name: "Save another request" })
    );

    fireEvent.change(within(dialog).getByLabelText("Full Name"), {
      target: { value: "David Green" },
    });
    fireEvent.change(within(dialog).getByLabelText("Phone Number"), {
      target: { value: "+44 20 7946 0018" },
    });
    fireEvent.change(within(dialog).getByLabelText("Email Address"), {
      target: { value: "david@dartfordcafe.example" },
    });
    fireEvent.change(within(dialog).getByLabelText("Organisation Name"), {
      target: { value: "Dartford Corner Café" },
    });

    fireEvent.click(
      within(dialog).getByRole("button", { name: "Save pilot request" })
    );

    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("tillproof.pilotRequest.")
    );
    expect(keys).toHaveLength(2);

    const records = keys.map((k) => JSON.parse(localStorage.getItem(k)!));
    const priya = records.find((r) => r.fullName === "Priya Patel");
    const david = records.find((r) => r.fullName === "David Green");

    expect(priya).toMatchObject({
      fullName: "Priya Patel",
      phoneNumber: "07700 900123",
      emailAddress: "priya@spicekitchen.example",
      organisationName: "Bexley Spice Kitchen",
    });
    expect(typeof priya.submissionDateTime).toBe("string");
    expect(Number.isNaN(Date.parse(priya.submissionDateTime))).toBe(false);

    expect(david).toMatchObject({
      fullName: "David Green",
      phoneNumber: "+44 20 7946 0018",
      emailAddress: "david@dartfordcafe.example",
      organisationName: "Dartford Corner Café",
    });
    expect(typeof david.submissionDateTime).toBe("string");
  });

  it("rejects empty, invalid email, and whitespace-only organisation name without writing to localStorage", () => {
    render(<App />);
    fireEvent.click(
      screen.getAllByRole("button", { name: "Request a Pilot" })[0]
    );
    const dialog = screen.getByRole("dialog");
    const form = dialog.querySelector("form")!;

    // 1. Empty submit
    fireEvent.submit(form);
    expect(localStorage.length).toBe(0);

    // 2. Invalid email
    fireEvent.change(within(dialog).getByLabelText("Full Name"), {
      target: { value: "Amina Khan" },
    });
    fireEvent.change(within(dialog).getByLabelText("Phone Number"), {
      target: { value: "07700900456" },
    });
    fireEvent.change(within(dialog).getByLabelText("Email Address"), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(within(dialog).getByLabelText("Organisation Name"), {
      target: { value: "Greenwich Grill" },
    });
    fireEvent.submit(form);
    expect(localStorage.length).toBe(0);

    // 3. Whitespace-only organisation name
    fireEvent.change(within(dialog).getByLabelText("Email Address"), {
      target: { value: "amina@grill.example" },
    });
    fireEvent.change(within(dialog).getByLabelText("Organisation Name"), {
      target: { value: "    " },
    });
    fireEvent.submit(form);
    expect(localStorage.length).toBe(0);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("retains form values and shows error message when storage write fails", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("QuotaExceededError");
    });

    render(<App />);
    fireEvent.click(
      screen.getAllByRole("button", { name: "Request a Pilot" })[0]
    );
    const dialog = screen.getByRole("dialog");
    const form = dialog.querySelector("form")!;

    const fullName = within(dialog).getByLabelText("Full Name") as HTMLInputElement;
    const phone = within(dialog).getByLabelText("Phone Number") as HTMLInputElement;
    const email = within(dialog).getByLabelText("Email Address") as HTMLInputElement;
    const org = within(dialog).getByLabelText("Organisation Name") as HTMLInputElement;

    fireEvent.change(fullName, { target: { value: "Sam Taylor" } });
    fireEvent.change(phone, { target: { value: "01322 555010" } });
    fireEvent.change(email, { target: { value: "sam@bakery.example" } });
    fireEvent.change(org, { target: { value: "Erith Bakery" } });

    fireEvent.submit(form);

    expect(
      within(dialog).getByText(
        "This browser could not save your request. Your details are still in the form."
      )
    ).toBeInTheDocument();

    expect(fullName.value).toBe("Sam Taylor");
    expect(phone.value).toBe("01322 555010");
    expect(email.value).toBe("sam@bakery.example");
    expect(org.value).toBe("Erith Bakery");
  });

  it("operates FAQ accordions accessibly", () => {
    render(<App />);
    const firstTrigger = screen.getByRole("button", {
      name: /What counts as a verified cover\?/i,
    });
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/The per-cover fee is charged after owner approval\./i)
    ).toBeVisible();

    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
  });
});
