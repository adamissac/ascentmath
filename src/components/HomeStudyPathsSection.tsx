"use client";

import Link from "next/link";
import { useMemo } from "react";
import Container from "./Container";
import MathBackdrop from "./MathBackdrop";
import { SELF_STUDY_FREE_NOTE } from "../data/pricing";
import { GRADES, type Grade } from "../data/units";

export default function HomeStudyPathsSection() {
  const stats = useMemo(() => {
    let units = 0;
    let topics = 0;
    for (const g of GRADES) {
      units += g.units.length;
      for (const u of g.units) {
        topics += u.topics.length;
      }
    }
    return { units, topics };
  }, []);

  return (
    <section
      id="study-paths"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 520px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_0%_0%,rgba(42,75,203,0.06),transparent_50%),radial-gradient(ellipse_50%_45%_at_100%_100%,rgba(26,26,46,0.04),transparent_45%)]"
      />
      <MathBackdrop
        variant="tracks"
        density="light"
        contentSafe
        clipart={false}
        watermark={false}
        fadeEdges
      />

      <Container size="xl" className="relative z-[1] py-10 sm:py-12 lg:py-14">
        <div className="rounded-lg border border-[rgba(26,26,46,0.08)] bg-white/95 p-5 shadow-[0_2px_12px_rgba(26,26,46,0.04)] sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:items-stretch lg:gap-0">
            <div className="flex min-h-0 min-w-0 flex-col justify-center lg:py-1 lg:pr-8 xl:pr-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-[var(--color-accent-50)] px-2.5 py-0.5 font-display text-sm font-bold tracking-tight text-[var(--color-accent-700)]">
                  Free
                </span>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-cool-soft)]">
                  Grades 6-8 · no account
                </span>
              </div>

              <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink-cool)] sm:text-3xl">
                Study paths on your own
              </h2>
              <p className="mt-3 max-w-[30rem] text-[0.9375rem] leading-relaxed text-[var(--color-ink-cool-muted)]">
                {SELF_STUDY_FREE_NOTE} Read, watch, practice, and check your work on every
                topic.
              </p>

              <ul
                className="mt-7 grid max-w-sm grid-cols-3 border-y border-[rgba(26,26,46,0.08)] py-4"
                aria-label="Study path totals"
              >
                <PathStat value={GRADES.length} label="Grades" showDivider />
                <PathStat value={stats.units} label="Units" showDivider />
                <PathStat value={stats.topics} label="Topics" />
              </ul>

              <div className="mt-7">
                <Link
                  href="/mathematics/find-your-start"
                  className="btn btn-outline w-full no-underline sm:w-auto"
                >
                  Find your start
                  <span aria-hidden className="text-[0.8125rem] leading-none opacity-80">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div
              className="hidden min-h-full w-px self-stretch bg-[rgba(26,26,46,0.1)] lg:block"
              aria-hidden
            />

            <div className="flex min-h-0 min-w-0 flex-col justify-center gap-2.5 border-t border-[rgba(26,26,46,0.1)] pt-8 lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
              <p className="mb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-cool-soft)] lg:sr-only">
                Pick a grade
              </p>
              <div className="flex flex-col gap-2.5">
                {GRADES.map((g) => (
                  <HomeGradeRow key={g.slug} grade={g} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Same treatment as the hero's stat row, so the two stat moments on the
   homepage read as one system. */
function PathStat({
  value,
  label,
  showDivider = false,
}: {
  value: number;
  label: string;
  showDivider?: boolean;
}) {
  return (
    <li
      className={[
        "flex list-none flex-col items-center px-2",
        showDivider ? "border-r border-[rgba(26,26,46,0.1)]" : "",
      ].join(" ")}
    >
      <span className="font-display text-xl font-bold tracking-tight tabular-nums text-[var(--color-ink-cool)] sm:text-2xl">
        {value}
      </span>
      <span className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-cool-muted)]">
        {label}
      </span>
    </li>
  );
}

const HOME_GRADE_ROW_ICON =
  "grid size-10 shrink-0 place-items-center rounded-lg border border-[rgba(26,26,46,0.1)] bg-[var(--color-bg)] font-display text-base font-bold text-[var(--color-brand-500)]";

function HomeGradeRow({ grade: g }: { grade: Grade }) {
  const unitCount = g.units.length;
  const topicCount = g.units.reduce((n, u) => n + u.topics.length, 0);

  return (
    <Link
      href={`/mathematics/${g.slug}`}
      className="group grid min-h-[3.5rem] grid-cols-[2.5rem_minmax(0,1fr)_2.25rem] items-center gap-3 rounded-lg border border-[rgba(26,26,46,0.1)] bg-white px-3.5 py-3 no-underline shadow-[0_1px_3px_rgba(26,26,46,0.05)] transition-[border-color,box-shadow] hover:border-[rgba(26,26,46,0.18)] hover:shadow-[0_4px_14px_rgba(26,26,46,0.08)] sm:px-4"
      aria-label={`Open ${g.title} Mathematics`}
    >
      <span aria-hidden className={HOME_GRADE_ROW_ICON}>
        {g.icon}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[0.9375rem] font-bold leading-tight text-[var(--color-ink-cool)] group-hover:text-[var(--color-brand-500)]">
          {g.title} Mathematics
        </span>
        <span className="mt-0.5 block text-xs font-medium text-[var(--color-ink-cool-soft)]">
          {unitCount} units · {topicCount} topics
        </span>
      </span>
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-full border border-[rgba(26,26,46,0.1)] bg-[var(--color-bg)] text-[var(--color-brand-500)] transition-[border-color,background-color] group-hover:border-[var(--color-brand-500)] group-hover:bg-[var(--color-brand-500)] group-hover:text-white"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </svg>
      </span>
    </Link>
  );
}
