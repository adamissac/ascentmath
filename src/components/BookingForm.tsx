"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Button from "./Button";
import {
  BookingPricingFields,
  SelectField,
} from "./BookingPricingFields";
import StudyPathsLink from "./StudyPathsLink";
import {
  describeBookingSelection,
  type TutoringTierId,
} from "../data/pricing";

type Mode = "zoom" | "in_person";
type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  phone: string;
  tier: TutoringTierId;
  mode: Mode;
  grade: string;
  topic: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  website: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  tier: "tier2",
  mode: "zoom",
  grade: "",
  topic: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
  website: "",
};

const RECIPIENT_EMAIL = "adamissac08@gmail.com";

const GRADE_OPTIONS = [
  { value: "K", label: "Kindergarten" },
  { value: "1", label: "1st grade" },
  { value: "2", label: "2nd grade" },
  { value: "3", label: "3rd grade" },
  { value: "4", label: "4th grade" },
  { value: "5", label: "5th grade" },
  { value: "6", label: "6th grade" },
  { value: "7", label: "7th grade" },
  { value: "8", label: "8th grade" },
  { value: "9", label: "9th grade" },
  { value: "10", label: "10th grade" },
  { value: "11", label: "11th grade" },
  { value: "12", label: "12th grade" },
  { value: "college", label: "College / university" },
  { value: "other", label: "Other / not in school" },
] as const;

const MODE_OPTIONS = [
  { value: "zoom", label: "Zoom (online)" },
  { value: "in_person", label: "In-person (Atlanta area)" },
] as const;

function buildMailtoLink(form: FormState) {
  const mode = form.mode === "zoom" ? "Zoom (online)" : "In-person";
  const body = [
    `Hi Adam,`,
    ``,
    `I'd like to book a tutoring session.`,
    ``,
    `Selection: ${describeBookingSelection(form.tier)}`,
    ``,
    `Name: ${form.name || "(not provided)"}`,
    `Email: ${form.email || "(not provided)"}`,
    form.phone ? `Phone: ${form.phone}` : null,
    `Mode: ${mode}`,
    form.grade ? `Grade: ${form.grade}` : null,
    form.topic ? `Topic: ${form.topic}` : null,
    form.preferredDate ? `Preferred date: ${form.preferredDate}` : null,
    form.preferredTime ? `Preferred time: ${form.preferredTime}` : null,
    form.notes ? `\nNotes:\n${form.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const params = new URLSearchParams({
    subject: "Book a class - Adam's Alphabet",
    body,
  });
  return `mailto:${RECIPIENT_EMAIL}?${params.toString()}`;
}

type BookingFormProps = {
  /** Tighter two-column card for the homepage booking section. */
  layout?: "default" | "square";
};

export default function BookingForm({ layout = "default" }: BookingFormProps) {
  const isSquare = layout === "square";
  const formGap = isSquare ? "gap-4" : "gap-5";
  const fieldGrid = "grid sm:grid-cols-2 gap-5";
  const squareGrid = "grid gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4";
  const [form, setForm] = useState<FormState>(INITIAL);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bookingConfigured, setBookingConfigured] = useState<boolean | null>(null);
  const submittingRef = useRef(false);

  const minDate = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const mailtoHref = useMemo(() => buildMailtoLink(form), [form]);

  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setBookingConfigured((prev) => (prev === null ? false : prev));
    }, 4000);

    fetch("/api/book")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setBookingConfigured(Boolean(data?.configured));
      })
      .catch(() => {
        if (!cancelled) setBookingConfigured(false);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (serverErrors[key]) {
      setServerErrors((s) => {
        const rest = { ...s };
        delete rest[key];
        return rest;
      });
    }
  };

  const errors = {
    name: !form.name.trim()
      ? "Please tell me your name."
      : form.name.trim().length < 2
        ? "Name looks too short."
        : "",
    email: !form.email.trim()
      ? "Please enter your email."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? "That doesn't look like a valid email."
        : "",
  };

  const clientValid = !errors.name && !errors.email;

  function showError(key: keyof typeof errors) {
    return touched[key] ? errors[key] : serverErrors[key] || "";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return;
    setTouched({ name: true, email: true });
    setErrorMsg(null);

    if (!clientValid) return;
    if (bookingConfigured === null) return;

    if (bookingConfigured === false) {
      window.location.href = mailtoHref;
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        if (data?.fieldErrors) setServerErrors(data.fieldErrors);
        setErrorMsg(
          data?.error ||
            "We couldn't send your request. Please try again or email Adam directly.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg(
        "Network error — please check your connection and try again, or email Adam directly.",
      );
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  function reset() {
    setForm(INITIAL);
    setTouched({});
    setServerErrors({});
    setStatus("idle");
    setErrorMsg(null);
  }

  if (status === "success") {
    return (
      <SuccessPanel
        name={form.name}
        estimate={describeBookingSelection(form.tier)}
        onReset={reset}
      />
    );
  }

  return (
    <>
      {bookingConfigured === false && (
        <div
          role="status"
          className="mb-6 rounded-lg border border-[var(--color-brand-100)] bg-[var(--color-brand-50)] p-4"
        >
          <p className="small font-semibold text-[var(--color-ink)]">
            Send through your email app
          </p>
          <p className="caption text-[var(--color-ink-muted)] mt-1 leading-relaxed">
            Fill this out, then click the button — your email app opens with everything ready.
          </p>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        noValidate
        className={[
          "grid",
          formGap,
          isSquare &&
            "[&_.input]:rounded-[var(--radius-sm)] [&_.select]:rounded-[var(--radius-sm)] [&_.textarea]:rounded-[var(--radius-sm)]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {isSquare ? (
          <div className={squareGrid}>
            <Field
              id="book-name"
              label="Your name"
              required
              value={form.name}
              onChange={(v) => set("name", v)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              error={showError("name")}
              placeholder="Alex Garcia"
              autoComplete="name"
            />
            <Field
              id="book-phone"
              label="Phone"
              type="tel"
              optional
              value={form.phone}
              onChange={(v) => set("phone", v)}
              placeholder="(555) 123-4567"
              autoComplete="tel"
            />
            <Field
              id="book-email"
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(v) => set("email", v)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              error={showError("email")}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <SelectField
              id="book-mode"
              label="Session format"
              required
              value={form.mode}
              onChange={(v) => set("mode", v as Mode)}
              options={MODE_OPTIONS}
            />
            <SelectField
              id="book-grade"
              label="Current grade"
              optional
              value={form.grade}
              onChange={(v) => set("grade", v)}
              placeholder="Select grade"
              options={GRADE_OPTIONS}
            />
            <Field
              id="book-topic"
              label="Topic or focus"
              optional
              value={form.topic}
              onChange={(v) => set("topic", v)}
              placeholder="e.g. fractions, AP Calc AB"
            />
            <div className="sm:col-span-2">
              <BookingPricingFields
                tierId={form.tier}
                onTier={(id) => set("tier", id)}
                compact
              />
            </div>
            <Field
              id="book-date"
              label="Preferred date"
              optional
              type="date"
              value={form.preferredDate}
              onChange={(v) => set("preferredDate", v)}
              min={minDate}
            />
            <Field
              id="book-time"
              label="Preferred time"
              optional
              type="time"
              value={form.preferredTime}
              onChange={(v) => set("preferredTime", v)}
            />
            <div className="sm:col-span-2">
              <label className="label" htmlFor="book-notes">
                Notes{" "}
                <span className="text-[var(--color-ink-soft)] font-normal">(optional)</span>
              </label>
              <textarea
                id="book-notes"
                className="textarea"
                rows={2}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="What you want to work on, scheduling constraints…"
                maxLength={2000}
              />
              <p className="caption text-[var(--color-ink-soft)] mt-1 text-right tabular-nums">
                {form.notes.length}/2000
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className={fieldGrid}>
              <Field
                id="book-name"
                label="Your name"
                required
                value={form.name}
                onChange={(v) => set("name", v)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                error={showError("name")}
                placeholder="Alex Garcia"
                autoComplete="name"
              />
              <Field
                id="book-phone"
                label="Phone"
                type="tel"
                optional
                value={form.phone}
                onChange={(v) => set("phone", v)}
                placeholder="(555) 123-4567"
                autoComplete="tel"
              />
            </div>

            <div className={fieldGrid}>
              <Field
                id="book-email"
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(v) => set("email", v)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                error={showError("email")}
                placeholder="you@example.com"
                autoComplete="email"
              />
              <SelectField
                id="book-mode"
                label="Session format"
                required
                value={form.mode}
                onChange={(v) => set("mode", v as Mode)}
                options={MODE_OPTIONS}
              />
            </div>

            <div className={fieldGrid}>
              <SelectField
                id="book-grade"
                label="Current grade"
                optional
                value={form.grade}
                onChange={(v) => set("grade", v)}
                placeholder="Select grade"
                options={GRADE_OPTIONS}
              />
              <Field
                id="book-topic"
                label="Topic or focus"
                optional
                value={form.topic}
                onChange={(v) => set("topic", v)}
                placeholder="e.g. fractions, AP Calc AB"
              />
            </div>

            <BookingPricingFields tierId={form.tier} onTier={(id) => set("tier", id)} />

            <div className={fieldGrid}>
              <Field
                id="book-date"
                label="Preferred date"
                optional
                type="date"
                value={form.preferredDate}
                onChange={(v) => set("preferredDate", v)}
                min={minDate}
              />
              <Field
                id="book-time"
                label="Preferred time"
                optional
                type="time"
                value={form.preferredTime}
                onChange={(v) => set("preferredTime", v)}
              />
            </div>

            <div>
              <label className="label" htmlFor="book-notes">
                Notes{" "}
                <span className="text-[var(--color-ink-soft)] font-normal">(optional)</span>
              </label>
              <textarea
                id="book-notes"
                className="textarea"
                rows={4}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="What you want to work on, time zone, scheduling constraints…"
                maxLength={2000}
              />
              <p className="caption text-[var(--color-ink-soft)] mt-1.5 text-right tabular-nums">
                {form.notes.length}/2000
              </p>
            </div>
          </>
        )}

        <div hidden>
          <label htmlFor="book-honeypot">Leave blank</label>
          <input
            id="book-honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="rounded-md border border-[#F1C5C1] bg-[#FDF1F0] p-4 animate-fade-up"
          >
            <p className="small font-semibold text-[var(--color-danger)]">
              Couldn&apos;t send your request
            </p>
            <p className="caption text-[var(--color-ink-muted)] mt-1">{errorMsg}</p>
            <a href={mailtoHref} className="btn btn-outline btn-sm mt-3 inline-flex">
              Email Adam instead
            </a>
          </div>
        )}

        <Button
          type="submit"
          disabled={status === "submitting" || bookingConfigured === null}
          size="lg"
          className={isSquare ? "w-full !rounded-[var(--radius-sm)]" : "w-full"}
          rightIcon={status === "submitting" ? <Spinner /> : <Arrow />}
        >
          {status === "submitting"
            ? "Sending…"
            : bookingConfigured === false
              ? "Open email to send"
              : "Request a session"}
        </Button>

        <p className="caption text-center text-[var(--color-ink-muted)] leading-relaxed">
          {bookingConfigured === false ? (
            <>
              Opens your email app to{" "}
              <span className="font-medium text-[var(--color-ink)]">{RECIPIENT_EMAIL}</span>.
              Nothing is stored on this site.
            </>
          ) : (
            <>
              Sent to{" "}
              <span className="font-medium text-[var(--color-ink)]">{RECIPIENT_EMAIL}</span>.
              Adam replies within about a day with times and your tier&apos;s rate.
            </>
          )}
        </p>
      </form>
    </>
  );
}

function SuccessPanel({
  name,
  estimate,
  onReset,
}: {
  name: string;
  estimate: string;
  onReset: () => void;
}) {
  return (
    <div className="text-center py-4 animate-fade-up" role="status" aria-live="polite">
      <div className="mx-auto w-14 h-14 rounded-full bg-[var(--color-brand-50)] grid place-items-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-brand-600)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h3 className="font-display font-bold text-2xl mt-5 leading-[1.25] text-[var(--color-brand-700)]">
        Request received
        {name ? `, ${name.split(" ")[0]}` : ""}
      </h3>
      <p className="small text-[var(--color-ink-muted)] mt-3 max-w-sm mx-auto leading-relaxed">
        Adam will follow up by call or email to confirm times and pricing for your level.
      </p>

      <ul className="mt-7 grid gap-3 text-left max-w-sm mx-auto">
        <SuccessRow label="Delivered to" value={RECIPIENT_EMAIL} />
        <SuccessRow label="Reply time" value="Within 24 hours, usually" />
        <SuccessRow label="Selection" value={estimate} />
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={onReset} className="btn btn-outline btn-sm">
          Send another request
        </button>
        <StudyPathsLink className="btn btn-ghost btn-sm">Browse study paths →</StudyPathsLink>
      </div>
    </div>
  );
}

function SuccessRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start justify-between gap-4 py-3 border-b border-[var(--color-border)] last:border-b-0">
      <span className="caption uppercase tracking-wider text-[var(--color-ink-soft)] font-semibold">
        {label}
      </span>
      <span className="small font-semibold text-[var(--color-ink)] text-right">{value}</span>
    </li>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  optional,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  autoComplete,
  min,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  min?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-[var(--color-danger)]">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-[var(--color-ink-soft)]">(optional)</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        min={min}
      />
      {error && (
        <p id={`${id}-error`} className="error-text mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
