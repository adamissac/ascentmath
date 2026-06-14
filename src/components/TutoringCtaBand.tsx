"use client";

import Link from "next/link";
import Button from "./Button";
import ColorBand from "./ColorBand";
import Reveal from "./Reveal";
import { FIRST_SESSION_FREE, TUTORING_TIERS_SUMMARY } from "../data/pricing";
import { TUTOR_NAMES_SHORT } from "../data/site-team";

type TutoringCtaBandProps = {
  tiersHref?: string;
};

export default function TutoringCtaBand({ tiersHref = "/#what-i-teach" }: TutoringCtaBandProps) {
  return (
    <ColorBand variant="dark" size="sm" reveal={false} faintSymbols>
      <div className="grid grid-cols-12 items-center gap-8">
        <Reveal variant="left" className="col-span-12 reveal-slow md:col-span-7">
          <p className="caption font-semibold tracking-[0.16em] uppercase text-[var(--color-brand-300)]">
            Ready to get unstuck?
          </p>
          <h2 className="font-display mt-3 max-w-2xl min-w-0 break-words text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-4xl">
            Book a tutoring session with us.
          </h2>
          <p className="mt-4 max-w-xl text-[#C8C9CC]">
            From K-5 through college math. Pick your tier on the booking form. {TUTORING_TIERS_SUMMARY}.{" "}
            {FIRST_SESSION_FREE}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9AA0A8]">
            <span className="inline-flex items-center gap-2">
              <Check tone="light" /> 4 tutoring tiers
            </span>
            <span className="inline-flex items-center gap-2">
              <Check tone="light" /> First session free
            </span>
            <span className="inline-flex items-center gap-2">
              <Check tone="light" /> Zoom or in-person
            </span>
            <span className="inline-flex items-center gap-2">
              <Check tone="light" /> Self-paced paths still free
            </span>
          </div>
        </Reveal>
        <Reveal
          variant="right"
          delay={120}
          className="btn-stack-mobile col-span-12 md:col-span-5 md:justify-end"
        >
          <Button href="/#book-session" size="lg" rightIcon={<ArrowRight />}>
            Book with {TUTOR_NAMES_SHORT}
          </Button>
          <Link href={tiersHref} className="btn btn-lg border border-white/30 text-white hover:bg-white/10">
            See tutoring tiers
          </Link>
        </Reveal>
      </div>
    </ColorBand>
  );
}

function ArrowRight() {
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

function Check({ tone = "brand" }: { tone?: "brand" | "light" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={tone === "light" ? "#7E97F0" : "currentColor"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
