import Container from "./Container";
import ContactForm from "./ContactForm";
import HeroCanvas from "./HeroCanvas";
import Reveal from "./Reveal";
import { FIRST_SESSION_FREE } from "../data/pricing";
import {
  REPLY_TIME_LINE,
  TUTOR_NAMES_SHORT,
  ADAM_PHONE_DISPLAY,
  ADAM_PHONE_TEL,
  ALAN_PHONE_DISPLAY,
  ALAN_PHONE_TEL,
} from "../data/site-team";

export default function HomeBookingSection() {
  return (
    <section
      className="hero-surface relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
      aria-labelledby="book-session-heading"
    >
      <HeroCanvas />

      <Container size="md" className="relative z-[1] py-12 sm:py-14 lg:py-16">
        <Reveal variant="fade" className="mx-auto max-w-xl text-center">
          <h2
            id="book-session-heading"
            className="font-display text-3xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-4xl"
          >
            Book a session
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            {TUTOR_NAMES_SHORT} {REPLY_TIME_LINE.toLowerCase()}. {FIRST_SESSION_FREE}
          </p>
          <p className="mt-2 text-[0.9375rem] text-[var(--color-ink-muted)] sm:text-base">
            <a
              href={`tel:${ADAM_PHONE_TEL}`}
              className="font-semibold text-[var(--color-brand-600)] no-underline hover:underline"
            >
              Adam · {ADAM_PHONE_DISPLAY}
            </a>
            <span className="mx-2 text-[var(--color-ink-soft)]" aria-hidden>
              ·
            </span>
            <a
              href={`tel:${ALAN_PHONE_TEL}`}
              className="font-semibold text-[var(--color-brand-600)] no-underline hover:underline"
            >
              Alan · {ALAN_PHONE_DISPLAY}
            </a>
          </p>
        </Reveal>

        <div
          id="book-session"
          className="scroll-mt-[5.5rem] mx-auto mt-8 max-w-xl min-w-0 sm:mt-10"
        >
          <Reveal variant="rise" delay={40}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
