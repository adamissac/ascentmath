import Link from "next/link";
import AmbientBackdrop from "./AmbientBackdrop";
import Container from "./Container";
import MathBackdrop from "./MathBackdrop";
import Reveal from "./Reveal";
import { GRADES, type Grade } from "../data/units";

export default function HomeStudyPathsSection() {
  let units = 0;
  let topics = 0;
  for (const g of GRADES) {
    units += g.units.length;
    for (const u of g.units) {
      topics += u.topics.length;
    }
  }

  return (
    <section
      id="study-paths"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 560px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(42,75,203,0.08),transparent_55%),radial-gradient(ellipse_45%_40%_at_85%_100%,rgba(244,123,22,0.05),transparent_60%)]"
      />
      <AmbientBackdrop tone="cream" />
      <MathBackdrop
        variant="tracks"
        density="light"
        contentSafe
        clipart={false}
        watermark={false}
        fadeEdges
      />

      <Container size="lg" className="relative z-[1] py-12 sm:py-16 lg:py-20">
        <Reveal variant="fade" className="mx-auto max-w-2xl text-center">
          <p className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex rounded-full bg-[var(--color-accent-50)] px-2.5 py-0.5 font-display text-sm font-bold tracking-tight text-[var(--color-accent-700)]">
              Free
            </span>
            <span className="caption font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-cool-soft)]">
              Study paths · no account needed
            </span>
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-4xl">
            Study paths on your own
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            {GRADES.length} grades, {units} units, and {topics} topics for Grades 6-8 — read,
            watch, practice, and check your work on every topic, at your own pace.
          </p>
        </Reveal>

        <Reveal stagger variant="pop" className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-3">
          {GRADES.map((g) => (
            <HomeGradeCard key={g.slug} grade={g} />
          ))}
        </Reveal>

        <Reveal variant="fade" delay={80} className="mt-9 text-center">
          <p className="small text-[var(--color-ink-muted)]">
            Not sure where to begin?{" "}
            <Link href="/mathematics/find-your-start" className="link">
              Find your start →
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function HomeGradeCard({ grade: g }: { grade: Grade }) {
  const unitCount = g.units.length;
  const topicCount = g.units.reduce((n, u) => n + u.topics.length, 0);

  return (
    <Link
      href={`/mathematics/${g.slug}`}
      className="card card-interactive group flex flex-col p-6 no-underline"
      aria-label={`Open ${g.title} Mathematics`}
    >
      <span
        aria-hidden
        className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-brand-50)] font-display text-xl font-bold text-[var(--color-brand-600)] transition-colors duration-200 group-hover:bg-[var(--color-brand-600)] group-hover:text-white"
      >
        {g.icon}
      </span>

      <h3 className="font-display mt-4 text-lg font-bold leading-tight text-[var(--color-ink)] group-hover:text-[var(--color-brand-600)]">
        {g.title} Mathematics
      </h3>
      <p className="caption mt-1 text-[var(--color-ink-soft)]">
        {unitCount} units · {topicCount} topics
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-600)]">
        Start path
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </svg>
      </span>
    </Link>
  );
}
