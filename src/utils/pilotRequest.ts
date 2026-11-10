export interface PilotRequestRecord {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  organisationName: string;
  submissionDateTime: string;
}

const REQUIRED_FIELDS = [
  "fullName",
  "phoneNumber",
  "emailAddress",
  "organisationName",
] as const;

type PilotFieldName = (typeof REQUIRED_FIELDS)[number];

function createRecordId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function savePilotRequest(form: HTMLFormElement): PilotRequestRecord | null {
  if (!form.reportValidity()) return null;

  const values = new FormData(form);
  const record: Partial<Record<PilotFieldName, string>> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = String(values.get(field) ?? "").trim();
    if (!value) {
      const element = form.elements.namedItem(field);
      if (element instanceof HTMLInputElement) {
        element.setCustomValidity("Please complete this field.");
        element.reportValidity();
        element.addEventListener("input", () => element.setCustomValidity(""), {
          once: true,
        });
      }
      return null;
    }
    record[field] = value;
  }

  const completedRecord: PilotRequestRecord = {
    fullName: record.fullName!,
    phoneNumber: record.phoneNumber!,
    emailAddress: record.emailAddress!,
    organisationName: record.organisationName!,
    submissionDateTime: new Date().toISOString(),
  };

  const key = "tillproof.pilotRequest." + createRecordId();
  localStorage.setItem(key, JSON.stringify(completedRecord));
  return completedRecord;
}
