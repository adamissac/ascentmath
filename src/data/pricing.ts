/**
 * Tutoring tiers by grade band (no public dollar amounts on cards).
 * hourlyRate is stored for internal reference and follow-up emails only.
 * Self-paced study paths on /mathematics stay free.
 */

export type TutoringTierId = "tier1" | "tier2" | "tier3" | "tier4";

/** @deprecated Use TutoringTierId, kept for gradual migration in types only */
export type SubjectLevelId = TutoringTierId;

export type SubjectTopicGroup = {
  label: string;
  items: readonly string[];
  highlightLabel?: boolean;
};

export type TutoringTier = {
  id: TutoringTierId;
  tierLabel: string;
  label: string;
  range: string;
  accent: string;
  blurb: string;
  rigorNote: string;
  hourlyRate: string;
  topicGroups: readonly SubjectTopicGroup[];
};

export const FIRST_SESSION_FREE = "Your first session is always free for new clients.";

export const SELF_STUDY_FREE_NOTE =
  "Grades 6-8 self-paced study paths on this site are free, no account required.";

/** Shown under the tier cards (homepage and anywhere tiers are listed). */
export const TIER_PRICING_EXPLAINER =
  "Book a session on this site. We'll reach out by call or email to confirm times and your tier — prices aren't listed here.";

/** One-line version for hero footers, nav-adjacent UI, etc. */
export const TIER_PRICING_SHORT =
  "Book here; we'll confirm pricing on a call or email.";

/** Booking form, follow-up emails, and short footnotes. */
export const PRICING_DISCUSSION_NOTE =
  "After you book, we'll contact you by call or email with times and your tier's rate.";

export const PRICING_FAQ_HOW_MUCH = `${FIRST_SESSION_FREE} ${TIER_PRICING_EXPLAINER} ${SELF_STUDY_FREE_NOTE}`;

/** Short phrase for tier lists in prose (booking copy, FAQs, etc.). */
export const TIER3_PHRASE = "high school, AP, SAT/ACT, and college";

export const PRICING_FAQ_TIERS =
  "Tier 1 is K-5 elementary math, Tier 2 is middle school, Tier 3 is high school & SAT/ACT, and Tier 4 is college / dual enrollment. Pick the tier that fits your class.";

/** e.g. homepage tier explainer lines */
export const TUTORING_TIERS_SUMMARY = "K-5, middle school, high school & SAT/ACT, and college";

export const TUTORING_TIERS: readonly TutoringTier[] = [
  {
    id: "tier1",
    tierLabel: "Tier 1",
    label: "Elementary math",
    range: "K-5",
    accent: "bg-[var(--color-brand-400)]",
    hourlyRate: "$30/hr",
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
    label: "Middle school math",
    range: "Grades 6-8",
    accent: "bg-white/70",
    hourlyRate: "$35/hr",
    blurb: "Pre-algebra through early algebra, ratios, and the geometry that shows up in middle school.",
    rigorNote: "Where most students first hit abstract math — steady 1-on-1 help on school pacing.",
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
    label: "High school courses",
    range: "Grades 9-12 · SAT/ACT",
    accent: "bg-[var(--color-brand-300)]",
    hourlyRate: "$40/hr",
    blurb: "Algebra 1 through AP Calculus and AP CS, plus SAT & ACT Math prep.",
    rigorNote: "Higher rigor: AP courses and standardized test math.",
    topicGroups: [
      {
        label: "Core courses",
        items: [
          "Algebra 1",
          "Geometry",
          "Algebra 2",
          "Pre-Calculus",
        ],
      },
      {
        label: "AP courses",
        items: [
          "AP Pre-Calculus",
          "AP Calculus AB & BC",
          "AP Statistics",
          "AP Computer Science A",
        ],
      },
      {
        label: "SAT & ACT Math",
        highlightLabel: true,
        items: [
          "SAT Math strategies & practice",
          "ACT Math prep",
          "Timed practice and score review",
        ],
      },
    ],
  },
  {
    id: "tier4",
    tierLabel: "Tier 4",
    label: "College / dual enrollment",
    range: "College",
    accent: "bg-[var(--color-accent-300)]",
    hourlyRate: "$50/hr",
    blurb: "Georgia Tech math and CS courses we've taken ourselves — plus dual enrollment.",
    rigorNote: "College-level problem sets, projects, and exam prep.",
    topicGroups: [
      {
        label: "Math",
        items: [
          "MATH 1554 — Linear Algebra",
          "MATH 2551 — Multivariable Calculus",
        ],
      },
      {
        label: "Computer science",
        items: [
          "CS 1301 — Introduction to Computing and Programming",
          "CS 1331 — Introduction to Object-Oriented Programming",
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
