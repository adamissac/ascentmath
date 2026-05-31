import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import Section from "../../../../components/Section";
import Card from "../../../../components/Card";
import Badge from "../../../../components/Badge";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import ResourceLinkCard from "../../../../components/ResourceLinkCard";
import UnitStudyPanel from "../../../../components/UnitStudyPanel";
import Reveal from "../../../../components/Reveal";
import MathBackdrop from "../../../../components/MathBackdrop";
import { UnitSymbol } from "../../../../components/UnitSymbol";
import Container from "../../../../components/Container";

import { GRADES, getGrade, getUnit, getUnitIndex, countUnitVideos, type Topic } from "../../../../data/units";

type Params = { grade: string; unit: string };

export function generateStaticParams() {
  return GRADES.flatMap((g) => g.units.map((u) => ({ grade: g.slug, unit: u.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { grade, unit } = await params;
  const g = getGrade(grade);
  const u = getUnit(grade, unit);
  if (!g || !u) return { title: "Unit not found" };
  return {
    title: `${g.title} · Unit ${u.number}: ${u.title}`,
    description: u.description,
  };
}

export default async function UnitPage({ params }: { params: Promise<Params> }) {
  const { grade, unit } = await params;
  const g = getGrade(grade);
  const u = getUnit(grade, unit);
  if (!g || !u) notFound();

  const idx = getUnitIndex(grade, unit);
  const prev = idx > 0 ? g.units[idx - 1] : null;
  const next = idx < g.units.length - 1 ? g.units[idx + 1] : null;

  const firstTopic = u.topics[0];
  const totalVideos = countUnitVideos(u);

  const progressItems = u.topics.map((t) => ({ id: t.id, label: t.title }));

  const navLinks = [
    ...(u.topics.length > 0 ? [{ href: "#topics", label: "Topics" }] : []),
    { href: "#objectives", label: "Objectives & vocabulary" },
    ...(u.externalPractice.length > 0 ? [{ href: "#extra", label: "Extra practice" }] : []),
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero-surface relative overflow-hidden">
        <MathBackdrop variant="paper" density="dense" fadeEdges />
        <Container size="xl" className="relative pt-10 pb-14 sm:pb-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Mathematics", href: "/mathematics" },
              { label: g.title, href: `/mathematics/${g.slug}` },
              { label: `Unit ${u.number}` },
            ]}
          />

          <Reveal className="mt-6 max-w-4xl" variant="up">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge tone="brand">{g.title} · Unit {u.number}</Badge>
              <span className="caption text-[var(--color-ink-muted)]">~{u.estimatedMinutes} min</span>
              <span className="caption text-[var(--color-ink-muted)]">
                {u.topics.length} topics · {totalVideos} videos
              </span>
              {u.frameworkUrl && (
                <a
                  href={u.frameworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="caption text-[var(--color-brand-600)] hover:underline inline-flex items-center gap-1"
                >
                  GADOE framework
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>

            <h1 className="h-display mt-5 min-w-0 break-words">{u.title}</h1>

            <p className="lede mt-5">{u.description}</p>

            {firstTopic && (
              <div className="mt-6 btn-stack-mobile sm:flex-row">
                <Link href={`/mathematics/${g.slug}/${u.slug}/${firstTopic.slug}`} className="btn btn-primary btn-sm">
                  Start the first topic →
                </Link>
                <a href="#topics" className="btn btn-outline btn-sm">
                  See all topics
                </a>
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      <UnitStudyPanel
        unitId={u.id}
        unitTitle={`Unit ${u.number}: ${u.title}`}
        progressItems={progressItems}
        navLinks={navLinks}
      >
        {/* TOPICS */}
        {u.topics.length > 0 && (
          <Section tone="default" size="sm" containerSize="xl" decorated="paper" decoratedDensity="medium" reveal={false}>
            <section id="topics" aria-labelledby="topics-h">
              <Reveal>
                <span className="eyebrow">Work through these</span>
                <h2 id="topics-h" className="h2 mt-2">Topics in this unit</h2>
                <p className="lede mt-2 max-w-3xl">
                  Each topic is a short page: read the walkthrough, watch the video, try the practice,
                  then take a quick quiz. Go in order or jump to what you need.
                </p>
              </Reveal>
              <Reveal stagger className="mt-8 grid gap-3 sm:gap-4">
                {u.topics.map((t, i) => (
                  <TopicCard key={t.id} gradeSlug={g.slug} unitSlug={u.slug} topic={t} index={i} />
                ))}
              </Reveal>
            </section>
          </Section>
        )}

        {/* OBJECTIVES & VOCABULARY */}
        <Section tone="muted" size="sm" containerSize="xl" decorated="muted" decoratedDensity="medium" reveal={false}>
          <section id="objectives" aria-labelledby="objectives-h">
            <Reveal>
              <span className="eyebrow">Goals</span>
              <h2 id="objectives-h" className="h2 mt-2">Learning objectives</h2>
              <p className="lede mt-2">By the end of this unit, you should be able to:</p>
            </Reveal>
            <ul className="mt-6 grid gap-3">
              {u.objectives.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 w-5 h-5 rounded-full bg-[var(--color-brand-500)] text-white grid place-items-center text-xs font-bold flex-shrink-0">✓</span>
                  <span className="text-[var(--color-ink)] leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>

            {u.vocabulary && u.vocabulary.length > 0 && (
              <div className="mt-10">
                <h3 className="h3">Key vocabulary</h3>
                <dl className="mt-4 grid sm:grid-cols-2 gap-3">
                  {u.vocabulary.map((v) => (
                    <Card key={v.term} className="p-4">
                      <dt className="font-semibold text-[var(--color-ink)]">{v.term}</dt>
                      <dd className="small text-[var(--color-ink-muted)] mt-1">{v.meaning}</dd>
                    </Card>
                  ))}
                </dl>
              </div>
            )}
          </section>
        </Section>

        {/* EXTRA PRACTICE */}
        {u.externalPractice.length > 0 && (
          <Section tone="muted" size="sm" containerSize="xl" decorated="muted" decoratedDensity="medium" reveal={false}>
            <section id="extra" aria-labelledby="extra-h">
              <Reveal>
                <span className="eyebrow">More practice</span>
                <h2 id="extra-h" className="h2 mt-2">External resources</h2>
                <p className="lede mt-2">
                  Hand-picked links from Khan Academy and trusted worksheet libraries.
                </p>
              </Reveal>
              <Reveal stagger className="mt-8 grid sm:grid-cols-2 gap-4">
                {u.externalPractice.map((r) => (
                  <ResourceLinkCard
                    key={r.href}
                    href={r.href}
                    title={r.title}
                    description={r.description}
                    source={r.source}
                  />
                ))}
              </Reveal>
            </section>
          </Section>
        )}

        {/* PREV / NEXT */}
        <Section tone="muted" size="sm" decorated="muted" decoratedDensity="medium">
          <div className="grid sm:grid-cols-2 gap-4">
            {prev ? (
              <PrevNextCard
                direction="prev"
                label={`Unit ${prev.number}`}
                title={prev.title}
                href={`/mathematics/${g.slug}/${prev.slug}`}
              />
            ) : (
              <Link href={`/mathematics/${g.slug}`} className="card card-interactive p-6 flex items-center gap-3 no-underline">
                <span aria-hidden>←</span>
                <span>
                  <span className="caption text-[var(--color-ink-muted)] uppercase tracking-wider">Back to</span>
                  <span className="block font-semibold text-[var(--color-ink)]">{g.title} library</span>
                </span>
              </Link>
            )}
            {next ? (
              <PrevNextCard
                direction="next"
                label={`Unit ${next.number}`}
                title={next.title}
                href={`/mathematics/${g.slug}/${next.slug}`}
              />
            ) : (
              <Link href={`/mathematics/${g.slug}`} className="card card-interactive p-6 flex items-center gap-3 no-underline sm:flex-row-reverse sm:text-right bg-[var(--color-brand-50)] border-[var(--color-brand-100)]">
                <UnitSymbol symbol="★" size="sm" className="bg-[var(--color-brand-100)] border-[var(--color-brand-200)] text-[var(--color-brand-700)]" />
                <span className="flex-1">
                  <span className="caption uppercase tracking-wider text-[var(--color-brand-700)]">You finished</span>
                  <span className="block font-semibold text-[var(--color-ink)]">All units in {g.title}</span>
                </span>
              </Link>
            )}
          </div>
        </Section>
      </UnitStudyPanel>
    </>
  );
}

function TopicCard({ gradeSlug, unitSlug, topic, index }: { gradeSlug: string; unitSlug: string; topic: Topic; index: number }) {
  const videoCount = 1 + (topic.extraVideo ? 1 : 0);
  const hasPractice = Boolean(topic.worksheet) || (topic.practiceLinks?.length ?? 0) > 0;

  return (
    <Link
      href={`/mathematics/${gradeSlug}/${unitSlug}/${topic.slug}`}
      className={[
        "group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5",
        "p-5 sm:p-6 rounded-xl no-underline",
        "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]",
        "transition-[border-color,box-shadow,transform] duration-200 ease-out",
        "hover:border-[var(--color-brand-200)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]",
      ].join(" ")}
      aria-label={`Open topic: ${topic.title}`}
    >
      <span
        aria-hidden
        className="w-10 h-10 rounded-full bg-[var(--color-brand-500)] text-white grid place-items-center font-display font-bold flex-shrink-0"
      >
        {index + 1}
      </span>

      <div className="min-w-0 flex-1">
        <span className="font-display font-semibold text-lg sm:text-xl text-[var(--color-ink)] group-hover:text-[var(--color-brand-700)] transition-colors leading-snug">
          {topic.title}
        </span>
        <p className="small text-[var(--color-ink-muted)] mt-1.5 leading-relaxed">{topic.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Topic contents">
          <StatPill>{videoCount} video{videoCount === 1 ? "" : "s"}</StatPill>
          {hasPractice && <StatPill>Practice</StatPill>}
          <StatPill>{topic.quiz.length}-question quiz</StatPill>
          <StatPill>~{topic.estimatedMinutes} min</StatPill>
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

function PrevNextCard({
  direction,
  label,
  title,
  href,
}: {
  direction: "prev" | "next";
  label: string;
  title: string;
  href: string;
}) {
  const arrow = direction === "prev" ? "←" : "→";
  return (
    <Link
      href={href}
      className={`card card-interactive p-6 flex items-center gap-4 no-underline ${
        direction === "next" ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <span aria-hidden className="text-[var(--color-ink-soft)] text-xl">{arrow}</span>
      <span className="flex-1">
        <span className="caption text-[var(--color-ink-muted)] uppercase tracking-wider">
          {direction === "prev" ? "Previous" : "Next up"} · {label}
        </span>
        <span className="block font-semibold text-[var(--color-ink)] mt-0.5">{title}</span>
      </span>
    </Link>
  );
}
