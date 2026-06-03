/**
 * Tutoring tiers by grade band (no public dollar amounts).
 * Final rates are discussed by call or email based on course rigor.
 * Self-paced study paths on /mathematics stay free.
 */

export type TutoringTierId = "tier1" | "tier2" | "tier3";

/** @deprecated Use TutoringTierId, kept for gradual migration in types only */
export type SubjectLevelId = TutoringTierId;

export type SubjectTopicGroup = {
  label: string;
  items: readonly string[];
};

export type TutoringTier = {
  id: TutoringTierId;
  tierLabel: string;
  label: string;
  range: string;
  accent: string;
  blurb: string;
  rigorNote: string;
  topicGroups: readonly SubjectTopicGroup[];
};

export const SELF_STUDY_FREE_NOTE =
  "Grades 6-8 self-paced study paths on this site are free, no account required.";

/** Shown under the tier cards (homepage and anywhere tiers are listed). */
export const TIER_PRICING_EXPLAINER =
  "Book a session on this site. I'll reach out by call or email to confirm the rate for your tier, prices aren't listed here.";

/** One-line version for hero footers, nav-adjacent UI, etc. */
export const TIER_PRICING_SHORT =
  "Book here; we'll confirm pricing on a call or email.";

/** Booking form, follow-up emails, and short footnotes. */
export const PRICING_DISCUSSION_NOTE =
  "After you book, I'll contact you by call or email with times and your tier's rate.";

export const PRICING_FAQ_HOW_MUCH = `${TIER_PRICING_EXPLAINER} ${SELF_STUDY_FREE_NOTE}`;

/** Tier 3 card title (high school AP through college math). */
export const TIER3_LABEL = "High school & college";

/** Short phrase for tier lists in prose (booking copy, FAQs, etc.). */
export const TIER3_PHRASE = "high school, AP, and college";

export const PRICING_FAQ_TIERS =
  `Tier 1 is K-6, Tier 2 is middle school, Tier 3 is ${TIER3_PHRASE} math. Pick the tier that fits your class.`;

/** e.g. homepage tier explainer lines */
export const TUTORING_TIERS_SUMMARY = `K-6, middle school, and ${TIER3_LABEL.toLowerCase()}`;

export const TUTORING_TIERS: readonly TutoringTier[] = [
  {
    id: "tier1",
    tierLabel: "Tier 1",
    label: "K-6",
    range: "K-6",
    accent: "bg-[var(--color-brand-400)]",
    blurb: "Arithmetic, fractions, early geometry, and everything before pre-algebra.",
    rigorNote: "Foundational skills and homework support for elementary learners.",
    topicGroups: [
      {
        label: "Core skills",
        items: [
          "Number sense, place value, and arithmetic",
          "Fractions, decimals, and percent",
          "Measurement, area, and perimeter",
          "Early geometry and angles",
          "Intro ratios and proportions",
        ],
      },
      {
        label: "Support",
        items: ["Word problems", "Homework help", "Classroom test review"],
      },
    ],
  },
  {
    id: "tier2",
    tierLabel: "Tier 2",
    label: "Middle school",
    range: "Grades 6-8",
    accent: "bg-white/70",
    blurb: "Pre-algebra through early algebra, ratios, and the geometry that shows up in middle school.",
    rigorNote: "Where most students first hit abstract math, steady 1-on-1 help on school pacing.",
    topicGroups: [
      {
        label: "Number & algebra",
        items: [
          "Pre-algebra",
          "Ratios, rates, and proportions",
          "Expressions and one-step equations",
          "Intro systems and inequalities",
        ],
      },
      {
        label: "Geometry & data",
        items: ["Area, volume, and angle relationships", "Coordinate plane", "Statistics basics"],
      },
      {
        label: "Support",
        items: ["Homework and unit tests", "EOC / placement review", "Confidence before high school"],
      },
    ],
  },
  {
    id: "tier3",
    tierLabel: "Tier 3",
    label: TIER3_LABEL,
    range: "Grades 9+ · college",
    accent: "bg-[var(--color-brand-300)]",
    blurb:
      "High school AP math through linear algebra and multivariable calc, courses I've taken myself.",
    rigorNote: "Higher rigor: AP Pre-Calc, AP Calc, SAT Math, and Georgia Tech-level coursework.",
    topicGroups: [
      {
        label: "AP Pre-Calculus",
        items: [
          "Functions & transformations",
          "Trigonometry",
          "Analytic geometry & conics",
        ],
      },
      {
        label: "AP Calculus AB & BC",
        items: [
          "Limits, derivatives, and integrals",
          "Series & sequences (BC)",
          "Parametric & polar (BC)",
        ],
      },
      {
        label: "Test prep & college",
        items: [
          "SAT Math",
          "Linear algebra",
          "Multivariable calculus",
          "Vector calculus topics",
        ],
      },
    ],
  },
] as const;

/** Same data as tiers, used by “What I teach” cards */
export const SUBJECT_LEVELS = TUTORING_TIERS;

export const CREDENTIALS = [
  { label: "SAT Math", value: "800" },
  { label: "AP Pre-Calculus", value: "5" },
  { label: "AP Calc AB & BC", value: "5" },
  { label: "Algebra EOC", value: "100%" },
] as const;

export function getTutoringTier(id: TutoringTierId) {
  const tier = TUTORING_TIERS.find((t) => t.id === id);
  if (!tier) throw new Error(`Unknown tutoring tier: ${id}`);
  return tier;
}

/** @deprecated Use getTutoringTier */
export function getSubjectLevel(id: TutoringTierId) {
  return getTutoringTier(id);
}

export function describeBookingSelection(tierId: TutoringTierId) {
  const tier = getTutoringTier(tierId);
  return `${tier.tierLabel} · ${tier.label} (${tier.range}) · rate for this tier confirmed on call/email`;
}
