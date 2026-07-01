import Container from "./Container";
import ContactForm from "./ContactForm";
import HeroCanvas from "./HeroCanvas";
import Reveal from "./Reveal";
import BookingTrustPanel from "./BookingTrustPanel";
import { FIRST_SESSION_FREE } from "../data/pricing";
import { TUTOR_NAMES_SHORT } from "../data/site-team";

export default function HomeBookingSection() {
  return (
    <section
      id="book-session"
      className="hero-surface relative scroll-mt-[5.5rem] overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
      aria-labelledby="book-session-heading"
    >
      <HeroCanvas />

      <Container size="lg" className="relative z-[1] py-12 sm:py-14 lg:py-16">
        <Reveal variant="fade" className="mx-auto max-w-2xl text-center">
          <p className="caption font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-600)]">
            Get started
          </p>
          <h2
            id="book-session-heading"
            className="font-display mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-4xl"
          >
            Book a session
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            Tell us about your student below and {TUTOR_NAMES_SHORT} will reach out to set up a time.{" "}
            {FIRST_SESSION_FREE}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <BookingTrustPanel />

          <Reveal variant="rise" delay={40} className="min-w-0">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
