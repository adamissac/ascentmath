"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import Container from "./Container";
import HeroStatBadge from "./HeroStatBadge";
import MathBackdrop from "./MathBackdrop";
import { UnitSymbol } from "./UnitSymbol";

export type HeroStat = { value: string | number; label: string };

const CARD =
  "rounded-2xl border border-[rgba(26,26,46,0.08)] bg-white/80 p-5 shadow-[0_2px_12px_rgba(26,26,46,0.04)] sm:p-7 lg:p-8";

const HEADLINE_ACCENT =
  "text-[var(--color-brand-500)] underline decoration-[var(--color-accent-100)] decoration-[0.18em] underline-offset-[0.12em]";

type GradeHeroProps = {
  variant: "grade";
  breadcrumbs: Crumb[];
  gradeTitle: string;
  description: string;
  stats: HeroStat[];
  unitIcons: string[];
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

type Props = GradeHeroProps | UnitHeroProps;

export default function CurriculumHero(props: Props) {
  const isGrade = props.variant === "grade";

  return (
    <section className="hero-surface relative overflow-hidden bg-[var(--color-bg)]">
      {isGrade ? (
        <MathBackdrop variant="paper" density="light" contentSafe fadeEdges clipart={false} />
      ) : (
        <MathBackdrop variant="paper" density="light" fadeEdges contentSafe />
      )}

      <Container size="xl" className="relative z-[1] pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pb-20">
        <div className="flex justify-center sm:justify-start">
          <Breadcrumbs items={props.breadcrumbs} />
        </div>

        <div className="mt-6 sm:mt-8">
          <div className={CARD}>
            {isGrade ? (
              <GradeHeroBody {...props} />
            ) : (
              <UnitHeroBody {...props} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function GradeHeroBody({
  gradeTitle,
  description,
  stats,
  unitIcons,
  primaryCta,
  secondaryCta,
}: GradeHeroProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 xl:gap-14">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-[var(--color-accent-50)] px-2.5 py-0.5 font-display text-sm font-bold tracking-tight text-[var(--color-accent-500)]">
            Free
          </span>
          <span className="inline-flex rounded-full border border-[#2A4BCB]/20 bg-[#F7F9FF] px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-brand-500)]">
            {gradeTitle} · GADOE aligned
          </span>
        </div>

        <h1 className="h-display mt-5 min-w-0 break-words text-[var(--color-ink-cool)]">
          Self-paced{" "}
          <span className={HEADLINE_ACCENT}>{gradeTitle}</span> math paths.
        </h1>

        <p className="mt-5 max-w-[52ch] text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-[1.7] text-[var(--color-ink-cool-muted)]">
          {description}
        </p>

        {stats.length > 0 && (
          <ul
            className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:max-w-xl lg:grid-cols-5"
            aria-label="Grade totals"
          >
            {stats.map((s) => (
              <HeroStatBadge key={s.label} value={s.value} label={s.label} />
            ))}
          </ul>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-6 btn-stack-mobile sm:flex-row">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn btn-primary btn-sm">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <a href={secondaryCta.href} className="btn btn-outline btn-sm">
                {secondaryCta.label}
              </a>
            )}
          </div>
        )}
      </div>

      {unitIcons.length > 0 && (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-[rgba(26,26,46,0.08)] bg-[#FBFAF7]/80 p-5 sm:p-6 lg:min-w-[12rem]"
          aria-hidden
        >
          <p className="mb-4 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-cool-soft)]">
            Units in this grade
          </p>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {unitIcons.map((icon, i) => (
              <UnitSymbol key={`${icon}-${i}`} symbol={icon} size="sm" />
            ))}
          </div>
        </div>
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
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 xl:gap-14">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-[var(--color-accent-50)] px-2.5 py-0.5 font-display text-sm font-bold tracking-tight text-[var(--color-accent-500)]">
            Free
          </span>
          <span className="inline-flex rounded-full border border-[#2A4BCB]/20 bg-[#F7F9FF] px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-brand-500)]">
            {gradeTitle} · Unit {unitNumber}
          </span>
          {frameworkUrl && (
            <a
              href={frameworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-[rgba(26,26,46,0.12)] bg-[var(--color-bg)] px-2.5 py-0.5 text-[0.6875rem] font-semibold text-[var(--color-brand-500)] no-underline transition-[border-color,background-color] hover:border-[#2A4BCB]/30 hover:bg-white"
            >
              GADOE framework
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>

        <h1 className="h-display mt-5 min-w-0 break-words text-[var(--color-ink-cool)]">{unitTitle}</h1>

        <p className="mt-5 max-w-[52ch] text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-[1.7] text-[var(--color-ink-cool-muted)]">
          {description}
        </p>

        {stats.length > 0 && (
          <ul
            className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:max-w-lg"
            aria-label="Unit totals"
          >
            {stats.map((s) => (
              <HeroStatBadge key={s.label} value={s.value} label={s.label} />
            ))}
          </ul>
        )}

        {actions && <div className="mt-6">{actions}</div>}
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-[rgba(26,26,46,0.08)] bg-[#FBFAF7]/80 px-6 py-8 sm:px-8">
        <UnitSymbol symbol={unitIcon} size="lg" className="shadow-[0_4px_20px_rgba(42,75,203,0.12)]" />
        <p className="mt-4 text-center font-display text-sm font-bold text-[var(--color-brand-500)]">
          Unit {unitNumber}
        </p>
      </div>
    </div>
  );
}
