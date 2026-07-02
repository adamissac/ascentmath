"use client";

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

function SubjectLevelCard({ tier, isBrand }: { tier: TutoringTier; isBrand: boolean }) {
  const cardClass = isBrand
    ? [
        "relative flex h-full min-w-[21rem] shrink-0 snap-start flex-col rounded-lg border border-white/18",
        tier.popular ? "overflow-visible" : "overflow-hidden",
        "bg-white/[0.14] p-6 transition-colors duration-300",
        "hover:border-white/30 hover:bg-white/[0.18]",
        "lg:min-w-0",
      ].join(" ")
    : [
        "card group relative flex h-full min-w-[21rem] shrink-0 snap-start flex-col p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] lg:min-w-0",
        tier.popular ? "overflow-visible" : "",
      ].join(" ");

  if (isBrand) {
    return (
      <article className={cardClass}>
        {tier.popular ? <TierPopularBadge variant="brand" /> : null}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/50">
              {tier.tierLabel}
            </p>
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
    );
  }

  return (
    <article className={cardClass}>
      {tier.popular ? <TierPopularBadge variant="light" /> : null}
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display font-bold text-lg text-[var(--color-ink)]">{tier.tierLabel}</h3>
        <span className="pill pill-brand text-[0.6875rem]">{tier.range}</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-[var(--color-accent-700)]">{tier.label}</p>
      <p className="mt-3 small text-[var(--color-ink-muted)] leading-relaxed">{tier.blurb}</p>
      <SubjectTopicList groups={tier.topicGroups} variant="light" />
    </article>
  );
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

function TierPopularBadge({ variant }: { variant: "brand" | "light" }) {
  const isBrand = variant === "brand";

  return (
    <div
      className="pointer-events-none absolute -left-3.5 -top-2 z-20 -rotate-[14deg]"
      aria-label="Popular tier"
      title="Popular"
    >
      <div
        className={[
          "flex items-center gap-1.5 rounded-full border px-2.5 py-1",
          "shadow-[0_8px_18px_-8px_rgba(15,17,21,0.55)]",
          isBrand
            ? "border-white/40 bg-[var(--color-accent-500)] text-white"
            : "border-[var(--color-accent-200)] bg-[var(--color-accent-500)] text-white",
        ].join(" ")}
      >
        <PopularStar />
        <span className="text-[0.625rem] font-bold uppercase tracking-[0.14em]">Popular</span>
      </div>
    </div>
  );
}

function PopularStar() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="shrink-0 drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]"
    >
      <path d="M12 2.5l2.55 5.97 6.47.56-4.9 4.23 1.48 6.32L12 17.77l-5.6 2.81 1.48-6.32-4.9-4.23 6.47-.56L12 2.5z" />
    </svg>
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
