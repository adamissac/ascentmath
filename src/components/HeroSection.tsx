"use client";

import { useEffect, useState } from "react";
import HashLink from "./HashLink";
import HeroCanvas from "./HeroCanvas";
import { HERO_STATS } from "../data/site-stats";
import { FIRST_SESSION_FREE } from "../data/pricing";
import { TUTOR_NAMES_SHORT } from "../data/site-team";
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
      className="hero-surface relative min-h-[min(100dvh,920px)] overflow-hidden bg-[var(--color-bg)]"
      style={{ contain: "layout paint" }}
    >
      <HeroCanvas />

      <div className="relative z-[1] flex min-h-[min(100dvh,920px)] items-center justify-center page-x py-12 sm:py-16">
        <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col items-center text-center">
          <span
            className={`${rise} ${STAGGER[0]} inline-flex max-w-full items-center rounded-full border border-[#1a1a2e]/12 bg-[#1a1a2e]/[0.04] px-3.5 py-1.5 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-cool-muted)]`}
          >
            Math tutors · {TUTOR_NAMES_SHORT} · K through college
          </span>

          <h1
            className={`${rise} ${STAGGER[1]} h-display mt-6 w-full min-w-0 max-w-3xl px-1 text-[var(--color-ink-cool)] [text-shadow:0_1px_32px_rgba(26,26,46,0.08)] sm:px-0`}
          >
            A{" "}
            <span className="text-[var(--color-brand-500)] underline decoration-[var(--color-accent-100)] decoration-[0.18em] underline-offset-[0.12em]">
              friendlier
            </span>{" "}
            way to learn{" "}
            <span className="block sm:inline">math.</span>
          </h1>

          <p
            className={`${rise} ${STAGGER[2]} mt-6 w-full min-w-0 max-w-[32.5rem] text-[1.0625rem] leading-relaxed text-[var(--color-ink-cool-muted)] sm:text-lg`}
          >
            We&apos;re Adam and Alan. We tutor pre-algebra through AP Pre-Calc, AP Calc, SAT Math,
            linear algebra, and multivariable calc, plus K-5 and middle school basics. Book a paid
            1-on-1 session — {FIRST_SESSION_FREE} — or use our free Grades 6-8 study paths on your
            own.
          </p>

          <div
            className={`${rise} ${STAGGER[3]} btn-stack-mobile mt-8 w-full max-w-md sm:max-w-none sm:justify-center`}
          >
            <HashLink
              href={BOOK_SESSION_HREF}
              className="group relative inline-flex min-h-[3rem] w-full items-center justify-center overflow-hidden rounded-full bg-[var(--color-ink-cool)] px-5 py-3 text-center text-[0.9375rem] font-semibold text-white shadow-[0_10px_28px_-12px_rgba(26,26,46,0.55)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(26,26,46,0.5)] sm:w-auto sm:px-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Book a tutoring session</span>
            </HashLink>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
              <HashLink
                href={STUDY_PATHS_HREF}
                className="relative inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full border-2 border-[#1a1a2e]/25 bg-transparent px-5 py-3 text-center text-[0.9375rem] font-semibold text-[var(--color-ink-cool)] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#F47B16]/45 hover:bg-[var(--color-accent-50)] sm:w-auto sm:px-7"
              >
                Browse study paths
                <span className="inline-flex rounded-full bg-[var(--color-accent-500)] px-2 py-0.5 text-[0.6875rem] font-bold leading-none text-white shadow-sm sm:hidden">
                  Free!
                </span>
              </HashLink>
              <span
                className="hidden shrink-0 items-center gap-1 text-[var(--color-accent-500)] sm:inline-flex"
                aria-label="Free Grades 6-8 study paths"
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
            <span>Four tutoring tiers</span>
            <span className="text-[#1a1a2e]/25" aria-hidden>
              ·
            </span>
            <span>{FIRST_SESSION_FREE.split(".")[0]}</span>
            <span className="text-[#1a1a2e]/25" aria-hidden>
              ·
            </span>
            <span>K-5 through multivariable calc</span>
          </p>

          <div
            className={`${rise} ${STAGGER[5]} mt-10 grid w-full min-w-0 max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0`}
          >
            <HeroStat value={HERO_STATS.studentsTutored} label="Students tutored" animate={ready} showDivider />
            <HeroStat value={HERO_STATS.yearsTutoring} label="Years tutoring" animate={ready} showDivider />
            <HeroStat value={String(totalUnits)} label="Study units" animate={ready} showDivider />
            <HeroStat value={HERO_STATS.tutoringTiers} label="Tutoring tiers" animate={ready} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Signature motion moment: the hero stats count up as the stat row fades
   in. The numbers are the hero's proof (students, years, units), so they're
   the one element given a distinctive treatment - everything else on the
   page keeps the quieter shared reveal system. Static under
   prefers-reduced-motion. */
function HeroStat({
  value,
  label,
  animate = false,
  showDivider = false,
}: {
  value: string;
  label: string;
  animate?: boolean;
  showDivider?: boolean;
}) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!animate || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const DELAY = 420; // matches the stat row's entrance stagger slot
    const DURATION = 700;
    let raf = 0;
    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start - DELAY;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.round(eased * target)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    setDisplay(`0${suffix}`);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, target, suffix]);

  return (
    <div
      className={[
        "flex flex-col items-center px-2",
        showDivider ? "sm:border-r sm:border-[#1a1a2e]/10" : "",
      ].join(" ")}
    >
      <span className="font-display text-xl font-bold tracking-tight tabular-nums text-[var(--color-ink-cool)] sm:text-[1.75rem]">
        {display}
      </span>
      <span className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-cool-muted)]">
        {label}
      </span>
    </div>
  );
}
