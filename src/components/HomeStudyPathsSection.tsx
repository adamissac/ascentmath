import Link from "next/link";
import ColorBand from "./ColorBand";
import Reveal from "./Reveal";
import StudyPathListCard from "./StudyPathListCard";
import { GRADES } from "../data/units";

export default function HomeStudyPathsSection() {
  return (
    <ColorBand
      id="study-paths"
      variant="brand"
      size="md"
      containerSize="lg"
      reveal={false}
      faintSymbols
      className="scroll-mt-[var(--site-header-offset,5.5rem)]"
    >
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal variant="fade" className="lg:col-span-4 lg:sticky lg:top-24">
          <p className="caption font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-300)]">
            Study paths · free · no account
          </p>
          <h2
            id="study-paths-heading"
            className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl"
          >
            Grades 6–8, self-paced
          </h2>

          <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/75 sm:text-base">
            Full grade paths with lessons, videos, practice, and quizzes on every topic. No account
            needed. Open a grade and jump to what your class is on.
          </p>

          <p className="small mt-6 text-white/70">
            Not sure where to begin?{" "}
            <Link
              href="/mathematics/find-your-start"
              className="font-semibold text-[var(--color-accent-300)] transition-colors hover:text-white"
            >
              Find your start →
            </Link>
          </p>
        </Reveal>

        <Reveal stagger className="grid gap-2 sm:gap-2.5 lg:col-span-8">
          {GRADES.map((g) => {
            const unitCount = g.units.length;
            const topicCount = g.units.reduce((n, u) => n + u.topics.length, 0);
            return (
              <StudyPathListCard
                key={g.slug}
                variant="brand"
                href={`/mathematics/${g.slug}`}
                ariaLabel={`Open ${g.title} Mathematics`}
                gradeGlyph={g.icon}
                title={`${g.title} Mathematics`}
                description={g.short}
                pills={[
                  `${unitCount} unit${unitCount === 1 ? "" : "s"}`,
                  `${topicCount} topic${topicCount === 1 ? "" : "s"}`,
                ]}
              />
            );
          })}

          <div
            className="flex items-center gap-3.5 rounded-xl border border-dashed border-white/22 bg-white/[0.04] px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4"
            role="status"
            aria-label="More study paths coming soon"
          >
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-lg border border-dashed border-white/25 bg-white/5 font-display text-lg font-bold text-white/45 sm:size-11"
            >
              +
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold text-white/85 sm:text-lg">
                More study paths coming soon
              </p>
              <p className="mt-0.5 text-sm leading-snug text-white/55">
                We&apos;re building more free paths. New grades and subjects on the way.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </ColorBand>
  );
}
