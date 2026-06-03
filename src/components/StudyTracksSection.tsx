"use client";

import Link from "next/link";
import HashLink from "./HashLink";
import { useMemo } from "react";
import Container from "./Container";
import MathBackdrop from "./MathBackdrop";
import Reveal from "./Reveal";
import { UnitSymbol } from "./UnitSymbol";
import { GRADES, countUnitVideos } from "../data/units";
import { SELF_STUDY_FREE_NOTE } from "../data/pricing";
import { STUDY_PATHS_HREF } from "../lib/site-paths";

const GRADE_STYLE = [
  {
    stripe: "from-[var(--color-brand-500)] to-[var(--color-brand-300)]",
    glow: "group-hover:shadow-[0_20px_48px_-16px_rgba(42,75,203,0.35)]",
    icon: "group-hover:border-[var(--color-brand-200)] group-hover:bg-[var(--color-brand-50)]",
    num: "text-[var(--color-brand-100)]",
  },
  {
    stripe: "from-[var(--color-accent-500)] to-[var(--color-accent-300)]",
    glow: "group-hover:shadow-[0_20px_48px_-16px_rgba(244,123,22,0.28)]",
    icon: "group-hover:border-[var(--color-accent-300)] group-hover:bg-[var(--color-accent-50)]",
    num: "text-[var(--color-accent-100)]",
  },
  {
    stripe: "from-[var(--color-brand-600)] to-[var(--color-brand-400)]",
    glow: "group-hover:shadow-[0_20px_48px_-16px_rgba(42,75,203,0.35)]",
    icon: "group-hover:border-[var(--color-brand-200)] group-hover:bg-[var(--color-brand-50)]",
    num: "text-[var(--color-brand-100)]",
  },
] as const;

type StudyTracksSectionProps = {
  /** Show Explore all paths / Find your start (homepage). Hidden on /mathematics. */
  showCtas?: boolean;
  topBorder?: boolean;
  id?: string;
};

export default function StudyTracksSection({
  showCtas = true,
  topBorder = true,
  id = "study-tracks",
}: StudyTracksSectionProps) {
  const stats = useMemo(() => {
    let units = 0;
    let videos = 0;
    for (const g of GRADES) {
      units += g.units.length;
      for (const u of g.units) {
        videos += countUnitVideos(u);
      }
    }
    return { units, videos };
  }, []);

  return (
    <section
      id={id}
      className={[
        "relative scroll-mt-[5.5rem] overflow-hidden bg-[#FBFAF7]",
        topBorder ? "border-t border-[var(--color-border)]" : "",
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_0%_0%,rgba(42,75,203,0.09),transparent_50%),radial-gradient(ellipse_50%_45%_at_100%_100%,rgba(244,123,22,0.08),transparent_45%)]"
      />
      <MathBackdrop
        variant="paper"
        density="light"
        contentSafe
        clipart={false}
        watermark={false}
        fadeEdges
      />

      <Container size="xl" className="relative z-[1] py-12 sm:py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="up" className="lg:col-span-5 lg:sticky lg:top-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1a1a2e]/10 bg-white/80 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#4a4a6a] shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)]" />
              Free self-paced paths
            </span>

            <h2 className="font-display mt-5 text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#1a1a2e] sm:text-4xl">
              Grades{" "}
              <span className="text-[#2A4BCB] underline decoration-[#FFDEC0] decoration-[0.18em] underline-offset-[0.12em]">
                6, 7, and 8
              </span>
              , ready when you are.
            </h2>

            <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#4a4a6a]">
              {SELF_STUDY_FREE_NOTE} Same four steps on every topic: read, watch, practice, check.
            </p>

            <dl className="mt-6 flex flex-wrap gap-3">
              <StatChip value={String(GRADES.length)} label="grades" />
              <StatChip value={String(stats.units)} label="units" accent />
              <StatChip value={String(stats.videos)} label="videos" />
            </dl>

            {showCtas ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <HashLink
                  href={STUDY_PATHS_HREF}
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-[#1a1a2e] px-6 py-3 text-center text-[0.9375rem] font-semibold text-white shadow-[0_10px_28px_-12px_rgba(26,26,46,0.45)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_rgba(26,26,46,0.4)]"
                >
                  Explore all paths
                </HashLink>
                <Link
                  href="/mathematics/find-your-start"
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-full border-2 border-[#1a1a2e]/15 bg-white/60 px-6 py-3 text-[0.9375rem] font-semibold text-[#1a1a2e] backdrop-blur-sm transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#2A4BCB]/30 hover:bg-white"
                >
                  Find your start
                </Link>
              </div>
            ) : null}
          </Reveal>

          <div className="flex flex-col gap-4 lg:col-span-7">
            {GRADES.map((grade, index) => {
              const style = GRADE_STYLE[index] ?? GRADE_STYLE[0];
              const unitCount = grade.units.length;
              const topicCount = grade.units.reduce((n, u) => n + u.topics.length, 0);
              const videoCount = grade.units.reduce((n, u) => n + countUnitVideos(u), 0);
              const gradeNum = grade.title.replace(/\D/g, "") || String(index + 6);

              return (
                <Reveal key={grade.slug} variant="up" delay={index * 45}>
                  <Link
                    href={`/mathematics/${grade.slug}`}
                    className={[
                      "group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-4 no-underline transition-[transform,box-shadow,border-color] duration-300 sm:gap-5 sm:p-5",
                      style.glow,
                      "hover:-translate-y-1 hover:border-[var(--color-brand-200)]",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${style.stripe}`}
                    />
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-display text-[5.5rem] font-bold leading-none opacity-[0.55] sm:text-[6.5rem] ${style.num}`}
                    >
                      {gradeNum}
                    </span>

                    <UnitSymbol
                      symbol={grade.icon}
                      size="md"
                      className={`relative z-[1] shrink-0 border-2 transition-colors duration-300 ${style.icon}`}
                    />

                    <div className="relative z-[1] min-w-0 flex-1">
                      <p className="font-display text-lg font-bold text-[#1a1a2e] transition-colors group-hover:text-[#2A4BCB] sm:text-xl">
                        {grade.title} Mathematics
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                        {grade.short}
                      </p>
                      <p className="mt-2 text-[0.8125rem] font-medium text-[var(--color-brand-600)]/80">
                        {unitCount} units · {topicCount} topics · {videoCount} videos
                      </p>
                    </div>

                    <span
                      aria-hidden
                      className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1a1a2e] text-white shadow-md transition-[transform,background-color] duration-300 group-hover:translate-x-1 group-hover:bg-[#2A4BCB]"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatChip({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
      <dd
        className={`font-display text-xl font-bold tabular-nums ${
          accent ? "text-[var(--color-accent-600)]" : "text-[#2A4BCB]"
        }`}
      >
        {value}
      </dd>
      <dt className="mt-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
        {label}
      </dt>
    </div>
  );
}
