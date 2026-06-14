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

export default function HomeBookingSection() {
  return (
    <section
      id="book-session"
      className="scroll-mt-[5.5rem] border-t border-[var(--color-border)] bg-[var(--color-surface-2)]"
    >
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="fade">
            <p className="caption font-semibold uppercase tracking-wider text-[var(--color-ink-soft)]">
              Booking
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl">
              Book a session
            </h2>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
              Tell us about the student or your school and what you&apos;re looking for.{" "}
              {TUTOR_NAMES_SHORT} {REPLY_TIME_LINE.toLowerCase()}.
            </p>
            <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">{FIRST_SESSION_FREE}</p>

            <ul className="mt-6 space-y-1.5 text-sm text-[var(--color-ink-muted)]">
              <li>{REPLY_TIME_LINE}</li>
              <li>Zoom or in-person · Atlanta area</li>
              <li>
                Sent to{" "}
                <span className="text-[var(--color-ink)]">{TUTOR_EMAILS_DISPLAY}</span>
              </li>
            </ul>

            <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
              Prefer email?{" "}
              <a
                href={buildBookingMailtoLink("I'd like to book a tutoring session.\n\n")}
                className="link font-medium text-[var(--color-ink)]"
              >
                Write to us directly
              </a>
            </p>
          </Reveal>

          <Reveal variant="rise" delay={40} className="min-w-0">
            <div className="rounded-lg border border-[var(--color-border)] bg-white p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
