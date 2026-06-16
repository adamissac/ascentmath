import Container from "./Container";
import ContactForm from "./ContactForm";
import { FIRST_SESSION_FREE } from "../data/pricing";
import { REPLY_TIME_LINE, TUTOR_NAMES_SHORT } from "../data/site-team";

export default function HomeBookingSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
      aria-labelledby="book-session-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(42,75,203,0.05),transparent_60%)]"
      />

      <Container size="md" className="relative z-[1] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="book-session-heading"
            className="font-display text-3xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-4xl"
          >
            Book a session
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            {TUTOR_NAMES_SHORT} {REPLY_TIME_LINE.toLowerCase()}. {FIRST_SESSION_FREE}
          </p>
        </div>

        <div
          id="book-session"
          className="scroll-mt-[5.5rem] mx-auto mt-10 max-w-xl min-w-0"
        >
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
