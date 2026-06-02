import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Badge from "../../components/Badge";
import Breadcrumbs from "../../components/Breadcrumbs";
import Button from "../../components/Button";
import MathBackdrop from "../../components/MathBackdrop";
import ColorBand from "../../components/ColorBand";
import Reveal from "../../components/Reveal";
import { DocSymbol, UnitSymbol } from "../../components/UnitSymbol";
import MathematicsQuickPaths from "../../components/MathematicsQuickPaths";
import { GRADES, countUnitVideos, type Grade } from "../../data/units";

export const metadata: Metadata = {
  title: "Mathematics",
  description:
    "Grade 6, 7, and 8 Mathematics - units of walkthroughs, videos, practice, and quizzes aligned to Georgia DOE standards.",
};

export default function MathematicsHub() {
  const totalUnits = GRADES.reduce((s, g) => s + g.units.length, 0);
  const totalTopics = GRADES.reduce(
    (s, g) => s + g.units.reduce((n, u) => n + u.topics.length, 0),
    0
  );

  return (
    <>
      {/* HERO */}
      <section className="hero-surface relative overflow-hidden">
        <MathBackdrop variant="paper" density="dense" fadeEdges />
        <Container size="xl" className="relative pt-10 pb-16 sm:pb-20">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Mathematics" }]} />
          </div>
          <Reveal className="mt-8 text-center max-w-3xl mx-auto" variant="up">
            <Badge tone="brand" className="mb-5">Grades 6–8 · GADOE aligned</Badge>
            <h1 className="h-display">Middle school math, one grade at a time.</h1>
            <p className="lede mt-5 mx-auto max-w-[54ch]">
              Pick your grade to see its full curriculum. Every unit is broken into short topics - 
              read a walkthrough, watch a video, try the practice, take a quick check.
            </p>
            <div className="proof-row mt-8 justify-center">
              <span><strong>{GRADES.length}</strong>grades</span>
              <span><strong>{totalUnits}</strong>units</span>
              <span><strong>{totalTopics}</strong>topics</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <MathematicsQuickPaths />

      {/* GRADE PICKER */}
      <Section tone="muted" size="md" containerSize="xl" decorated="muted" decoratedDensity="medium" decoratedContentSafe reveal={false}>
        <Reveal>
          <p className="eyebrow">Choose your grade</p>
          <h2 className="h2 mt-2">Three grades, the same friendly format.</h2>
          <p className="small text-[var(--color-ink-muted)] mt-2 max-w-xl leading-relaxed">
            Each grade follows the Georgia DOE standards and the same topic flow, so once you learn
            your way around one, you know them all.
          </p>
        </Reveal>

        <Reveal stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GRADES.map((g) => (
            <GradeCard key={g.slug} grade={g} />
          ))}
        </Reveal>

        <Reveal delay={100} className="mt-6">
          <Link
            href="/mathematics/curriculum-frameworks"
            className="card card-interactive group p-5 sm:p-6 flex items-center gap-5 no-underline bg-[var(--color-surface)]"
          >
            <DocSymbol className="flex-shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="caption font-semibold tracking-wider uppercase text-[var(--color-brand-600)]">
                Reference
              </span>
              <span className="block font-display font-semibold text-base sm:text-lg mt-1">
                GADOE Curriculum Frameworks
              </span>
              <span className="block small text-[var(--color-ink-muted)] mt-1">
                Official Georgia DOE unit frameworks (PDF) - useful for parents and teachers.
              </span>
            </span>
            <span aria-hidden className="text-[var(--color-ink-soft)] group-hover:text-[var(--color-brand-600)] transition-colors text-xl">→</span>
          </Link>
        </Reveal>
      </Section>

      {/* CTA */}
      <ColorBand variant="dark" size="sm">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl leading-[1.2]">
              Need help on something specific?
            </h2>
            <p className="mt-2 text-white/75">Book a free 1:1 session with Adam - online or in-person.</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end btn-stack-mobile md:flex-row md:justify-end">
            <Button href="/book" rightIcon={<Arrow />}>Book a class</Button>
          </div>
        </div>
      </ColorBand>
    </>
  );
}

function GradeCard({ grade: g }: { grade: Grade }) {
  const unitCount = g.units.length;
  const topicCount = g.units.reduce((n, u) => n + u.topics.length, 0);
  const videoCount = g.units.reduce((n, u) => n + countUnitVideos(u), 0);
  const ready = unitCount > 0;

  return (
    <Link
      href={`/mathematics/${g.slug}`}
      className={[
        "group relative flex flex-col gap-4 p-6 rounded-xl no-underline h-full",
        "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]",
        "transition-[border-color,box-shadow,transform] duration-200 ease-out",
        "hover:border-[var(--color-brand-200)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]",
      ].join(" ")}
      aria-label={`Open ${g.title} Mathematics`}
    >
      <div className="flex items-center justify-between gap-3">
        <UnitSymbol symbol={g.icon} size="md" className="group-hover:bg-[var(--color-brand-100)] transition-colors" />
        <span className="caption font-semibold uppercase tracking-wider text-[var(--color-brand-600)] bg-[var(--color-brand-50)] px-2 py-0.5 rounded">
          GADOE
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display font-bold text-xl text-[var(--color-ink)] group-hover:text-[var(--color-brand-700)] transition-colors">
          {g.title} Mathematics
        </h3>
        <p className="small text-[var(--color-ink-muted)] mt-2 leading-relaxed">{g.short}</p>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-[var(--color-border)]">
        <span className="caption text-[var(--color-ink-muted)]">
          {ready ? `${unitCount} units · ${topicCount} topics · ${videoCount} videos` : "Coming soon"}
        </span>
        <span
          aria-hidden
          className="w-9 h-9 rounded-full grid place-items-center bg-[var(--color-surface-2)] text-[var(--color-ink-muted)] border border-[var(--color-border)] group-hover:bg-[var(--color-brand-600)] group-hover:border-[var(--color-brand-600)] group-hover:text-white transition-[background,border-color,color,transform] group-hover:translate-x-0.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
