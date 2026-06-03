"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HashLink from "./HashLink";
import HeroCanvas from "./HeroCanvas";
import { BOOK_SESSION_HREF, STUDY_PATHS_HREF } from "../lib/site-paths";

type HeroSectionProps = {
  totalUnits: number;
};

const STAGGER = [
  "hero-enter--d0",
  "hero-enter--d1",
  "hero-enter--d2",
  "hero-enter--d3",
  "hero-enter--d4",
  "hero-enter--d5",
] as const;

export default function HeroSection({ totalUnits }: HeroSectionProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const rise = ["hero-enter", ready ? "is-visible" : ""].filter(Boolean).join(" ");

  return (
    <section
      className="hero-surface relative min-h-[min(100dvh,920px)] overflow-hidden bg-[#FBFAF7]"
      style={{ contain: "layout paint" }}
    >
      <HeroCanvas />

      <div className="relative z-[1] flex min-h-[min(100dvh,920px)] items-center justify-center page-x py-12 sm:py-16">
        <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col items-center text-center">
          <span
            className={`${rise} ${STAGGER[0]} inline-flex max-w-full items-center rounded-full border border-[#1a1a2e]/12 bg-[#1a1a2e]/[0.04] px-3.5 py-1.5 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#4a4a6a]`}
          >
            Math tutor · K through college · Paid sessions
          </span>

          <h1
            className={`${rise} ${STAGGER[1]} h-display mt-6 w-full min-w-0 max-w-3xl px-1 text-[#1a1a2e] [text-shadow:0_1px_32px_rgba(26,26,46,0.08)] sm:px-0`}
          >
            A{" "}
            <span className="text-[#2A4BCB] underline decoration-[#FFDEC0] decoration-[0.18em] underline-offset-[0.12em]">
              friendlier
            </span>{" "}
            way to learn{" "}
            <span className="block sm:inline">math.</span>
          </h1>

          <p
            className={`${rise} ${STAGGER[2]} mt-6 w-full min-w-0 max-w-[32.5rem] text-[1.0625rem] leading-relaxed text-[#4a4a6a] sm:text-lg`}
          >
            I&apos;m Adam. I tutor pre-algebra through AP Pre-Calc, AP Calc, SAT Math, linear
            algebra, and multivariable calc, plus K-6 basics. Book a paid 1-on-1 session, or use
            my free Grades 6-8 study tracks on your own.
          </p>

          <div
            className={`${rise} ${STAGGER[3]} btn-stack-mobile mt-8 w-full max-w-md sm:max-w-none sm:justify-center`}
          >
            <HashLink
              href={BOOK_SESSION_HREF}
              className="group relative inline-flex min-h-[3rem] w-full items-center justify-center overflow-hidden rounded-full bg-[#1a1a2e] px-5 py-3 text-center text-[0.9375rem] font-semibold text-white shadow-[0_10px_28px_-12px_rgba(26,26,46,0.55)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(26,26,46,0.5)] sm:w-auto sm:px-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Book a tutoring session</span>
            </HashLink>
            <div className="flex w-full items-center gap-0.5 sm:w-auto sm:gap-0">
              <HashLink
                href={STUDY_PATHS_HREF}
                className="relative inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-full border-2 border-[#1a1a2e]/25 bg-transparent px-5 py-3 text-center text-[0.9375rem] font-semibold text-[#1a1a2e] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#F47B16]/45 hover:bg-[#FFF4EB] sm:flex-initial sm:px-7"
              >
                Browse study paths
                <span className="absolute -right-1 -top-2 rounded-full bg-[#F47B16] px-2 py-0.5 text-[0.6875rem] font-bold leading-none text-white shadow-sm sm:hidden">
                  Free!
                </span>
              </HashLink>
              <span
                className="hidden shrink-0 items-center gap-0.5 text-[#F47B16] sm:flex"
                aria-label="Free Grades 6–8 study paths"
              >
                <svg width="36" height="20" viewBox="0 0 36 20" fill="none" aria-hidden className="-mr-0.5">
                  <path
                    d="M32 10H10"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 5L9 10L16 15"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-display text-lg font-bold leading-none tracking-tight">Free!</span>
              </span>
            </div>
          </div>

          <p
            className={`${rise} ${STAGGER[4]} mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.8125rem] text-[#4a4a6a]/90`}
          >
            <span>Zoom or in-person</span>
            <span className="text-[#1a1a2e]/25" aria-hidden>
              ·
            </span>
            <span>Rates vary by tier</span>
            <span className="text-[#1a1a2e]/25" aria-hidden>
              ·
            </span>
            <span>Confirmed on call or email</span>
            <span className="text-[#1a1a2e]/25" aria-hidden>
              ·
            </span>
            <span>K-6 through multivariable calc</span>
          </p>

          <div
            className={`${rise} ${STAGGER[5]} mt-10 grid w-full min-w-0 max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0`}
          >
            <HeroStat value="30+" label="Students tutored" showDivider />
            <HeroStat value="2+" label="Years tutoring" showDivider />
            <HeroStat value={String(totalUnits)} label="Study units" showDivider />
            <HeroStat value="3" label="Tutoring tiers" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  value,
  label,
  showDivider = false,
}: {
  value: string;
  label: string;
  showDivider?: boolean;
}) {
  return (
    <div
      className={[
        "flex flex-col items-center px-2",
        showDivider ? "sm:border-r sm:border-[#1a1a2e]/10" : "",
      ].join(" ")}
    >
      <span className="font-display text-xl font-bold tracking-tight text-[#1a1a2e] sm:text-[1.75rem]">
        {value}
      </span>
      <span className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#4a4a6a]">
        {label}
      </span>
    </div>
  );
}
