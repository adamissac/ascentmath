import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "../../../components/Container";
import Section from "../../../components/Section";
import Badge from "../../../components/Badge";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import MathBackdrop from "../../../components/MathBackdrop";
import ColorBand from "../../../components/ColorBand";
import Reveal from "../../../components/Reveal";
import VisualPanel from "../../../components/VisualPanel";
import { DocSymbol, UnitSymbol } from "../../../components/UnitSymbol";
import { GRADES, getGrade, countUnitVideos, countUnitWorksheets, type Unit } from "../../../data/units";

type Params = { grade: string };

export function generateStaticParams() {
  return GRADES.map((g) => ({ grade: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { grade } = await params;
  const g = getGrade(grade);
  if (!g) return { title: "Grade not found" };
  return { title: `${g.title} Mathematics`, description: g.description };
}

export default async function GradeLibrary({ params }: { params: Promise<Params> }) {
  const { grade } = await params;
  const g = getGrade(grade);
  if (!g) notFound();

  const units = g.units;
  const totalMinutes = units.reduce((s, u) => s + u.estimatedMinutes, 0);
  const totalTopics = units.reduce((s, u) => s + u.topics.length, 0);
  const totalVideos = units.reduce((s, u) => s + countUnitVideos(u), 0);
  const totalWorksheets = units.reduce((s, u) => s + countUnitWorksheets(u), 0);

  return (
    <>
      {/* HERO */}
      <section className="hero-surface relative overflow-hidden">
        <MathBackdrop variant="paper" density="dense" fadeEdges />
        <Container size="xl" className="relative pt-10 pb-16 sm:pb-20">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Mathematics", href: "/mathematics" },
                { label: g.title },
              ]}
            />
          </div>
          <Reveal className="mt-8 text-center max-w-3xl mx-auto" variant="up">
            <Badge tone="brand" className="mb-5">{g.title} · GADOE aligned</Badge>
            <h1 className="h-display">The full {g.title} curriculum, in one place.</h1>
            <p className="lede mt-5 mx-auto max-w-[52ch]">
              Each unit is split into short topics — read a walkthrough, watch a video, try the
              practice, take a quick check. Jump to any topic; there&apos;s no &ldquo;right&rdquo; order.
            </p>
            {units.length > 0 && (
              <div className="proof-row mt-8 justify-center">
                <span><strong>{units.length}</strong>units</span>
                <span><strong>{totalTopics}</strong>topics</span>
                <span><strong>{totalVideos}</strong>videos</span>
                {totalWorksheets > 0 && <span><strong>{totalWorksheets}</strong>worksheets</span>}
                <span><strong>~{Math.round(totalMinutes / 60)}h</strong>total</span>
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      {/* UNIT LIBRARY */}
      <Section tone="muted" size="sm" containerSize="xl" decorated="muted" decoratedDensity="medium" decoratedContentSafe reveal={false}>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          <div className="lg:col-span-8 min-w-0">
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                <div>
                  <p className="eyebrow">The library</p>
                  <h2 className="h2 mt-2">{g.title} units</h2>
                  <p className="small text-[var(--color-ink-muted)] mt-2 max-w-xl leading-relaxed">
                    Each row is a full unit, broken into short topics — a walkthrough, a video,
                    practice, and a quick quiz on every one. Open whichever unit you&apos;re working
                    on in class right now.
                  </p>
                </div>
                {units.length > 0 && (
                  <p className="caption font-semibold text-[var(--color-brand-600)] shrink-0">
                    {units.length} units · pick any to start
                  </p>
                )}
              </div>
            </Reveal>

            {units.length > 0 ? (
              <Reveal stagger className="grid gap-3 sm:gap-4">
                {units.map((u, i) => (
                  <UnitLibraryCard key={u.id} gradeSlug={g.slug} unit={u} index={i} />
                ))}
              </Reveal>
            ) : (
              <Reveal>
                <div className="card p-8 text-center">
                  <p className="font-display font-semibold text-lg text-[var(--color-ink)]">
                    Coming soon
                  </p>
                  <p className="small text-[var(--color-ink-muted)] mt-2">
                    {g.title} units are being added. Check back shortly.
                  </p>
                  <Link href="/mathematics" className="btn btn-outline btn-sm mt-5">
                    Back to all grades
                  </Link>
                </div>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-4 hidden lg:block lg:pl-6 xl:pl-8 border-l border-[var(--color-border)]">
            <div className="sticky top-24 grid gap-4">
              <VisualPanel
                variant="compact"
                title="How each topic works"
                subtitle="Read → watch → practice → quiz. Same shape every time so you always know what's next."
                stats={[
                  { value: "1", label: "Read" },
                  { value: "2", label: "Watch" },
                  { value: "3", label: "Practice" },
                  { value: "4", label: "Quiz" },
                ]}
              />
              <Link
                href="/mathematics/curriculum-frameworks"
                className="card card-interactive group p-5 flex items-center gap-4 no-underline bg-[var(--color-surface)]"
              >
                <DocSymbol />
                <span className="min-w-0">
                  <span className="caption font-semibold uppercase tracking-wider text-[var(--color-brand-600)]">
                    Reference
                  </span>
                  <span className="block font-semibold text-[var(--color-ink)] mt-0.5">
                    GADOE frameworks
                  </span>
                </span>
                <span aria-hidden className="text-[var(--color-ink-soft)] group-hover:text-[var(--color-brand-600)] ml-auto">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {/* HOW EACH TOPIC IS BUILT */}
      <ColorBand variant="brand" containerSize="xl">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow text-[var(--color-accent-300)]">What&apos;s inside</p>
            <h2 className="h2 mt-3 text-white">A consistent shape, so you always know where to go next.</h2>
            <p className="small text-white/75 mt-4 max-w-sm leading-relaxed">
              Open any unit and pick a topic. Every topic follows the same four steps in the same
              order. Skim, skip, or follow it straight through — it&apos;s built to fit how you study.
            </p>
          </div>
          <ol className="lg:col-span-8 divide-y divide-white/15">
            {STEPS.map((s, i) => (
              <li key={s.title} className="py-5 grid grid-cols-[auto_1fr] gap-5 items-start">
                <span
                  aria-hidden
                  className="font-display text-2xl font-bold text-[var(--color-accent-300)] tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display font-semibold text-lg text-white">{s.title}</span>
                  <span className="block small text-white/75 mt-1 leading-relaxed max-w-2xl">
                    {s.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </ColorBand>

      {/* CTA */}
      <ColorBand variant="dark" size="sm">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl leading-[1.2]">
              Need help on something specific?
            </h2>
            <p className="mt-2 text-white/75">Book a free 1:1 session with Adam — online or in-person.</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end btn-stack-mobile md:flex-row md:justify-end">
            <Button href="/book" rightIcon={<Arrow />}>Book a class</Button>
          </div>
        </div>
      </ColorBand>
    </>
  );
}

const STEPS: { title: string; body: string }[] = [
  { title: "Walkthrough", body: "A short, plain-language explainer with a worked example. Read it first to get the idea." },
  { title: "Video walk-through", body: "One hand-picked video per topic — sometimes a second take — from teachers students actually like." },
  { title: "Practice", body: "A printable worksheet from Adam or curated links to trusted external worksheet libraries." },
  { title: "Quick quiz", body: "Two or three questions at the end of each topic, with explanations. Retake it as many times as you want." },
];

function UnitLibraryCard({ gradeSlug, unit: u, index }: { gradeSlug: string; unit: Unit; index: number }) {
  const videoCount = countUnitVideos(u);
  const worksheetCount = countUnitWorksheets(u);
  return (
    <Link
      href={`/mathematics/${gradeSlug}/${u.slug}`}
      className={[
        "group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5",
        "p-5 sm:p-6 rounded-xl no-underline",
        "bg-[var(--color-surface)] border border-[var(--color-border)]",
        "shadow-[var(--shadow-card)]",
        "transition-[border-color,box-shadow,transform,background] duration-200 ease-out",
        "hover:border-[var(--color-brand-200)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]",
      ].join(" ")}
      aria-label={`Open Unit ${u.number}: ${u.title}`}
    >
      <div className="flex items-center gap-4 sm:gap-5 shrink-0">
        <span
          aria-hidden
          className="font-display font-bold text-sm tabular-nums w-9 text-center text-[var(--color-brand-600)] group-hover:text-[var(--color-brand-700)] transition-colors"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <UnitSymbol symbol={u.icon} size="md" className="group-hover:bg-[var(--color-brand-100)] transition-colors" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-display font-semibold text-lg sm:text-xl text-[var(--color-ink)] group-hover:text-[var(--color-brand-700)] transition-colors leading-snug">
            {u.title}
          </span>
          <span className="caption font-semibold uppercase tracking-wider text-[var(--color-brand-600)] bg-[var(--color-brand-50)] px-2 py-0.5 rounded">
            Unit {u.number}
          </span>
        </div>
        <p className="small text-[var(--color-ink-muted)] mt-2 leading-relaxed line-clamp-2">
          {u.short}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Unit contents">
          <StatPill>{u.topics.length} topic{u.topics.length === 1 ? "" : "s"}</StatPill>
          <StatPill>{videoCount} video{videoCount === 1 ? "" : "s"}</StatPill>
          {worksheetCount > 0 && (
            <StatPill>
              {worksheetCount} worksheet{worksheetCount === 1 ? "" : "s"}
            </StatPill>
          )}
          <StatPill>~{u.estimatedMinutes} min</StatPill>
        </ul>
      </div>

      <span
        aria-hidden
        className={[
          "self-end sm:self-center shrink-0 w-10 h-10 rounded-full grid place-items-center",
          "bg-[var(--color-surface-2)] text-[var(--color-ink-muted)] border border-[var(--color-border)]",
          "group-hover:bg-[var(--color-brand-600)] group-hover:border-[var(--color-brand-600)] group-hover:text-white",
          "transition-[background,border-color,color,transform] duration-200 group-hover:translate-x-0.5",
        ].join(" ")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </svg>
      </span>
    </Link>
  );
}

function StatPill({ children }: { children: ReactNode }) {
  return (
    <li>
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium text-[var(--color-ink-muted)] bg-[var(--color-bg)] border border-[var(--color-border)]">
        {children}
      </span>
    </li>
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
