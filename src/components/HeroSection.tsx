"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroCanvas from "./HeroCanvas";

type HeroSectionProps = {
  totalUnits: number;
  totalVideos: number;
};

const STAGGER = [
  "hero-enter--d0",
  "hero-enter--d1",
  "hero-enter--d2",
  "hero-enter--d3",
  "hero-enter--d4",
  "hero-enter--d5",
] as const;

export default function HeroSection({ totalUnits, totalVideos }: HeroSectionProps) {
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
    <section className="hero-surface relative min-h-[min(100dvh,920px)] overflow-hidden bg-[#FBFAF7]">
      <HeroCanvas />

      <div className="relative z-[1] flex min-h-[min(100dvh,920px)] items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col items-center text-center">
          <span
            className={`${rise} ${STAGGER[0]} inline-flex max-w-full items-center rounded-full border border-[#1a1a2e]/12 bg-[#1a1a2e]/[0.04] px-3.5 py-1.5 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#4a4a6a]`}
          >
            Free · Grades 6–8 · Built by a student
          </span>

          <h1
            className={`${rise} ${STAGGER[1]} h-display mt-6 w-full min-w-0 max-w-3xl px-1 text-[#1a1a2e] [text-shadow:0_1px_32px_rgba(26,26,46,0.08)] sm:px-0`}
          >
            A{" "}
            <span className="text-[#2A4BCB] underline decoration-[#FFDEC0] decoration-[0.18em] underline-offset-[0.12em]">
              friendlier
            </span>{" "}
            way to
            <br />
            learn middle-school math.
          </h1>

          <p
            className={`${rise} ${STAGGER[2]} mt-6 w-full min-w-0 max-w-[32.5rem] text-[1.0625rem] leading-relaxed text-[#4a4a6a] sm:text-lg`}
          >
            Hand-picked videos, printable worksheets, and quick self-checks for Grades 6, 7,
            and 8 - designed for students who learn differently.
          </p>

          <div
            className={`${rise} ${STAGGER[3]} btn-stack-mobile mt-8 w-full max-w-md sm:max-w-none sm:justify-center`}
          >
            <Link
              href="/mathematics"
              className="group relative inline-flex min-h-[3rem] w-full items-center justify-center overflow-hidden rounded-full bg-[#1a1a2e] px-5 py-3 text-center text-[0.9375rem] font-semibold text-white shadow-[0_10px_28px_-12px_rgba(26,26,46,0.55)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(26,26,46,0.5)] sm:w-auto sm:px-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Start Learning - it&apos;s free</span>
            </Link>
            <Link
              href="/book"
              className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-full border-2 border-[#1a1a2e]/25 bg-transparent px-5 py-3 text-center text-[0.9375rem] font-semibold text-[#1a1a2e] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#1a1a2e] hover:bg-[#1a1a2e]/[0.05] sm:w-auto sm:px-7"
            >
              Book a free 1:1
            </Link>
          </div>

          <p
            className={`${rise} ${STAGGER[4]} mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.8125rem] text-[#4a4a6a]/90`}
          >
            <span>No sign-up</span>
            <span className="text-[#1a1a2e]/25" aria-hidden>
              ·
            </span>
            <span>No ads, ever</span>
            <span className="text-[#1a1a2e]/25" aria-hidden>
              ·
            </span>
            <span>Aligned to GADOE</span>
          </p>

          <div
            className={`${rise} ${STAGGER[5]} mt-10 grid w-full min-w-0 max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0`}
          >
            <HeroStat value={String(totalUnits)} label="Units" showDivider />
            <HeroStat value={`${totalVideos}+`} label="Videos" showDivider />
            <HeroStat value="30+" label="Students" showDivider />
            <HeroStat value="$0" label="Forever" />
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
