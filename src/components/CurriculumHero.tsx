"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import Container from "./Container";
import HashLink from "./HashLink";
import Reveal from "./Reveal";
import { UnitSymbol } from "./UnitSymbol";

export type HeroStat = { value: string | number; label: string };

type GradeHeroProps = {
  variant: "grade";
  breadcrumbs: Crumb[];
  gradeTitle: string;
  gradeIcon?: string;
  description: string;
  stats: HeroStat[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

type UnitHeroProps = {
  variant: "unit";
  breadcrumbs: Crumb[];
  gradeTitle: string;
  unitNumber: number;
  unitTitle: string;
  unitIcon: string;
  description: string;
  stats: HeroStat[];
  frameworkUrl?: string;
  actions?: ReactNode;
};

type TopicHeroProps = {
  variant: "topic";
  breadcrumbs: Crumb[];
  gradeTitle: string;
  unitNumber: number;
  topicIndex: number;
  topicTotal: number;
  topicTitle: string;
  description: string;
  estimatedMinutes: number;
  actions?: ReactNode;
};

type Props = GradeHeroProps | UnitHeroProps | TopicHeroProps;

function formatMeta(stats: HeroStat[]) {
  return stats.map((s) => `${s.value} ${s.label}`).join(" · ");
}

export default function CurriculumHero(props: Props) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <Container size="lg" className="py-7 sm:py-9">
        <Breadcrumbs items={props.breadcrumbs} />

        <Reveal variant="up" className="mt-5">
          {props.variant === "grade" && <GradeHeroBody {...props} />}
          {props.variant === "unit" && <UnitHeroBody {...props} />}
          {props.variant === "topic" && <TopicHeroBody {...props} />}
        </Reveal>
      </Container>
    </section>
  );
}

function GradeHeroBody({
  gradeTitle,
  gradeIcon,
  description,
  stats,
  primaryCta,
  secondaryCta,
}: GradeHeroProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="caption rounded-full bg-[var(--color-accent-50)] px-2.5 py-0.5 font-semibold text-[var(--color-accent-700)]">
            Free
          </span>
          {stats.length > 0 && (
            <span className="caption text-[var(--color-ink-muted)]">{formatMeta(stats)}</span>
          )}
        </div>

        <h1 className="font-display mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--color-ink-cool)] sm:text-4xl">
          {gradeTitle} mathematics
        </h1>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
          {description}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn btn-primary btn-sm">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <HashLink href={secondaryCta.href} className="btn btn-outline btn-sm">
                {secondaryCta.label}
              </HashLink>
            )}
          </div>
        )}
      </div>

      {gradeIcon && (
        <span
          aria-hidden
          className="grid size-14 shrink-0 place-items-center rounded-xl bg-[var(--color-brand-50)] font-display text-2xl font-bold text-[var(--color-brand-600)]"
        >
          {gradeIcon}
        </span>
      )}
    </div>
  );
}

function UnitHeroBody({
  gradeTitle,
  unitNumber,
  unitTitle,
  unitIcon,
  description,
  stats,
  frameworkUrl,
  actions,
}: UnitHeroProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 max-w-2xl">
        <p className="caption font-semibold text-[var(--color-brand-600)]">
          {gradeTitle} · Unit {unitNumber}
          {frameworkUrl && (
            <>
              {" · "}
              <a
                href={frameworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)]"
              >
                GADOE framework ↗
              </a>
            </>
          )}
        </p>

        <h1 className="font-display mt-2 text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink-cool)] sm:text-3xl">
          {unitTitle}
        </h1>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)]">
          {description}
        </p>

        {stats.length > 0 && (
          <p className="caption mt-3 font-semibold text-[var(--color-ink-soft)]">{formatMeta(stats)}</p>
        )}

        {actions && <div className="mt-5 flex flex-wrap gap-3">{actions}</div>}
      </div>

      <UnitSymbol symbol={unitIcon} size="md" />
    </div>
  );
}

function TopicHeroBody({
  gradeTitle,
  unitNumber,
  topicIndex,
  topicTotal,
  topicTitle,
  description,
  estimatedMinutes,
  actions,
}: TopicHeroProps) {
  return (
    <div className="max-w-2xl">
      <p className="caption font-semibold text-[var(--color-brand-600)]">
        {gradeTitle} · Unit {unitNumber} · Topic {topicIndex + 1} of {topicTotal} · ~{estimatedMinutes} min
      </p>

      <h1 className="font-display mt-2 text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink-cool)] sm:text-3xl">
        {topicTitle}
      </h1>

      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)]">
        {description}
      </p>

      {actions && <div className="mt-5 flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}
