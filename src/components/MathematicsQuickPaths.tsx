import Link from "next/link";
import TopicFinder from "./TopicFinder";

const SUGGESTIONS = ["GCF", "fractions", "slope", "ratios", "exponents", "equations"];

export default function MathematicsQuickPaths() {
  return (
    <section className="relative z-[2] -mt-6 sm:-mt-10 mb-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 safe-x">
        <div className="rounded-2xl border border-[var(--color-brand-200)] bg-gradient-to-br from-[var(--color-brand-700)] via-[var(--color-brand-600)] to-[var(--color-brand-700)] shadow-[0_20px_50px_rgba(31,60,177,0.25)] overflow-hidden">
          <div className="px-5 sm:px-8 py-8 sm:py-10">
            <p className="caption font-semibold tracking-[0.14em] uppercase text-[var(--color-accent-300)]">
              Start here
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl mt-2 text-white leading-snug tracking-[-0.02em]">
              Not sure where to go? Search or pick a path.
            </h2>
            <p className="small text-white/80 mt-2 max-w-2xl leading-relaxed">
              Jump straight to a topic by keyword, take a 30-second quiz to find your unit, or read
              the parent guide.
            </p>

            <div className="mt-6">
              <TopicFinder suggestions={SUGGESTIONS} variant="prominent" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 border-t border-white/15 bg-[var(--color-brand-800)]/40">
            <Link
              href="/mathematics/find-your-start"
              className="group flex gap-4 p-5 sm:p-6 no-underline border-b sm:border-b-0 sm:border-r border-white/15 hover:bg-white/10 transition-colors"
            >
              <span
                aria-hidden
                className="w-12 h-12 rounded-xl bg-[var(--color-accent-500)] text-white grid place-items-center shrink-0 shadow-md"
              >
                <CompassIcon />
              </span>
              <span className="min-w-0">
                <span className="block font-display font-bold text-lg text-white group-hover:text-[var(--color-accent-200)] transition-colors">
                  Find your start
                </span>
                <span className="block small text-white/75 mt-1 leading-relaxed">
                  Three quick questions → we point you to the right unit and first lesson.
                </span>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[var(--color-accent-300)]">
                  Start the quiz <span aria-hidden>→</span>
                </span>
              </span>
            </Link>

            <Link
              href="/parents"
              className="group flex gap-4 p-5 sm:p-6 no-underline hover:bg-white/10 transition-colors"
            >
              <span
                aria-hidden
                className="w-12 h-12 rounded-xl bg-white/15 text-white grid place-items-center shrink-0 border border-white/25"
              >
                <UsersIcon />
              </span>
              <span className="min-w-0">
                <span className="block font-display font-bold text-lg text-white group-hover:text-[var(--color-accent-200)] transition-colors">
                  For parents &amp; teachers
                </span>
                <span className="block small text-white/75 mt-1 leading-relaxed">
                  Plain-language guide - how to help your child use each lesson step by step.
                </span>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[var(--color-accent-300)]">
                  Read the guide <span aria-hidden>→</span>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompassIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
