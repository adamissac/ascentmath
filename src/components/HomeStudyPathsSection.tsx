"use client";

import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import Container from "./Container";
import HeroStatBadge from "./HeroStatBadge";
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
      className="relative scroll-mt-[5.5rem] overflow-hidden border-t border-[var(--color-border)] bg-[#FBFAF7]"
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
        <div className="rounded-2xl border border-[rgba(26,26,46,0.08)] bg-white/95 p-5 shadow-[0_2px_12px_rgba(26,26,46,0.04)] sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:items-stretch lg:gap-0">
            <div className="flex min-h-0 min-w-0 flex-col justify-center lg:py-1 lg:pr-8 xl:pr-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-[#FFF4EB] px-2.5 py-0.5 font-display text-sm font-bold tracking-tight text-[#F47B16]">
                  Free
                </span>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#6b6b80]">
                  Grades 6-8 · no account
                </span>
              </div>

              <h2 className="font-display mt-3 text-xl font-bold tracking-[-0.02em] text-[#1a1a2e] sm:text-[1.625rem]">
                Study paths on your own
              </h2>
              <p className="mt-2.5 max-w-[28rem] text-[0.9375rem] leading-relaxed text-[#4a4a6a]">
                {SELF_STUDY_FREE_NOTE}
              </p>
              <p className="mt-1.5 text-sm text-[#6b6b80]">
                Read, watch, practice, check on every topic.
              </p>

              <ul className="mt-5 grid max-w-md grid-cols-3 gap-2" aria-label="Study path totals">
                <li className="list-none">
                  <HeroStatBadge value={GRADES.length} label="grades" />
                </li>
                <li className="list-none">
                  <HeroStatBadge value={stats.units} label="units" />
                </li>
                <li className="list-none">
                  <HeroStatBadge value={stats.topics} label="topics" />
                </li>
              </ul>

              <div className="mt-6">
                <SecondaryPathLink href="/mathematics/find-your-start">
                  Find your start
                </SecondaryPathLink>
              </div>
            </div>

            <div
              className="hidden min-h-full w-px self-stretch bg-[rgba(26,26,46,0.1)] lg:block"
              aria-hidden
            />

            <div className="flex min-h-0 min-w-0 flex-col justify-center gap-2.5 border-t border-[rgba(26,26,46,0.1)] pt-8 lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
              <p className="mb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#6b6b80] lg:sr-only">
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

function SecondaryPathLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[2.75rem] w-full items-center justify-center gap-1.5 rounded-md border border-[rgba(26,26,46,0.12)] bg-[#FBFAF7] px-4 text-center text-sm font-semibold text-[#2A4BCB] no-underline transition-[border-color,background-color] hover:border-[#2A4BCB]/30 hover:bg-white sm:w-auto sm:whitespace-nowrap"
    >
      <span>{children}</span>
      <span aria-hidden className="text-[0.8125rem] leading-none opacity-80">
        →
      </span>
    </Link>
  );
}

const HOME_GRADE_ROW_ICON =
  "grid size-10 shrink-0 place-items-center rounded-lg border border-[rgba(26,26,46,0.1)] bg-[#FBFAF7] font-display text-base font-bold text-[#2A4BCB]";

function HomeGradeRow({ grade: g }: { grade: Grade }) {
  const unitCount = g.units.length;
  const topicCount = g.units.reduce((n, u) => n + u.topics.length, 0);

  return (
    <Link
      href={`/mathematics/${g.slug}`}
      className="group grid min-h-[3.5rem] grid-cols-[2.5rem_minmax(0,1fr)_2.25rem] items-center gap-3 rounded-xl border border-[rgba(26,26,46,0.1)] bg-white px-3.5 py-3 no-underline shadow-[0_1px_3px_rgba(26,26,46,0.05)] transition-[border-color,box-shadow] hover:border-[rgba(26,26,46,0.18)] hover:shadow-[0_4px_14px_rgba(26,26,46,0.08)] sm:px-4"
      aria-label={`Open ${g.title} Mathematics`}
    >
      <span aria-hidden className={HOME_GRADE_ROW_ICON}>
        {g.icon}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[0.9375rem] font-bold leading-tight text-[#1a1a2e] group-hover:text-[#2A4BCB]">
          {g.title} Mathematics
        </span>
        <span className="mt-0.5 block text-xs font-medium text-[#6b6b80]">
          {unitCount} units · {topicCount} topics
        </span>
      </span>
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-full border border-[rgba(26,26,46,0.1)] bg-[#FBFAF7] text-[#2A4BCB] transition-[border-color,background-color] group-hover:border-[#2A4BCB] group-hover:bg-[#2A4BCB] group-hover:text-white"
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
