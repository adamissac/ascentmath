"use client";

import Button from "./Button";
import HashLink from "./HashLink";
import Reveal from "./Reveal";
import { BOOK_SESSION_HREF, CREDENTIALS_HREF } from "../lib/site-paths";
import {
  CREDENTIALS,
  PRICING_DISCUSSION_NOTE,
  TIER_PRICING_EXPLAINER,
  TUTORING_TIERS,
  type TutoringTier,
  type SubjectTopicGroup,
} from "../data/pricing";

type Variant = "brand" | "light";

const TIER_STRIPE = "bg-[#7E97F0]";

export function SubjectLevelCards({ variant = "brand" }: { variant?: Variant }) {
  const isBrand = variant === "brand";

  return (
    <Reveal stagger variant="pop" className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
      {TUTORING_TIERS.map((tier) => (
        <SubjectLevelCard key={tier.id} tier={tier} isBrand={isBrand} />
      ))}
    </Reveal>
  );
}

function SubjectLevelCard({ tier, isBrand }: { tier: TutoringTier; isBrand: boolean }) {
  if (isBrand) {
    return (
      <article
        className={[
          "relative flex h-full flex-col overflow-hidden rounded-lg border border-white/18",
          "bg-white/[0.14] p-6",
        ].join(" ")}
      >
        <span aria-hidden className={`absolute left-0 top-0 h-full w-1 ${TIER_STRIPE}`} />

        <div className="relative flex items-start justify-between gap-3">
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
    <article className="card group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
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

export function PricingCredentials({ variant = "brand" }: { variant?: Variant }) {
  const isBrand = variant === "brand";
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {CREDENTIALS.map(({ label, value }) => (
        <span
          key={label}
          className={[
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm",
            isBrand
              ? "border-white/20 bg-white/10 text-white/90"
              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-muted)]",
          ].join(" ")}
        >
          <span
            className={[
              "font-display font-bold",
              isBrand ? "text-[var(--color-accent-300)]" : "text-[var(--color-brand-700)]",
            ].join(" ")}
          >
            {value}
          </span>
          <span className={isBrand ? "text-white/75" : ""}>{label}</span>
        </span>
      ))}
    </div>
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
          "text-sm leading-relaxed",
          isBrand ? "text-white/70" : "text-[var(--color-ink-muted)]",
        ].join(" ")}
      >
        {TIER_PRICING_EXPLAINER}
      </p>
    </div>
  );
}

export function PricingDiscussionNote({ variant = "light" }: { variant?: Variant }) {
  const isBrand = variant === "brand";
  return (
    <p
      className={[
        "text-sm leading-relaxed max-w-2xl mx-auto text-center",
        isBrand ? "text-white/75" : "text-[var(--color-ink-muted)]",
      ].join(" ")}
    >
      {PRICING_DISCUSSION_NOTE}
    </p>
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
                isBrand ? "text-[var(--color-brand-300)]" : "text-[var(--color-brand-600)]",
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
      stroke={light ? "#7E97F0" : "currentColor"}
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
