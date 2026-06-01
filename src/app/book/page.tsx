"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Section from "../../components/Section";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import SectionHeader from "../../components/SectionHeader";
import ColorBand from "../../components/ColorBand";
import Reveal from "../../components/Reveal";

/* ============================================================
   Types
   ============================================================ */

type Mode = "zoom" | "in_person";
type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  phone: string;
  mode: Mode;
  grade: string;
  topic: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  /* honeypot — must stay empty */
  website: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  mode: "zoom",
  grade: "",
  topic: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
  website: "",
};

/* ============================================================
   Page
   ============================================================ */

const RECIPIENT_EMAIL = "adamissac08@gmail.com";

export default function BookPage() {
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
    fetch("/api/book")
      .then((r) => r.json())
      .then((data) => setBookingConfigured(Boolean(data?.configured)))
      .catch(() => setBookingConfigured(false));
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
            "We couldn't send your request. Please try again or email Adam directly."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg(
        "Network error — please check your connection and try again, or email Adam directly."
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

  /* -------------------------------------------------------- */

  return (
    <>
      <Section tone="hero" size="lg" containerSize="lg" decorated="paper" decoratedDensity="light" decoratedContentSafe reveal={false}>
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">
          <Reveal variant="up">
            <Badge tone="brand" className="mb-5">1:1 session · Free</Badge>
            <h1 className="h-display">Book a class with Adam.</h1>
            <p className="lede mt-5 max-w-xl">
              Pick a topic you want to work on. Choose Zoom or in-person. We&apos;ll
              meet at a time that works for both of us — and there&apos;s never a
              charge.
            </p>
            <ul className="mt-8 grid gap-3">
              <BulletItem
                title="Tell me what you need"
                description="Share the unit, topic, or specific question you want to work through."
              />
              <BulletItem
                title="Pick a mode and a time"
                description="Zoom is easiest for most students. In-person works in the Atlanta area."
              />
              <BulletItem
                title="Submit and you're done"
                description={
                  bookingConfigured
                    ? "Your request lands in Adam's inbox instantly. Reply usually comes within a day."
                    : "Your email app opens with everything filled in — just hit send."
                }
              />
            </ul>
          </Reveal>

          <Reveal variant="up" delay={120}>
          <Card className="p-6 sm:p-8 lg:sticky lg:top-24">
              {status === "success" ? (
                <SuccessPanel name={form.name} onReset={reset} />
              ) : (
                <>
                  <SectionHeader eyebrow="Request a session" title="A quick form" />

                  {bookingConfigured === false && (
                    <div
                      role="status"
                      className="mt-4 rounded-lg border border-[var(--color-brand-100)] bg-[var(--color-brand-50)] p-4"
                    >
                      <p className="small font-semibold text-[var(--color-ink)]">
                        Send through your email app
                      </p>
                      <p className="caption text-[var(--color-ink-muted)] mt-1 leading-relaxed">
                        Fill this out, then click send — your email app will open with
                        everything ready. Just hit send there and Adam will get it.
                      </p>
                    </div>
                  )}

                  <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-5">
                    {/* honeypot */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: "-10000px",
                        top: "auto",
                        width: 1,
                        height: 1,
                        overflow: "hidden",
                      }}
                    >
                      <label>
                        Website
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.website}
                          onChange={(e) => set("website", e.target.value)}
                        />
                      </label>
                    </div>

                    <Field
                      id="name"
                      label="Full name"
                      required
                      value={form.name}
                      onChange={(v) => set("name", v)}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      error={showError("name")}
                      placeholder="Alex Garcia"
                      autoComplete="name"
                    />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        id="email"
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
                      <Field
                        id="phone"
                        label="Phone"
                        type="tel"
                        optional
                        value={form.phone}
                        onChange={(v) => set("phone", v)}
                        placeholder="(555) 123-4567"
                        autoComplete="tel"
                      />
                    </div>

                    <fieldset className="grid gap-2">
                      <legend className="label">Preferred mode</legend>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <ModeRadio
                          active={form.mode === "zoom"}
                          onClick={() => set("mode", "zoom")}
                          title="Zoom (online)"
                          desc="Anywhere with internet"
                        />
                        <ModeRadio
                          active={form.mode === "in_person"}
                          onClick={() => set("mode", "in_person")}
                          title="In-person"
                          desc="Local Atlanta area"
                        />
                      </div>
                    </fieldset>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        id="grade"
                        label="Grade level"
                        optional
                        value={form.grade}
                        onChange={(v) => set("grade", v)}
                        placeholder="e.g. 6th grade"
                      />
                      <Field
                        id="topic"
                        label="Topic / focus"
                        optional
                        value={form.topic}
                        onChange={(v) => set("topic", v)}
                        placeholder="e.g. fractions, equations"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        id="preferredDate"
                        label="Preferred date"
                        optional
                        type="date"
                        value={form.preferredDate}
                        onChange={(v) => set("preferredDate", v)}
                        min={minDate}
                      />
                      <Field
                        id="preferredTime"
                        label="Preferred time"
                        optional
                        type="time"
                        value={form.preferredTime}
                        onChange={(v) => set("preferredTime", v)}
                      />
                    </div>

                    <div>
                      <label className="label" htmlFor="notes">
                        Anything else{" "}
                        <span className="text-[var(--color-ink-soft)] font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="notes"
                        className="textarea"
                        rows={4}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="What you want to work on, time-zone, any constraints…"
                        maxLength={2000}
                      />
                      <p className="caption text-[var(--color-ink-soft)] mt-1.5 text-right tabular-nums">
                        {form.notes.length}/2000
                      </p>
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
                        <a
                          href={mailtoHref}
                          className="btn btn-outline btn-sm mt-3 inline-flex"
                        >
                          Email Adam instead
                        </a>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "submitting" || bookingConfigured === null}
                      size="lg"
                      className="w-full sm:w-auto"
                      rightIcon={status === "submitting" ? <Spinner /> : <Arrow />}
                    >
                      {status === "submitting"
                        ? "Sending…"
                        : bookingConfigured === false
                          ? "Open email to send"
                          : "Send request"}
                    </Button>

                    <p className="caption text-[var(--color-ink-muted)] leading-relaxed">
                      {bookingConfigured === false ? (
                        <>
                          Opens your email app addressed to{" "}
                          <span className="font-medium text-[var(--color-ink)]">
                            {RECIPIENT_EMAIL}
                          </span>
                          . Nothing is stored on this site.
                        </>
                      ) : (
                        <>
                          Your details are sent straight to{" "}
                          <span className="font-medium text-[var(--color-ink)]">
                            {RECIPIENT_EMAIL}
                          </span>
                          . Nothing is stored on this site.
                        </>
                      )}
                    </p>
                  </form>
                </>
              )}
            </Card>
          </Reveal>
        </div>
      </Section>

      <ColorBand variant="dark" containerSize="md" reveal={false}>
        <Reveal>
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions"
          align="center"
          dark
        />
        </Reveal>
        <Reveal stagger className="mt-10 grid sm:grid-cols-2 gap-5">
          <Faq dark q="Is this really free?" a="Yes — every session and every resource on this site is free. The mission is helping students, not selling anything." />
          <Faq dark q="What ages do you tutor?" a="Mainly Grades 6–8, though I'll help younger or older students depending on what they need." />
          <Faq dark q="How long is a session?" a="Most sessions run 45–60 minutes. We can do shorter ones for a quick question." />
          <Faq dark q="How quickly will Adam reply?" a="Usually within a day. If a school day is busy, give it 48 hours." />
        </Reveal>
      </ColorBand>

      <Section tone="muted" size="sm" containerSize="md" reveal={false}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="eyebrow">While you wait</p>
            <h2 className="font-display font-bold text-xl sm:text-2xl mt-1">Browse the free Grades 6–8 units</h2>
          </div>
          <Link href="/mathematics" className="btn btn-primary btn-lg shrink-0">
            Open the library →
          </Link>
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

function buildMailtoLink(form: FormState) {
  const mode = form.mode === "zoom" ? "Zoom (online)" : "In-person";
  const body = [
    `Hi Adam,`,
    ``,
    `I'd like to book a free tutoring session.`,
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
    subject: "Book a class — Adam's Alphabet",
    body,
  });
  return `mailto:${RECIPIENT_EMAIL}?${params.toString()}`;
}

function SuccessPanel({ name, onReset }: { name: string; onReset: () => void }) {
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

      <h2 className="font-display font-bold text-2xl mt-5 leading-[1.25]">
        Your class is booked
        {name ? `, ${name.split(" ")[0]}` : ""}.
      </h2>
      <p className="small text-[var(--color-ink-muted)] mt-3 max-w-sm mx-auto leading-relaxed">
        Adam just received your request. You&apos;ll usually get a reply within a
        day to lock in a time. Watch your inbox (and spam folder, just in case).
      </p>

      <ul className="mt-7 grid gap-3 text-left max-w-sm mx-auto">
        <SuccessRow label="Delivered to" value={RECIPIENT_EMAIL} />
        <SuccessRow label="Reply time" value="Within 24 hours, usually" />
        <SuccessRow label="Cost" value="$0 — free, always" />
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="btn btn-outline btn-sm"
        >
          Send another request
        </button>
        <Link href="/mathematics" className="btn btn-ghost btn-sm">
          Browse units →
        </Link>
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

function ModeRadio({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`radio-card text-left w-full ${active ? "is-active" : ""}`}
    >
      <span
        aria-hidden
        className={`mt-0.5 w-4 h-4 rounded-full border-2 grid place-items-center flex-shrink-0 ${
          active
            ? "border-[var(--color-brand-500)]"
            : "border-[var(--color-border-strong)]"
        }`}
      >
        {active && (
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-500)]" />
        )}
      </span>
      <span>
        <span className="block font-semibold text-sm">{title}</span>
        <span className="block caption text-[var(--color-ink-muted)] mt-0.5">{desc}</span>
      </span>
    </button>
  );
}

function BulletItem({ title, description }: { title: string; description: string }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden
        className="mt-1 w-6 h-6 rounded-full bg-[var(--color-brand-500)] text-white grid place-items-center text-xs font-bold flex-shrink-0"
      >
        ✓
      </span>
      <span>
        <span className="block font-semibold text-[var(--color-ink)]">{title}</span>
        <span className="block small text-[var(--color-ink-muted)] mt-0.5">{description}</span>
      </span>
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
          <span className="ml-1 text-[var(--color-ink-soft)] font-normal">(optional)</span>
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

function Faq({ q, a, dark }: { q: string; a: string; dark?: boolean }) {
  return (
    <details
      className={`p-5 group rounded-lg border ${
        dark
          ? "bg-white/5 border-white/15 hover:bg-white/8"
          : "card"
      }`}
    >
      <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
        <span className={`font-semibold ${dark ? "text-white" : "text-[var(--color-ink)]"}`}>{q}</span>
        <span aria-hidden className={`group-open:rotate-45 transition-transform ${dark ? "text-white/60" : "text-[var(--color-ink-soft)]"}`}>+</span>
      </summary>
      <p className={`small mt-3 ${dark ? "text-white/75" : "text-[var(--color-ink-muted)]"}`}>{a}</p>
    </details>
  );
}

/* ---- icons ---- */

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
