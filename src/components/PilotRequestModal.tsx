import { useEffect, useRef, useState } from "react";
import { savePilotRequest } from "../utils/pilotRequest";

interface PilotRequestModalProps {
  isOpen: boolean;
  openerElement: HTMLElement | null;
  onClose: () => void;
}

type SubmitState = "idle" | "saved" | "error";

const FIELD_NAMES = [
  "fullName",
  "phoneNumber",
  "emailAddress",
  "organisationName",
] as const;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function isVisibleElement(el: HTMLElement): boolean {
  if (el.closest("[hidden]")) return false;
  return el.offsetParent !== null || el.getClientRects().length > 0;
}

function clearFormCustomValidity(form: HTMLFormElement | null) {
  if (!form) return;
  for (const name of FIELD_NAMES) {
    const el = form.elements.namedItem(name);
    if (el instanceof HTMLInputElement) {
      el.setCustomValidity("");
    }
  }
}

export function PilotRequestModal({
  isOpen,
  openerElement,
  onClose,
}: PilotRequestModalProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const anotherRequestBtnRef = useRef<HTMLButtonElement>(null);
  const isSubmittingRef = useRef(false);
  const wasOpenRef = useRef(false);
  const focusFirstFieldOnIdleRef = useRef(false);

  // Reset form cleanly on each open and return focus to opener on close
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      isSubmittingRef.current = false;
      focusFirstFieldOnIdleRef.current = false;
      setSubmitState("idle");
      if (formRef.current) {
        clearFormCustomValidity(formRef.current);
        formRef.current.reset();
      }

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialogRef.current?.focus();

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      if (openerElement && openerElement.isConnected) {
        openerElement.focus();
      }
    }
  }, [isOpen, openerElement]);

  // Move focus cleanly after submitting or starting another request
  useEffect(() => {
    if (!isOpen) return;
    if (submitState === "saved") {
      anotherRequestBtnRef.current?.focus();
    } else if (submitState === "idle" && focusFirstFieldOnIdleRef.current) {
      focusFirstFieldOnIdleRef.current = false;
      fullNameRef.current?.focus();
    }
  }, [isOpen, submitState]);

  // Escape key close & focus trap inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter(isVisibleElement);

        if (focusable.length === 0) {
          event.preventDefault();
          dialogRef.current.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          if (!active || active === dialogRef.current || active === first || !dialogRef.current.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (!active || active === last || !dialogRef.current.contains(active)) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingRef.current || submitState === "saved") {
      return;
    }

    const form = event.currentTarget;
    isSubmittingRef.current = true;

    try {
      const record = savePilotRequest(form);
      if (!record) {
        isSubmittingRef.current = false;
        return;
      }

      clearFormCustomValidity(form);
      form.reset();
      setSubmitState("saved");
    } catch {
      isSubmittingRef.current = false;
      setSubmitState("error");
    }
  };

  const handleStartAnother = () => {
    isSubmittingRef.current = false;
    focusFirstFieldOnIdleRef.current = true;
    setSubmitState("idle");
    if (formRef.current) {
      clearFormCustomValidity(formRef.current);
      formRef.current.reset();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pilot-modal-title"
        aria-describedby="pilot-modal-desc"
        tabIndex={-1}
      >
        <div className="modal-dialog__header">
          <div>
            <p className="modal-dialog__eyebrow">
              Founding pilot · April–May 2027
            </p>
            <h2 id="pilot-modal-title" className="modal-dialog__title">
              Request a Pilot
            </h2>
          </div>
          <button
            type="button"
            className="modal-dialog__close"
            aria-label="Close modal"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <p id="pilot-modal-desc" className="modal-dialog__desc">
          Planned for eight independent venues across Bexley, Dartford and
          neighbouring south-east London boroughs.
        </p>

        {submitState === "saved" && (
          <div className="modal-confirmation">
            <div
              className="status-banner status-banner--success"
              role="status"
              aria-live="polite"
            >
              Your pilot request has been saved in this browser.
            </div>
            <div className="modal-actions">
              <button
                ref={anotherRequestBtnRef}
                type="button"
                className="btn btn--secondary"
                onClick={handleStartAnother}
              >
                Save another request
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <form
          ref={formRef}
          className="pilot-form"
          hidden={submitState === "saved"}
          onSubmit={handleSubmit}
        >
          {submitState === "error" && (
            <div className="status-banner status-banner--error" role="alert">
              This browser could not save your request. Your details are still in
              the form.
            </div>
          )}

          <div className="form-field">
            <label htmlFor="pilot-full-name" className="form-field__label">
              Full Name
            </label>
            <input
              ref={fullNameRef}
              id="pilot-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              className="form-field__input"
            />
          </div>

          <div className="form-field">
            <label htmlFor="pilot-phone" className="form-field__label">
              Phone Number
            </label>
            <input
              id="pilot-phone"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              required
              className="form-field__input"
            />
          </div>

          <div className="form-field">
            <label htmlFor="pilot-email" className="form-field__label">
              Email Address
            </label>
            <input
              id="pilot-email"
              name="emailAddress"
              type="email"
              autoComplete="email"
              required
              className="form-field__input"
            />
          </div>

          <div className="form-field">
            <label htmlFor="pilot-organisation" className="form-field__label">
              Organisation Name
            </label>
            <input
              id="pilot-organisation"
              name="organisationName"
              type="text"
              autoComplete="organization"
              required
              className="form-field__input"
            />
          </div>

          <p className="pilot-form__note">
            This form saves your request in this browser only. It does not send
            your details to TillProof.
          </p>

          <div className="modal-actions">
            <button type="submit" className="btn btn--primary">
              Save pilot request
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
