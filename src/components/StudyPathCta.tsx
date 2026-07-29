import Container from "./Container";
import Reveal from "./Reveal";
import BookSessionLink from "./BookSessionLink";
import { FREE_CONSULTATION_CALL } from "../data/pricing";
import { TUTOR_NAMES_SHORT } from "../data/site-team";

const CARD =
  "rounded-2xl border border-[rgba(26,26,46,0.08)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-card)] sm:p-10";

export default function StudyPathCta() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <Container size="lg" className="py-12 sm:py-14 lg:py-16">
        <Reveal variant="fade" className="mx-auto max-w-2xl text-center">
          <div className={CARD}>
            <p className="caption font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-600)]">
              1-on-1 tutoring
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-3xl">
              Stuck on something specific?
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
              {TUTOR_NAMES_SHORT} can walk through it live. {FREE_CONSULTATION_CALL}
            </p>
            <BookSessionLink className="btn btn-primary mt-6">Book a tutoring session</BookSessionLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
