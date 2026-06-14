import Container from "./Container";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { FIRST_SESSION_FREE } from "../data/pricing";
import { REPLY_TIME_LINE, TUTOR_NAMES_SHORT } from "../data/site-team";

export default function HomeBookingSection() {
  return (
    <section
      id="book-session"
      className="scroll-mt-[5.5rem] border-t border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      <Container size="md" className="py-12 sm:py-16 lg:py-20">
        <Reveal variant="fade" className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-4xl">
            Book a session
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            {TUTOR_NAMES_SHORT} {REPLY_TIME_LINE.toLowerCase()}. {FIRST_SESSION_FREE}
          </p>
        </Reveal>

        <Reveal variant="rise" delay={40} className="mx-auto mt-10 max-w-xl min-w-0">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
