/**
 * Tutoring tiers by grade band (no public dollar amounts on cards).
 * Self-paced study paths on /mathematics stay free.
 */

export type TutoringTierId = "tier1" | "tier2" | "tier3" | "tier4";

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
  topicGroups: readonly SubjectTopicGroup[];
  /** Show a corner star badge (e.g. high school tier). */
  popular?: boolean;
};

export const FIRST_SESSION_FREE = "Your first session is free for new clients.";

/** Shown under the tier cards (homepage and anywhere tiers are listed). */
export const TIER_PRICING_EXPLAINER =
  "Book a session on this site. We'll reach out by call or email to confirm times and your tier. Prices aren't listed here.";

export const TUTORING_TIERS_SUMMARY = "K-5, middle school, high school & SAT/ACT, and college";

export const TUTORING_TIERS: readonly TutoringTier[] = [
  {
    id: "tier1",
    tierLabel: "Tier 1",
    label: "Elementary math",
    range: "K-5",
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
    label: "Middle school math",
    range: "Grades 6-8",
    accent: "bg-white/70",
    blurb: "Pre-algebra through early algebra, ratios, and the geometry that shows up in middle school.",
    rigorNote: "Where most students first hit abstract math. Steady 1-on-1 help on school pacing.",
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
    popular: true,
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
    blurb: "Georgia Tech math and CS courses we've taken ourselves, plus dual enrollment.",
    rigorNote: "College-level problem sets, projects, and exam prep.",
    topicGroups: [
      {
        label: "Math",
        items: [
          "MATH 1554: Linear Algebra",
          "MATH 2551: Multivariable Calculus",
        ],
      },
      {
        label: "Computer science",
        items: [
          "CS 1301: Introduction to Computing and Programming",
          "CS 1331: Introduction to Object-Oriented Programming",
        ],
      },
    ],
  },
] as const;
