import AmbientBackdrop from "./AmbientBackdrop";
import Container from "./Container";
import ContactForm from "./ContactForm";
import MathBackdrop from "./MathBackdrop";
import Reveal from "./Reveal";
import { FIRST_SESSION_FREE } from "../data/pricing";
import {
  buildBookingMailtoLink,
  REPLY_TIME_LINE,
  TUTOR_EMAILS_DISPLAY,
  TUTOR_NAMES_SHORT,
} from "../data/site-team";

const TRUST_ITEMS = [
  { label: "First session free", detail: "New clients always" },
  { label: "1–2 day reply", detail: "Usually sooner" },
  { label: "Zoom or in-person", detail: "Atlanta area" },
] as const;

export default function HomeBookingSection() {
  return (
    <section
      id="book-session"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_20%_0%,rgba(42,75,203,0.07),transparent_55%),radial-gradient(ellipse_50%_45%_at_100%_100%,rgba(244,123,22,0.06),transparent_60%)]"
      />
      <AmbientBackdrop tone="cream" />
      <MathBackdrop variant="paper" density="light" contentSafe watermark={false} />

      <Container size="lg" className="relative z-[1] py-12 sm:py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          <Reveal variant="fade" className="lg:sticky lg:top-24">
            <p className="caption font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-600)]">
              Book with {TUTOR_NAMES_SHORT}
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
              Let&apos;s find a time that works.
            </h2>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
              Tell us about the student, your school, or what you&apos;re looking for.{" "}
              {TUTOR_NAMES_SHORT} {REPLY_TIME_LINE.toLowerCase()} to set up tutoring, a class demo,
              or a partnership.
            </p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-100)] bg-[var(--color-accent-50)] px-4 py-2 text-sm font-semibold text-[var(--color-accent-700)]">
              <SparkIcon />
              {FIRST_SESSION_FREE}
            </p>

            <ul className="mt-8 grid gap-3 sm:max-w-md">
              {TRUST_ITEMS.map(({ label, detail }) => (
                <li
                  key={label}
                  className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-white/80 px-4 py-3 backdrop-blur-sm"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-600)]"
                  >
                    <CheckIcon />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[var(--color-ink)]">{label}</span>
                    <span className="block text-[0.8125rem] text-[var(--color-ink-muted)]">{detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-[var(--color-ink-muted)]">
              Prefer email?{" "}
              <a
                href={buildBookingMailtoLink("I'd like to book a tutoring session.\n\n")}
                className="link font-semibold text-[var(--color-brand-600)]"
              >
                Write to us directly
              </a>
              <span className="mt-1 block text-[0.8125rem] text-[var(--color-ink-soft)]">
                {TUTOR_EMAILS_DISPLAY}
              </span>
            </p>
          </Reveal>

          <Reveal variant="rise" delay={60} className="min-w-0">
            <div className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card-hover)]">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-brand-500)] via-[var(--color-brand-400)] to-[var(--color-accent-500)]"
              />
              <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]/60 px-5 py-4 sm:px-7">
                <p className="font-display text-lg font-bold text-[var(--color-ink)]">
                  Send a request
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                  All fields marked with <span className="text-[var(--color-danger)]">*</span> are
                  required.
                </p>
              </div>
              <div className="p-5 sm:p-7 sm:px-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    </svg>
  );
}
