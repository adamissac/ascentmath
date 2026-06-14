import Container from "./Container";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { FIRST_SESSION_FREE } from "../data/pricing";
import {
  buildBookingMailtoLink,
  REPLY_TIME_LINE,
  TUTOR_EMAILS_DISPLAY,
  TUTOR_NAMES_SHORT,
} from "../data/site-team";

const DETAILS = [
  { term: "Reply time", value: "1–2 days" },
  { term: "Format", value: "Zoom or in-person" },
  { term: "Location", value: "Atlanta area" },
  { term: "Inbox", value: TUTOR_EMAILS_DISPLAY },
] as const;

export default function HomeBookingSection() {
  return (
    <section
      id="book-session"
      className="scroll-mt-[5.5rem] border-t border-[var(--color-border)] bg-[var(--color-surface-2)]"
    >
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <Reveal variant="fade" className="lg:col-span-4">
            <p className="eyebrow">Booking</p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-4xl">
              Book a session
            </h2>
            <p className="lede mt-4 max-w-sm">
              Share a few details about the student or your school. {TUTOR_NAMES_SHORT}{" "}
              {REPLY_TIME_LINE.toLowerCase()} to schedule tutoring, a demo, or a partnership
              conversation.
            </p>

            <p className="mt-5 inline-flex rounded-full border border-[var(--color-brand-100)] bg-[var(--color-brand-50)] px-3.5 py-1.5 text-sm font-semibold text-[var(--color-brand-700)]">
              {FIRST_SESSION_FREE}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {DETAILS.map(({ term, value }) => (
                <div
                  key={term}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3.5 py-3"
                >
                  <p className="caption font-semibold uppercase tracking-wider text-[var(--color-ink-soft)]">
                    {term}
                  </p>
                  <p className="small mt-1 font-medium leading-snug text-[var(--color-ink)]">{value}</p>
                </div>
              ))}
            </div>

            <p className="small mt-6 text-[var(--color-ink-muted)]">
              Prefer email?{" "}
              <a
                href={buildBookingMailtoLink("I'd like to book a tutoring session.\n\n")}
                className="link font-semibold text-[var(--color-brand-600)]"
              >
                Write to us directly
              </a>
            </p>
          </Reveal>

          <Reveal variant="rise" delay={40} className="min-w-0 lg:col-span-8">
            <div className="card relative overflow-hidden">
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-1 bg-[var(--color-brand-500)]"
              />
              <div className="border-b border-[var(--color-border)] bg-[var(--color-brand-50)] px-6 py-4 pl-7 sm:px-8">
                <h3 className="font-display text-lg font-bold text-[var(--color-brand-700)]">
                  Session request
                </h3>
                <p className="caption mt-1 text-[var(--color-ink-muted)]">
                  Fields marked <span className="text-[var(--color-danger)]">*</span> are required.
                </p>
              </div>
              <div className="bg-white px-6 py-6 pl-7 sm:px-8 sm:py-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
