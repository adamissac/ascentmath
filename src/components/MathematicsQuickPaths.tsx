"use client";

import Link from "next/link";
import TopicFinder from "./TopicFinder";

const SUGGESTIONS = ["GCF", "fractions", "slope", "ratios", "exponents", "equations"];

type Props = {
  /** Tighter vertical rhythm for homepage layout */
  compact?: boolean;
  className?: string;
};

export default function MathematicsQuickPaths({ compact = false, className = "" }: Props) {
  const pad = compact ? "px-4 sm:px-6 py-5 sm:py-6" : "px-5 sm:px-8 py-8 sm:py-10";
  const tilePad = compact ? "p-4 sm:p-4" : "p-5 sm:p-6";
  const iconSize = compact ? "w-10 h-10" : "w-12 h-12";
  const titleClass = compact
    ? "font-display font-bold text-xl sm:text-2xl mt-1.5 text-white leading-snug tracking-[-0.02em]"
    : "font-display font-bold text-2xl sm:text-3xl mt-2 text-white leading-snug tracking-[-0.02em]";

  return (
    <div className={className}>
      <div className="rounded-2xl border border-[var(--color-brand-200)] bg-gradient-to-br from-[var(--color-brand-700)] via-[var(--color-brand-600)] to-[var(--color-brand-700)] shadow-[0_16px_40px_rgba(31,60,177,0.22)] overflow-hidden">
        <div className={pad}>
          <p className="caption font-semibold tracking-[0.14em] uppercase text-[var(--color-accent-300)]">
            Start here
          </p>
          <h2 className={titleClass}>
            Not sure where to go? Search or pick a path.
          </h2>
          <p
            className={`small text-white/80 max-w-2xl leading-relaxed ${
              compact ? "mt-1.5 text-[0.875rem]" : "mt-2"
            }`}
          >
            Jump straight to a topic by keyword, take a 30-second quiz to find your unit, or open
            the GADOE frameworks.
          </p>

          <div className={compact ? "mt-4" : "mt-6"}>
            <TopicFinder suggestions={SUGGESTIONS} variant="prominent" dense={compact} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 border-t border-white/15 bg-[var(--color-brand-800)]/40">
          <Link
            href="/mathematics/find-your-start"
            className={`group flex gap-3 ${tilePad} no-underline border-b sm:border-b-0 sm:border-r border-white/15 hover:bg-white/10 transition-colors`}
          >
            <span
              aria-hidden
              className={`${iconSize} rounded-xl bg-[var(--color-accent-500)] text-white grid place-items-center shrink-0 shadow-md`}
            >
              <CompassIcon />
            </span>
            <span className="min-w-0">
              <span className="block font-display font-bold text-base sm:text-lg text-white group-hover:text-[var(--color-accent-200)] transition-colors">
                Find your start
              </span>
              <span className="block small text-white/75 mt-0.5 leading-relaxed">
                Three quick questions → we point you to the right unit and first lesson.
              </span>
              <span className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-[var(--color-accent-300)]">
                Start the quiz <span aria-hidden>→</span>
              </span>
            </span>
          </Link>

          <Link
            href="/mathematics/curriculum-frameworks"
            className={`group flex gap-3 ${tilePad} no-underline hover:bg-white/10 transition-colors`}
          >
            <span
              aria-hidden
              className={`${iconSize} rounded-xl bg-white/15 text-white grid place-items-center shrink-0 border border-white/25`}
            >
              <DocIcon />
            </span>
            <span className="min-w-0">
              <span className="block font-display font-bold text-base sm:text-lg text-white group-hover:text-[var(--color-accent-200)] transition-colors">
                GADOE frameworks
              </span>
              <span className="block small text-white/75 mt-0.5 leading-relaxed">
                Official Georgia DOE unit frameworks (PDF) for each grade.
              </span>
              <span className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-[var(--color-accent-300)]">
                View frameworks <span aria-hidden>→</span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CompassIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
