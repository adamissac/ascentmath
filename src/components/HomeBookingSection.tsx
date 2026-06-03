"use client";

import Container from "./Container";
import BookingForm from "./BookingForm";
import Reveal from "./Reveal";
import { PRICING_DISCUSSION_NOTE, TIER_PRICING_SHORT, TUTORING_TIERS_SUMMARY } from "../data/pricing";

export default function HomeBookingSection() {
  return (
    <section
      id="book-session"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-t border-[var(--color-border)] bg-[#F5F3EE]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(42,75,203,0.05),transparent_60%)]"
      />

      <Container size="md" className="relative z-[1] py-12 sm:py-16 lg:py-20">
        <Reveal variant="fade" className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-4xl">
            Book a session
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            Tell me what you need and pick your tutoring tier ({TUTORING_TIERS_SUMMARY}).{" "}
            {PRICING_DISCUSSION_NOTE}
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{TIER_PRICING_SHORT}</p>
        </Reveal>

        <Reveal variant="up" delay={60} className="mx-auto mt-10 w-full max-w-2xl min-w-0">
          <div className="rounded-lg border border-[rgba(26,26,46,0.08)] bg-white p-5 shadow-[0_4px_24px_-8px_rgba(26,26,46,0.12)] sm:p-7 sm:px-8">
            <BookingForm layout="square" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
