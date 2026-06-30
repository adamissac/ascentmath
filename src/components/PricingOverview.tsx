"use client";

import type { ReactNode } from "react";
import Button from "./Button";
import HashLink from "./HashLink";
import Reveal from "./Reveal";
import { BOOK_SESSION_HREF, CREDENTIALS_HREF } from "../lib/site-paths";
import {
  FIRST_SESSION_FREE,
  TIER_PRICING_EXPLAINER,
  TUTORING_TIERS,
  type TutoringTier,
  type SubjectTopicGroup,
} from "../data/pricing";

type Variant = "brand" | "light";

const TIER_STRIPE = "bg-[var(--color-brand-300)]";
const POPULAR_STRIPE = "bg-[var(--color-accent-400)]";

export function SubjectLevelCards({ variant = "brand" }: { variant?: Variant }) {
  const isBrand = variant === "brand";

  return (
    <Reveal variant="rise">
      <div
        className={[
          "flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory",
          "lg:grid lg:grid-cols-4 lg:items-stretch lg:gap-6 lg:overflow-visible lg:pb-0 lg:snap-none",
        ].join(" ")}
      >
        {TUTORING_TIERS.map((tier) => (
          <SubjectLevelCard key={tier.id} tier={tier} isBrand={isBrand} />
        ))}
      </div>
    </Reveal>
  );
}

function PopularPill({ label, variant }: { label: string; variant: "brand" | "light" }) {
  if (variant === "brand") {
    return (
      <span className="shrink-0 rounded-full border border-[var(--color-accent-300)]/40 bg-[var(--color-accent-500)]/12 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-[var(--color-accent-300)]">
        {label}
      </span>
    );
  }

  return <span className="pill pill-accent text-[0.6875rem]">{label}</span>;
}

function PopularCardFrame({
  children,
  isBrand,
}: {
  children: ReactNode;
  isBrand: boolean;
}) {
  const shellClass = [
    "relative flex h-full min-w-[21rem] shrink-0 snap-start lg:min-w-0",
    isBrand ? "" : "rounded-xl p-[2px] bg-gradient-to-br from-[var(--color-accent-100)] via-[var(--color-accent-300)]/70 to-[var(--color-brand-200)]",
  ].join(" ");

  if (isBrand) {
    return (
      <div
        className={`${shellClass} rounded-lg p-[1.5px] bg-gradient-to-br from-[var(--color-accent-300)]/75 via-[var(--color-accent-500)]/45 to-[var(--color-brand-300)]/35`}
      >
        {children}
      </div>
    );
  }

  return <div className={shellClass}>{children}</div>;
}

function SubjectLevelCard({ tier, isBrand }: { tier: TutoringTier; isBrand: boolean }) {
  const isPopular = Boolean(tier.badge);

  const cardClass = isBrand
    ? [
        "relative flex h-full w-full flex-col overflow-hidden rounded-[7px] p-6 transition-colors duration-300",
        isPopular
          ? "bg-white/[0.18] hover:bg-white/[0.22]"
          : "rounded-lg border border-white/18 bg-white/[0.14] hover:border-white/30 hover:bg-white/[0.18]",
        "min-w-[21rem] shrink-0 snap-start lg:min-w-0",
      ].join(" ")
    : [
        "card group relative flex h-full w-full flex-col overflow-hidden rounded-[10px] p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]",
        isPopular ? "bg-[var(--color-surface)]" : "",
        "min-w-[21rem] shrink-0 snap-start lg:min-w-0",
      ].join(" ");

  const stripeClass = isPopular ? POPULAR_STRIPE : TIER_STRIPE;

  const card = isBrand ? (
    <article className={cardClass}>
      <span aria-hidden className={`absolute left-0 top-0 h-full w-1 ${stripeClass}`} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/50">
              {tier.tierLabel}
            </p>
            {tier.badge ? <PopularPill label={tier.badge} variant="brand" /> : null}
          </div>
          <h3 className="font-display mt-1 text-lg font-bold text-white sm:text-xl">
            {tier.label}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-white/85">
          {tier.range}
        </span>
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-white/70">{tier.blurb}</p>
      <SubjectTopicList groups={tier.topicGroups} variant="brand" />
    </article>
  ) : (
    <article className={cardClass}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h3 className="font-display font-bold text-lg text-[var(--color-ink)]">{tier.tierLabel}</h3>
          {tier.badge ? <PopularPill label={tier.badge} variant="light" /> : null}
        </div>
        <span className="pill pill-brand text-[0.6875rem]">{tier.range}</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-[var(--color-accent-700)]">{tier.label}</p>
      <p className="mt-3 small text-[var(--color-ink-muted)] leading-relaxed">{tier.blurb}</p>
      <SubjectTopicList groups={tier.topicGroups} variant="light" />
    </article>
  );

  if (isPopular) {
    return <PopularCardFrame isBrand={isBrand}>{card}</PopularCardFrame>;
  }

  return card;
}

export function PricingTierExplainer({ variant = "brand" }: { variant?: Variant }) {
  const isBrand = variant === "brand";
  return (
    <div
      className={[
        "mx-auto max-w-lg text-center pt-8",
        isBrand ? "border-t border-white/10" : "border-t border-[var(--color-border)]",
      ].join(" ")}
    >
      <p
        className={[
          "text-sm font-semibold leading-relaxed",
          isBrand ? "text-[var(--color-accent-300)]" : "text-[var(--color-brand-700)]",
        ].join(" ")}
      >
        {FIRST_SESSION_FREE}
      </p>
      <p
        className={[
          "mt-3 text-sm leading-relaxed",
          isBrand ? "text-white/70" : "text-[var(--color-ink-muted)]",
        ].join(" ")}
      >
        {TIER_PRICING_EXPLAINER}
      </p>
    </div>
  );
}

export function PricingCtaRow({ variant = "brand" }: { variant?: Variant }) {
  const isBrand = variant === "brand";
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button
        href={BOOK_SESSION_HREF}
        variant={isBrand ? "accent" : "primary"}
        size="lg"
        rightIcon={<Arrow />}
        className="w-full sm:w-auto"
      >
        Book a session
      </Button>
      <HashLink
        href={CREDENTIALS_HREF}
        className={[
          "text-sm font-semibold transition-colors",
          isBrand
            ? "text-white/80 hover:text-white"
            : "text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)]",
        ].join(" ")}
      >
        See credentials →
      </HashLink>
    </div>
  );
}

function SubjectTopicList({
  groups,
  variant,
}: {
  groups: readonly SubjectTopicGroup[];
  variant: "brand" | "light";
}) {
  const isBrand = variant === "brand";
  const showGroupLabels = groups.length > 1;

  return (
    <div className="mt-5 flex flex-1 flex-col gap-4">
      {groups.map((group) => (
        <div key={group.label}>
          {showGroupLabels && (
            <p
              className={[
                "mb-2 text-[0.6875rem] font-semibold uppercase tracking-wider",
                group.highlightLabel
                  ? isBrand
                    ? "text-[var(--color-accent-300)]"
                    : "text-[var(--color-accent-700)]"
                  : isBrand
                    ? "text-[var(--color-brand-300)]"
                    : "text-[var(--color-brand-600)]",
              ].join(" ")}
            >
              {group.label}
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className={[
                  "flex items-start gap-2",
                  isBrand ? "text-sm text-white/90" : "small text-[var(--color-ink)]",
                ].join(" ")}
              >
                <PricingCheck light={isBrand} />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PricingCheck({ light }: { light?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={light ? "var(--color-brand-300)" : "currentColor"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0 mt-0.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
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
