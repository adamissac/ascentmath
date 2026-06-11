"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import StudyPathsLink from "./StudyPathsLink";
import {
  SESSION_TYPE_LABELS,
  type SessionType,
} from "../lib/contactEmail";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  school: string;
  grade: string;
  sessionType: SessionType;
  message: string;
  website: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  school: "",
  grade: "",
  sessionType: "tutoring",
  message: "",
  website: "",
};

const FALLBACK_RECIPIENT = "adamissac08@gmail.com";

const SESSION_TYPES = Object.keys(SESSION_TYPE_LABELS) as SessionType[];

const GRADE_OPTIONS = [
  { value: "Elementary (K-5)", label: "Elementary (K-5)" },
  { value: "6th grade", label: "6th grade" },
  { value: "7th grade", label: "7th grade" },
  { value: "8th grade", label: "8th grade" },
  { value: "High school (9-12)", label: "High school (9-12)" },
  { value: "Multiple grades", label: "Multiple grades" },
  { value: "Other", label: "Other / not in school" },
] as const;

type FieldKey = "name" | "email" | "message";

function validateField(key: FieldKey, form: FormState): string {
  switch (key) {
    case "name":
      if (!form.name.trim()) return "Please tell me your name.";
      if (form.name.trim().length < 2) return "Name looks too short.";
      return "";
    case "email":
      if (!form.email.trim()) return "Please enter your email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        return "That doesn't look like a valid email.";
      return "";
    case "message":
      if (!form.message.trim()) return "Please include a message.";
      if (form.message.trim().length < 10)
        return "Please tell me a bit more (at least 10 characters).";
      return "";
  }
}

const FIELD_IDS: Record<FieldKey, string> = {
  name: "contact-name",
  email: "contact-email",
  message: "contact-message",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [recipient, setRecipient] = useState(FALLBACK_RECIPIENT);
  const submittingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setConfigured((prev) => (prev === null ? false : prev));
    }, 4000);

    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setConfigured(Boolean(data?.configured));
        if (typeof data?.recipient === "string" && data.recipient) {
          setRecipient(data.recipient);
        }
      })
      .catch(() => {
        if (!cancelled) setConfigured(false);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((e) => {
        const rest = { ...e };
        delete rest[key];
        return rest;
      });
    }
  };

  const handleBlur = (key: FieldKey) => {
    const message = validateField(key, form);
    setFieldErrors((e) => {
      const next = { ...e };
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return;
    setErrorMsg(null);

    const errors: Record<string, string> = {};
    for (const key of ["name", "email", "message"] as FieldKey[]) {
      const message = validateField(key, form);
      if (message) errors[key] = message;
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const first = (["name", "email", "message"] as FieldKey[]).find((k) => errors[k]);
      if (first) document.getElementById(FIELD_IDS[first])?.focus();
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        if (data?.fieldErrors) setFieldErrors((e) => ({ ...e, ...data.fieldErrors }));
        setErrorMsg(data?.error || "We couldn't send your request. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  function reset() {
    setForm(INITIAL);
    setFieldErrors({});
    setStatus("idle");
    setErrorMsg(null);
  }

  if (status === "success") {
    return (
      <SuccessPanel
        name={form.name}
        email={form.email}
        sessionType={SESSION_TYPE_LABELS[form.sessionType]}
        onReset={reset}
      />
    );
  }

  return (
    <>
      {configured === false && (
        <div
          role="status"
          className="mb-6 rounded-lg border border-[var(--color-brand-100)] bg-[var(--color-brand-50)] p-4"
        >
          <p className="small font-semibold text-[var(--color-ink)]">
            Direct sending is temporarily unavailable
          </p>
          <p className="caption text-[var(--color-ink-muted)] mt-1 leading-relaxed">
            You can still reach Adam directly at the address below.
          </p>
          <CopyableEmail email={recipient} className="mt-2" />
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="grid gap-4">
        {/* Session type pills */}
        <fieldset className="m-0 border-0 p-0">
          <legend className="label">What can Adam help with?</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Session type">
            {SESSION_TYPES.map((t) => {
              const active = form.sessionType === t;
              return (
                <label
                  key={t}
                  className={[
                    "cursor-pointer select-none rounded-full border px-4 py-1.5 text-[0.8125rem] font-semibold transition-colors duration-150",
                    "has-[:focus-visible]:[box-shadow:var(--shadow-focus)]",
                    active
                      ? "border-transparent bg-[var(--color-brand-600)] text-white"
                      : "border-[var(--color-border)] bg-white text-[var(--color-ink-muted)] hover:border-[var(--color-brand-300)] hover:text-[var(--color-brand-600)]",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="sessionType"
                    value={t}
                    checked={active}
                    onChange={() => set("sessionType", t)}
                    className="sr-only"
                  />
                  {SESSION_TYPE_LABELS[t]}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-6">
          <Field
            id={FIELD_IDS.name}
            label="Your name"
            required
            value={form.name}
            onChange={(v) => set("name", v)}
            onBlur={() => handleBlur("name")}
            error={fieldErrors.name}
            placeholder="Alex Garcia"
            autoComplete="name"
          />
          <Field
            id={FIELD_IDS.email}
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(v) => set("email", v)}
            onBlur={() => handleBlur("email")}
            error={fieldErrors.email}
            placeholder="you@school.edu"
            autoComplete="email"
          />
          <Field
            id="contact-school"
            label="School / organization"
            optional
            value={form.school}
            onChange={(v) => set("school", v)}
            placeholder="Jefferson Middle School"
            autoComplete="organization"
          />
          <div>
            <label className="label" htmlFor="contact-grade">
              Grade level{" "}
              <span className="font-normal text-[var(--color-ink-soft)]">(optional)</span>
            </label>
            <select
              id="contact-grade"
              className="select"
              value={form.grade}
              onChange={(e) => set("grade", e.target.value)}
            >
              <option value="">Select a grade…</option>
              {GRADE_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label" htmlFor={FIELD_IDS.message}>
            Message<span className="ml-1 text-[var(--color-danger)]">*</span>
          </label>
          <textarea
            id={FIELD_IDS.message}
            className="textarea"
            rows={5}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            placeholder="Tell me a bit about what you're looking for — class size, curriculum context, or what your student is struggling with."
            maxLength={2000}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          />
          {fieldErrors.message ? (
            <p id="contact-message-error" className="error-text mt-1.5">
              {fieldErrors.message}
            </p>
          ) : (
            <p className="caption text-[var(--color-ink-soft)] mt-1 text-right tabular-nums">
              {form.message.length}/2000
            </p>
          )}
        </div>

        <div hidden>
          <label htmlFor="contact-honeypot">Leave blank</label>
          <input
            id="contact-honeypot"
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
            <p className="caption text-[var(--color-ink-muted)] mt-2">
              Or reach Adam directly:
            </p>
            <CopyableEmail email={recipient} className="mt-1" />
          </div>
        )}

        <Button
          type="submit"
          disabled={status === "submitting" || configured !== true}
          size="lg"
          className="w-full"
          rightIcon={status === "submitting" ? <Spinner /> : <Arrow />}
        >
          {status === "submitting" ? "Sending…" : "Send request"}
        </Button>

        <p className="caption text-center text-[var(--color-ink-muted)] leading-relaxed">
          Sent to <span className="font-medium text-[var(--color-ink)]">{recipient}</span>.
          Adam replies within 1–2 days.
        </p>
      </form>
    </>
  );
}

function CopyableEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — the address is
      // still selectable text.
    }
  }

  return (
    <p className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="small select-all font-semibold text-[var(--color-brand-600)]">
        {email}
      </span>
      <button
        type="button"
        onClick={copy}
        className="btn btn-outline btn-sm"
        aria-live="polite"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </p>
  );
}

function SuccessPanel({
  name,
  email,
  sessionType,
  onReset,
}: {
  name: string;
  email: string;
  sessionType: string;
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
          <polyline points="20 6 9 17 4 12" className="animate-check-draw" />
        </svg>
      </div>

      <h3 className="font-display font-bold text-2xl mt-5 leading-[1.25] text-[var(--color-brand-700)]">
        Request sent{name ? `, ${name.split(" ")[0]}` : ""}
      </h3>
      <p className="small text-[var(--color-ink-muted)] mt-3 max-w-sm mx-auto leading-relaxed">
        Adam will reply to <strong className="text-[var(--color-ink)]">{email}</strong> within
        1–2 days.
      </p>

      <ul className="mt-7 grid gap-3 text-left max-w-sm mx-auto">
        <SuccessRow label="Request type" value={sessionType} />
        <SuccessRow label="Reply time" value="Within 1–2 days" />
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
