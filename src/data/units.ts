/**
 * Curriculum data — single source of truth for all Mathematics units.
 *
 * Add or edit units, lessons, videos, worksheets, or quiz questions here
 * and every page picks up the change automatically.
 */

import type { QuizQuestion } from "../components/Quiz";

export type VideoResource = {
  videoId: string;
  title: string;
  source: "Khan Academy" | "Math Antics" | "Virtual Nerd" | "Math with Mr. J" | "MashUp Math" | "Mathispower4u" | "Organic Chemistry Tutor" | "Mario's Math Tutoring" | "Other";
  description?: string;
};

export type WorksheetResource = {
  driveFileId: string;
  title: string;
  description?: string;
};

export type ExternalLink = {
  href: string;
  title: string;
  source: string;
  description?: string;
};

/** One block of a topic walkthrough — keep each block short and focused. */
export type WalkthroughBlock = {
  heading?: string;
  paragraphs?: string[];
  /** Numbered, ordered steps. */
  steps?: string[];
  /** A single worked example shown in a highlighted box. */
  example?: { problem: string; solution: string[] };
  /** A short aside, e.g. a tip or a common mistake to avoid. */
  callout?: { label: string; text: string };
};

/**
 * A topic is a single focused page within a unit: a short walkthrough,
 * one (occasionally two) videos, practice, and a quick quiz.
 */
export type Topic = {
  id: string;
  /** Unique within its unit, e.g. "fractions". */
  slug: string;
  title: string;
  /** One-line summary shown on the unit's topic index. */
  summary: string;
  estimatedMinutes: number;
  walkthrough: WalkthroughBlock[];
  /** The main video for this topic. */
  video: VideoResource;
  /** Optional single "another take" video. */
  extraVideo?: VideoResource;
  /** Optional Adam worksheet attached to this topic. */
  worksheet?: WorksheetResource;
  /** Topic-relevant external practice links. */
  practiceLinks?: ExternalLink[];
  /** Short 2-3 question check at the end of the topic. */
  quiz: QuizQuestion[];
};

export type Unit = {
  id: string;
  number: number;
  slug: string;
  title: string;
  short: string;
  description: string;
  /** Short math symbol shown in unit cards (e.g. π, x², △) */
  icon: string;
  estimatedMinutes: number;
  objectives: string[];
  vocabulary?: { term: string; meaning: string }[];
  /** Focused topic pages that make up this unit. */
  topics: Topic[];
  externalPractice: ExternalLink[];
  frameworkUrl?: string;
  /**
   * @deprecated Legacy unit-level arrays kept only until all topics are
   * authored and consumers are migrated. Use `topics` instead.
   */
  videos: VideoResource[];
  /** @deprecated Use per-topic worksheets. */
  worksheets: WorksheetResource[];
  /** @deprecated Use per-topic quizzes. */
  quiz: QuizQuestion[];
};

export const UNITS: Unit[] = [
  // -----------------------------------------------------------------
  {
    id: "unit-1",
    number: 1,
    topics: [
      {
        id: "u1-t1",
        slug: "factors-multiples-gcf-lcm",
        title: "Factors, Multiples, GCF & LCM",
        summary: "Numbers that divide in, numbers you count by, and the values they share.",
        estimatedMinutes: 14,
        walkthrough: [
          {
            heading: "Factors and multiples",
            paragraphs: [
              "A factor is a number that divides evenly into another number, leaving no remainder. The factors of 12 are 1, 2, 3, 4, 6, and 12, because each one divides 12 exactly.",
              "A multiple is what you get when you skip-count by a number. The multiples of 4 are 4, 8, 12, 16, 20, and so on. Notice that every number is a factor of its own multiples.",
            ],
          },
          {
            heading: "Greatest Common Factor (GCF)",
            paragraphs: [
              "The GCF of two numbers is the largest factor they share. List the factors of each number, then pick the biggest one that appears in both lists.",
            ],
            example: {
              problem: "Find the GCF of 18 and 24.",
              solution: [
                "Factors of 18: 1, 2, 3, 6, 9, 18",
                "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24",
                "Shared factors: 1, 2, 3, 6 — the greatest is 6.",
              ],
            },
          },
          {
            heading: "Least Common Multiple (LCM)",
            paragraphs: [
              "The LCM is the smallest multiple that two numbers share. Skip-count by each number until you reach the first value they both land on.",
            ],
            example: {
              problem: "Find the LCM of 6 and 8.",
              solution: [
                "Multiples of 6: 6, 12, 18, 24, 30…",
                "Multiples of 8: 8, 16, 24, 32…",
                "First match: 24.",
              ],
            },
            callout: {
              label: "Tip",
              text: "For larger numbers, break each one into primes (prime factorization) — it makes finding the GCF and LCM much faster.",
            },
          },
        ],
        video: { videoId: "XGbOiYhHY2c", title: "Prime Factorization", source: "Math Antics", description: "Break any number into its prime building blocks — the key to GCF and LCM." },
        practiceLinks: [
          { href: "https://www.mathworksheets4kids.com/greatest-common-factor.php", title: "Greatest Common Factor", source: "Math Worksheets 4 Kids" },
          { href: "https://www.mathworksheets4kids.com/least-common-multiple.php", title: "Least Common Multiple", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "u1-t1-q1",
            prompt: "What is the GCF of 18 and 24?",
            type: "short-answer",
            answer: "6",
            explanation: "Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. The greatest shared factor is 6.",
            difficulty: "medium",
          },
          {
            id: "u1-t1-q2",
            prompt: "What is the LCM of 6 and 8?",
            type: "multiple-choice",
            options: ["12", "24", "48", "14"],
            answer: "24",
            explanation: "Multiples of 6: 6, 12, 18, 24… Multiples of 8: 8, 16, 24… The first shared value is 24.",
            difficulty: "medium",
          },
          {
            id: "u1-t1-q3",
            prompt: "Every prime number has exactly two factors: 1 and itself.",
            type: "true-false",
            answer: true,
            explanation: "That is the definition of a prime number.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "u1-t2",
        slug: "adding-subtracting-fractions",
        title: "Adding & Subtracting Fractions",
        summary: "Same bottom number? Add the tops. Different? Find a common denominator first.",
        estimatedMinutes: 14,
        walkthrough: [
          {
            heading: "Same denominator",
            paragraphs: [
              "When the bottom numbers (denominators) already match, just add or subtract the top numbers (numerators) and keep the denominator the same. For example, 2/7 + 3/7 = 5/7.",
            ],
          },
          {
            heading: "Different denominators",
            paragraphs: [
              "When the bottoms are different, you first rewrite both fractions with a common denominator — usually the LCM of the two denominators.",
            ],
            steps: [
              "Find a common denominator (the LCM of the bottom numbers).",
              "Rewrite each fraction with that denominator.",
              "Add or subtract the numerators; keep the denominator.",
              "Simplify the answer if you can.",
            ],
            example: {
              problem: "1/3 + 1/4",
              solution: [
                "A common denominator is 12.",
                "1/3 = 4/12 and 1/4 = 3/12.",
                "4/12 + 3/12 = 7/12.",
              ],
            },
            callout: {
              label: "Watch out",
              text: "Never add the denominators. 1/2 + 1/2 = 1, not 2/4.",
            },
          },
        ],
        video: { videoId: "5juto2ze8Lg", title: "Adding & Subtracting Fractions", source: "Math Antics", description: "Find common denominators, then add or subtract." },
        extraVideo: { videoId: "ny2AmGQmu2M", title: "Adding Fractions (another take)", source: "Virtual Nerd", description: "Same and different denominators, side by side." },
        practiceLinks: [
          { href: "https://www.mathworksheets4kids.com/fractions.php", title: "Fractions practice", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "u1-t2-q1",
            prompt: "What is 2/7 + 3/7?",
            type: "short-answer",
            answer: "5/7",
            explanation: "Same denominator, so add the numerators: 2 + 3 = 5, over 7.",
            difficulty: "easy",
          },
          {
            id: "u1-t2-q2",
            prompt: "What is 5/6 − 1/4?",
            type: "multiple-choice",
            options: ["4/2", "7/12", "6/10", "1/2"],
            answer: "7/12",
            explanation: "Common denominator 12: 10/12 − 3/12 = 7/12.",
            difficulty: "medium",
          },
          {
            id: "u1-t2-q3",
            prompt: "To add fractions with unlike denominators, you must first find a common denominator.",
            type: "true-false",
            answer: true,
            explanation: "You can only add numerators once the denominators match.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "u1-t3",
        slug: "multiplying-dividing-fractions",
        title: "Multiplying & Dividing Fractions",
        summary: "Multiply straight across. To divide, keep–change–flip.",
        estimatedMinutes: 15,
        walkthrough: [
          {
            heading: "Multiplying fractions",
            paragraphs: [
              "Multiply straight across: numerator times numerator, denominator times denominator. Then simplify. For example, 2/3 × 4/5 = 8/15.",
            ],
          },
          {
            heading: "Dividing fractions — keep, change, flip",
            paragraphs: [
              "To divide by a fraction, you multiply by its reciprocal (the fraction flipped upside down).",
            ],
            steps: [
              "Keep the first fraction as it is.",
              "Change the ÷ sign to ×.",
              "Flip the second fraction (its reciprocal).",
              "Multiply across and simplify.",
            ],
            example: {
              problem: "3/4 ÷ 2/3",
              solution: [
                "Keep 3/4, change ÷ to ×, flip 2/3 → 3/2.",
                "3/4 × 3/2 = 9/8.",
                "9/8 = 1 1/8.",
              ],
            },
            callout: {
              label: "Tip",
              text: "Turn mixed numbers into improper fractions before you multiply or divide.",
            },
          },
        ],
        video: { videoId: "qmfXyR7Z6Lk", title: "Multiplying Fractions", source: "Math Antics", description: "Multiply across the top and bottom, then simplify." },
        extraVideo: { videoId: "4lkq3DgvmJo", title: "Dividing Fractions", source: "Math Antics", description: "Flip the second fraction, then multiply (keep–change–flip)." },
        worksheet: { driveFileId: "1VZEQx-BOXpIIYYMpvdp-EsYO8Q9fwnfV", title: "Worksheet — Operations practice", description: "Mixed practice covering fraction and decimal operations." },
        quiz: [
          {
            id: "u1-t3-q1",
            prompt: "What is 3/4 ÷ 2/3?",
            type: "multiple-choice",
            options: ["1/2", "9/8", "6/12", "5/7"],
            answer: "9/8",
            explanation: "Keep–change–flip: 3/4 × 3/2 = 9/8.",
            difficulty: "medium",
          },
          {
            id: "u1-t3-q2",
            prompt: "What is 2/3 × 3/8 in simplest form?",
            type: "short-answer",
            answer: "1/4",
            explanation: "2/3 × 3/8 = 6/24, which simplifies to 1/4.",
            difficulty: "medium",
          },
          {
            id: "u1-t3-q3",
            prompt: "Dividing by a fraction is the same as multiplying by its reciprocal.",
            type: "true-false",
            answer: true,
            explanation: "That is exactly what keep–change–flip does.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "u1-t4",
        slug: "decimal-operations",
        title: "Decimal Operations",
        summary: "Line up the point to add or subtract; count places to multiply.",
        estimatedMinutes: 13,
        walkthrough: [
          {
            heading: "Adding & subtracting decimals",
            paragraphs: [
              "Stack the numbers so the decimal points line up, then add or subtract like whole numbers. Fill empty spots with zeros so every column has a digit.",
            ],
            example: {
              problem: "4.5 − 2.75",
              solution: [
                "Line up the points: 4.50 − 2.75.",
                "Subtract column by column: 1.75.",
              ],
            },
          },
          {
            heading: "Multiplying decimals",
            paragraphs: [
              "Ignore the decimal points and multiply like whole numbers. Then count the total number of decimal places in both factors and place the point that many spots from the right.",
            ],
            example: {
              problem: "0.6 × 0.4",
              solution: [
                "6 × 4 = 24.",
                "Two decimal places total → 0.24.",
              ],
            },
            callout: {
              label: "Watch out",
              text: "When multiplying you do NOT line up the decimal points — lining up is only for adding and subtracting.",
            },
          },
        ],
        video: { videoId: "REcdCxWTZrw", title: "Multiplying Decimals", source: "Virtual Nerd", description: "Multiply first, then place the decimal point." },
        extraVideo: { videoId: "eQU_uLDoyoQ", title: "Subtracting Decimals", source: "Virtual Nerd", description: "Line up the decimal points, then subtract like whole numbers." },
        worksheet: { driveFileId: "1RAoa5x7bEpbnBNA1CL68F7pvIaIW19_s", title: "Worksheet — Word problems", description: "Apply decimal and fraction operations to real situations." },
        practiceLinks: [
          { href: "https://www.mathworksheets4kids.com/decimals.php", title: "Decimal operations", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "u1-t4-q1",
            prompt: "0.6 × 0.4 = ?",
            type: "short-answer",
            answer: "0.24",
            explanation: "6 × 4 = 24. Two decimal places total, so place the decimal: 0.24.",
            difficulty: "medium",
          },
          {
            id: "u1-t4-q2",
            prompt: "What is 4.5 − 2.75?",
            type: "short-answer",
            answer: "1.75",
            explanation: "Line up the points: 4.50 − 2.75 = 1.75.",
            difficulty: "easy",
          },
          {
            id: "u1-t4-q3",
            prompt: "To multiply decimals you should line up the decimal points first.",
            type: "true-false",
            answer: false,
            explanation: "Lining up points is for adding and subtracting. To multiply, count decimal places after multiplying.",
            difficulty: "medium",
          },
        ],
      },
    ],
    slug: "unit-1",
    title: "Number System & Operations",
    short: "Fractions, decimals, factors, and the basics that everything else builds on.",
    description:
      "Master factors, multiples, fractions, and decimal operations. This is the foundation every later unit relies on.",
    icon: "π",
    estimatedMinutes: 55,
    frameworkUrl: "https://drive.google.com/file/u/0/d/1GH3oj67h-27Nrr0h-XdQNavn-MpJnTHJ/view",
    objectives: [
      "Find factors, multiples, GCF, and LCM",
      "Add, subtract, multiply, and divide fractions",
      "Operate fluently with multi-digit decimals",
      "Decide when an estimate is good enough",
      "Translate word problems into number sentences",
    ],
    vocabulary: [
      { term: "Factor", meaning: "A number that divides evenly into another." },
      { term: "Multiple", meaning: "The product of a number and an integer." },
      { term: "GCF", meaning: "Greatest Common Factor — the biggest shared factor." },
      { term: "LCM", meaning: "Least Common Multiple — the smallest shared multiple." },
    ],
    videos: [
      { videoId: "XGbOiYhHY2c", title: "Prime Factorization", source: "Math Antics", description: "Break any number into its prime building blocks." },
      { videoId: "LGqBQrUYua4", title: "Long Division", source: "Math Antics", description: "A clean, step-by-step method for dividing large numbers." },
      { videoId: "5juto2ze8Lg", title: "Adding & Subtracting Fractions", source: "Math Antics", description: "Find common denominators, then add or subtract." },
      { videoId: "qmfXyR7Z6Lk", title: "Multiplying Fractions", source: "Math Antics", description: "Multiply across the top and bottom, then simplify." },
      { videoId: "4lkq3DgvmJo", title: "Dividing Fractions", source: "Math Antics", description: "Flip the second fraction, then multiply (keep–change–flip)." },
      { videoId: "eQU_uLDoyoQ", title: "Subtracting Decimals", source: "Virtual Nerd", description: "Line up the decimal points, then subtract like whole numbers." },
      { videoId: "REcdCxWTZrw", title: "Multiplying Decimals", source: "Virtual Nerd", description: "Multiply first, then place the decimal point." },
      { videoId: "kaFjcW2EAlM", title: "Multiplying Fractions (walk-through)", source: "Virtual Nerd", description: "A second take on multiplying fractions with extra examples." },
      { videoId: "ny2AmGQmu2M", title: "Adding Fractions (walk-through)", source: "Virtual Nerd", description: "Same and different denominators, side by side." },
    ],
    worksheets: [
      { driveFileId: "1VZEQx-BOXpIIYYMpvdp-EsYO8Q9fwnfV", title: "Worksheet 1 — Operations practice", description: "Mixed practice covering the unit's core operations." },
      { driveFileId: "1RAoa5x7bEpbnBNA1CL68F7pvIaIW19_s", title: "Worksheet 2 — Word problems", description: "Apply operations to real situations." },
    ],
    externalPractice: [
      { href: "https://www.k5learning.com/free-math-worksheets/sixth-grade-6", title: "K5 Learning — Grade 6 worksheets", source: "K5 Learning", description: "Free Grade 6 worksheets across all topics." },
      { href: "https://www.mathworksheets4kids.com/factors.php", title: "Factors & prime factorization", source: "Math Worksheets 4 Kids" },
      { href: "https://www.mathworksheets4kids.com/greatest-common-factor.php", title: "Greatest Common Factor", source: "Math Worksheets 4 Kids" },
      { href: "https://www.mathworksheets4kids.com/least-common-multiple.php", title: "Least Common Multiple", source: "Math Worksheets 4 Kids" },
      { href: "https://www.mathworksheets4kids.com/fractions.php", title: "Fractions practice", source: "Math Worksheets 4 Kids" },
      { href: "https://www.mathworksheets4kids.com/decimals.php", title: "Decimal operations", source: "Math Worksheets 4 Kids" },
    ],
    quiz: [
      {
        id: "u1-q1",
        prompt: "What is 3/4 ÷ 2/3?",
        type: "multiple-choice",
        options: ["1/2", "9/8", "6/12", "5/7"],
        answer: "9/8",
        explanation: "Keep–change–flip: 3/4 × 3/2 = 9/8.",
        difficulty: "easy",
      },
      {
        id: "u1-q2",
        prompt: "What is the GCF of 18 and 24?",
        type: "short-answer",
        answer: "6",
        explanation: "Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. The greatest shared factor is 6.",
        difficulty: "medium",
      },
      {
        id: "u1-q3",
        prompt: "Every prime number has exactly two factors: 1 and itself.",
        type: "true-false",
        answer: true,
        explanation: "That is the definition of a prime number.",
        difficulty: "easy",
      },
      {
        id: "u1-q4",
        prompt: "0.6 × 0.4 = ?",
        type: "short-answer",
        answer: "0.24",
        explanation: "6 × 4 = 24. Two decimal places total, so place the decimal: 0.24.",
        difficulty: "medium",
      },
    ],
  },

  // -----------------------------------------------------------------
  {
    id: "unit-2",
    number: 2,
    topics: [
      {
        id: "u2-t1",
        slug: "ratios",
        title: "What Is a Ratio?",
        summary: "Compare two quantities — and find ratios that mean the same thing.",
        estimatedMinutes: 12,
        walkthrough: [
          {
            heading: "Comparing with ratios",
            paragraphs: [
              "A ratio compares two amounts. If a recipe uses 2 cups of flour and 3 cups of sugar, the ratio of flour to sugar is 2 to 3 — written 2:3 or 2/3.",
            ],
          },
          {
            heading: "Order matters",
            paragraphs: [
              "Flour to sugar (2:3) is not the same as sugar to flour (3:2). Always write the parts in the order the problem names them.",
            ],
          },
          {
            heading: "Equivalent ratios",
            paragraphs: [
              "Multiply or divide both parts of a ratio by the same number to get an equivalent ratio that describes the same comparison.",
            ],
            example: {
              problem: "Are 2:3 and 8:12 equivalent?",
              solution: [
                "Multiply both parts of 2:3 by 4.",
                "2 × 4 = 8 and 3 × 4 = 12, so 2:3 → 8:12.",
                "Yes — they are equivalent.",
              ],
            },
          },
        ],
        video: { videoId: "RQ2nYUBVvqI", title: "Ratios & Rates", source: "Math Antics", description: "What a ratio is and how it shows up in everyday comparisons." },
        extraVideo: { videoId: "bIKmw0aTmYc", title: "Introduction to Ratios", source: "Khan Academy", description: "Another walk-through of writing a ratio to compare two quantities." },
        practiceLinks: [
          { href: "https://www.mathworksheets4kids.com/ratio.php", title: "Ratio worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "u2-t1-q1",
            prompt: "Write the ratio of 5 dogs to 8 cats.",
            type: "short-answer",
            answer: "5:8",
            explanation: "Keep the order given — dogs first, then cats: 5:8.",
            difficulty: "easy",
          },
          {
            id: "u2-t1-q2",
            prompt: "Which ratio is equivalent to 2:3?",
            type: "multiple-choice",
            options: ["3:2", "8:12", "4:9", "5:6"],
            answer: "8:12",
            explanation: "Multiply both parts of 2:3 by 4 to get 8:12.",
            difficulty: "medium",
          },
          {
            id: "u2-t1-q3",
            prompt: "The ratios 2:3 and 8:12 are equivalent.",
            type: "true-false",
            answer: true,
            explanation: "Multiply 2:3 by 4 → 8:12.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "u2-t2",
        slug: "unit-rates",
        title: "Unit Rates",
        summary: "How much for just ONE — speed, price per item, and more.",
        estimatedMinutes: 13,
        walkthrough: [
          {
            heading: "Rates vs. unit rates",
            paragraphs: [
              "A rate compares two different units, like miles and hours. A unit rate tells you the amount for just one — like miles per ONE hour, or dollars per ONE item.",
            ],
          },
          {
            heading: "Finding a unit rate",
            paragraphs: [
              "Write the rate as a fraction, then divide the top number by the bottom number.",
            ],
            steps: [
              "Write the rate as a fraction (first quantity over second).",
              "Divide the top by the bottom.",
              "The result is the amount per 1 unit.",
            ],
            example: {
              problem: "A car drives 180 miles in 3 hours. Find the speed per hour.",
              solution: [
                "Rate: 180 miles / 3 hours.",
                "180 ÷ 3 = 60.",
                "Unit rate: 60 miles per hour.",
              ],
            },
            callout: {
              label: "Tip",
              text: "Unit rates make it easy to compare deals — $0.80 per apple is a better buy than $0.90 per apple.",
            },
          },
        ],
        video: { videoId: "qGTYSAeLTOE", title: "Rates and Unit Rates", source: "Other", description: "Find cost per item, speed, and other per-one rates." },
        extraVideo: { videoId: "jC1K7fM91sE", title: "Rates and Unit Rates (extra examples)", source: "Other", description: "More practice turning a rate into a unit rate." },
        worksheet: { driveFileId: "1W-fu-btydoCDyL6PbW8lAEcrDA--EYhk", title: "Worksheet — Ratios & proportions", description: "Mixed practice across ratios, rates, and proportions." },
        quiz: [
          {
            id: "u2-t2-q1",
            prompt: "A car drives 180 miles in 3 hours. What is the unit rate in miles per hour?",
            type: "multiple-choice",
            options: ["30 mph", "60 mph", "90 mph", "120 mph"],
            answer: "60 mph",
            explanation: "180 ÷ 3 = 60.",
            difficulty: "easy",
          },
          {
            id: "u2-t2-q2",
            prompt: "If 4 apples cost $3, how much do 12 apples cost?",
            type: "short-answer",
            answer: "$9",
            explanation: "12 ÷ 4 = 3 batches, so 3 × $3 = $9.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "u2-t3",
        slug: "proportional-relationships",
        title: "Proportional Relationships",
        summary: "Two quantities that grow together at one steady rate.",
        estimatedMinutes: 14,
        walkthrough: [
          {
            heading: "What makes a relationship proportional",
            paragraphs: [
              "Two quantities are proportional when they always change by the same rate. If you earn $12 every hour, dollars and hours are proportional — the rate stays 12 no matter how many hours you work.",
            ],
          },
          {
            heading: "Solving a proportion",
            paragraphs: [
              "Set two equal ratios next to each other and cross-multiply to find the missing value.",
            ],
            example: {
              problem: "Solve 3/5 = x/20",
              solution: [
                "Cross-multiply: 3 × 20 = 5 × x.",
                "60 = 5x.",
                "Divide by 5: x = 12.",
              ],
            },
            callout: {
              label: "Tip",
              text: "A double number line or a table can help you see the steady rate when you get stuck.",
            },
          },
        ],
        video: { videoId: "l-HtxhClZ-0", title: "Proportional Relationships", source: "Khan Academy", description: "Spot when two quantities grow together at a steady rate." },
        extraVideo: { videoId: "USmit5zUGas", title: "Proportions", source: "Math Antics", description: "Set up and solve equations where two ratios are equal." },
        practiceLinks: [
          { href: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic", title: "Ratios & proportions practice", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "u2-t3-q1",
            prompt: "If 5 notebooks cost $7.50, how much do 8 notebooks cost?",
            type: "short-answer",
            answer: "$12",
            explanation: "Unit price is $7.50 ÷ 5 = $1.50. Then $1.50 × 8 = $12.",
            difficulty: "medium",
          },
          {
            id: "u2-t3-q2",
            prompt: "Solve the proportion 3/5 = x/20.",
            type: "multiple-choice",
            options: ["9", "12", "15", "6"],
            answer: "12",
            explanation: "Cross-multiply: 3 × 20 = 5x, so 60 = 5x and x = 12.",
            difficulty: "medium",
          },
          {
            id: "u2-t3-q3",
            prompt: "In a proportional relationship, the ratio between the two quantities stays constant.",
            type: "true-false",
            answer: true,
            explanation: "That constant ratio is the defining feature of a proportional relationship.",
            difficulty: "easy",
          },
        ],
      },
    ],
    slug: "unit-2",
    title: "Ratios & Proportional Relationships",
    short: "Compare quantities, find unit rates, and reason about proportions.",
    description:
      "Use ratios and rates to compare quantities, then use proportional reasoning to solve real-world problems.",
    icon: "a:b",
    estimatedMinutes: 50,
    frameworkUrl: "https://drive.google.com/file/d/1MCf6Jf9Wnre7WY6MR4gmrLgLYWJgFLmF/view",
    objectives: [
      "Write and interpret ratios in multiple ways",
      "Find and use unit rates (price per unit, miles per hour)",
      "Recognize proportional relationships in tables and graphs",
      "Use equivalent ratios to solve problems",
    ],
    vocabulary: [
      { term: "Ratio", meaning: "A comparison of two quantities." },
      { term: "Rate", meaning: "A ratio that compares two different units." },
      { term: "Unit rate", meaning: "A rate with a denominator of 1." },
      { term: "Proportion", meaning: "An equation that says two ratios are equal." },
    ],
    videos: [
      { videoId: "bIKmw0aTmYc", title: "Introduction to Ratios", source: "Khan Academy", description: "What a ratio is and how to write one to compare two quantities." },
      { videoId: "RQ2nYUBVvqI", title: "Ratios & Rates", source: "Math Antics", description: "See how ratios show up in everyday comparisons." },
      { videoId: "qGTYSAeLTOE", title: "Rates and Unit Rates", source: "Other", description: "Find cost per item, speed, and other per-one rates." },
      { videoId: "jC1K7fM91sE", title: "Rates and Unit Rates (extra examples)", source: "Other", description: "More practice turning a rate into a unit rate." },
      { videoId: "l-HtxhClZ-0", title: "Proportional Relationships", source: "Khan Academy", description: "Spot when two quantities grow together at a steady rate." },
      { videoId: "USmit5zUGas", title: "Proportions", source: "Math Antics", description: "Set up and solve equations where two ratios are equal." },
      { videoId: "AtBUQH8Tkqc", title: "Simplifying Fractions", source: "Math Antics", description: "Shrink fractions to simplest form — useful before comparing ratios." },
      { videoId: "N1X0vf5PUz4", title: "Equivalent Fractions", source: "Khan Academy", description: "Find different fractions that name the same amount." },
    ],
    worksheets: [
      { driveFileId: "1W-fu-btydoCDyL6PbW8lAEcrDA--EYhk", title: "Worksheet — Ratios & proportions", description: "Mixed practice across the unit." },
    ],
    externalPractice: [
      { href: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic", title: "Ratios & proportions practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/ratio.php", title: "Ratio worksheets", source: "Math Worksheets 4 Kids" },
    ],
    quiz: [
      {
        id: "u2-q1",
        prompt: "A car drives 180 miles in 3 hours. What is the unit rate in miles per hour?",
        type: "multiple-choice",
        options: ["30 mph", "60 mph", "90 mph", "120 mph"],
        answer: "60 mph",
        explanation: "180 ÷ 3 = 60.",
        difficulty: "easy",
      },
      {
        id: "u2-q2",
        prompt: "If 4 apples cost $3, how much do 12 apples cost?",
        type: "short-answer",
        answer: "$9",
        explanation: "12 ÷ 4 = 3 batches, so 3 × $3 = $9.",
        difficulty: "easy",
      },
      {
        id: "u2-q3",
        prompt: "The ratios 2:3 and 8:12 are equivalent.",
        type: "true-false",
        answer: true,
        explanation: "Multiply 2:3 by 4 → 8:12.",
        difficulty: "easy",
      },
    ],
  },

  // -----------------------------------------------------------------
  {
    id: "unit-3",
    number: 3,
    topics: [],
    slug: "unit-3",
    title: "Expressions & Equations",
    short: "Exponents, variables, and writing math symbolically.",
    description:
      "Learn how mathematicians write ideas as expressions — including exponents, variables, and equivalent forms.",
    icon: "x²",
    estimatedMinutes: 55,
    frameworkUrl: "https://drive.google.com/file/d/1gErsfpHBR0vh54AEtpx9ZGxCWR50F7Ki/view",
    objectives: [
      "Read and evaluate expressions with exponents",
      "Use the order of operations correctly",
      "Write algebraic expressions from word phrases",
      "Identify equivalent expressions",
      "Apply the distributive property and combine like terms",
    ],
    videos: [
      { videoId: "XZRQhkii0h0", title: "Intro to Exponents", source: "Khan Academy", description: "What exponents mean and how to read powers like 2³." },
      { videoId: "LkhPRz7Hocg", title: "Exponents", source: "Math Antics", description: "A clear walk-through of repeated multiplication with exponents." },
      { videoId: "9K54G5yeR74", title: "Evaluating Expressions with Exponents", source: "Khan Academy", description: "Plug in values and simplify expressions that include powers." },
      { videoId: "dAgfnK528RA", title: "Order of Operations", source: "Math Antics", description: "PEMDAS step by step so you always know what to do first." },
      { videoId: "Q1vMNyIP4Us", title: "Writing Expressions with Variables", source: "Khan Academy", description: "Turn word phrases like \"five more than x\" into algebra." },
      { videoId: "NybHckSEQBI", title: "Algebra Basics: What Are Variables?", source: "Math Antics", description: "Why letters stand for unknown numbers in math." },
      { videoId: "9_VCk9tWT0Y", title: "Parts of Algebraic Expressions", source: "Khan Academy", description: "Learn terms, coefficients, and constants in an expression." },
      { videoId: "RyesLifeUBw", title: "Expressions, Equations & Inequalities", source: "Math Antics", description: "Tell the difference between these three types of math statements." },
      { videoId: "rHNY01R2VSQ", title: "Equivalent Expressions", source: "Khan Academy", description: "Different-looking expressions that have the same value." },
      { videoId: "DKC74YKJpNY", title: "Combining Like Terms", source: "Math Antics", description: "Add or subtract terms that share the same variable part." },
      { videoId: "3NHSwiv_pSE", title: "Distributive Property", source: "Khan Academy", description: "Multiply a number across terms inside parentheses." },
      { videoId: "v-6MShC82ow", title: "The Distributive Property", source: "Math Antics", description: "A second take on distributing, with extra examples." },
    ],
    worksheets: [],
    externalPractice: [
      { href: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-expressions-and-variables", title: "Expressions & variables practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/order-of-operations.php", title: "Order of operations", source: "Math Worksheets 4 Kids" },
    ],
    quiz: [
      {
        id: "u3-q1",
        prompt: "Evaluate: 2 + 3 × (4² − 6)",
        type: "multiple-choice",
        options: ["32", "20", "26", "44"],
        answer: "32",
        explanation: "4² = 16, then 16 − 6 = 10, then 3 × 10 = 30, then 2 + 30 = 32.",
        difficulty: "medium",
      },
      {
        id: "u3-q2",
        prompt: "Which expression is equivalent to 3(x + 4)?",
        type: "multiple-choice",
        options: ["3x + 4", "x + 12", "3x + 12", "3x − 12"],
        answer: "3x + 12",
        explanation: "Distribute the 3: 3·x + 3·4 = 3x + 12.",
        difficulty: "easy",
      },
      {
        id: "u3-q3",
        prompt: "5x + 2x simplifies to 7x because they are like terms.",
        type: "true-false",
        answer: true,
        explanation: "Both terms have the same variable factor (x), so we add their coefficients.",
        difficulty: "easy",
      },
    ],
  },

  // -----------------------------------------------------------------
  {
    id: "unit-4",
    number: 4,
    topics: [],
    slug: "unit-4",
    title: "Equations & Inequalities",
    short: "Solving one-step equations and graphing inequalities.",
    description:
      "Solve one-variable equations, work with inequalities, and recognize how independent and dependent variables relate.",
    icon: "=",
    estimatedMinutes: 50,
    frameworkUrl: "https://drive.google.com/file/d/1yXQGCJk60vDCNnLTIcd-4oRmbl4LGllQ/view",
    objectives: [
      "Solve one-step equations using inverse operations",
      "Write inequalities from word problems",
      "Graph solutions on a number line",
      "Distinguish independent and dependent variables",
      "Translate word problems into equations",
    ],
    videos: [
      { videoId: "jWpiMu5LNdg", title: "One-Step Equations", source: "Khan Academy", description: "Use inverse operations to find the missing number." },
      { videoId: "l3XzepN03KQ", title: "Solving Basic Algebraic Equations (Part 1)", source: "Math Antics", description: "Add, subtract, multiply, or divide both sides to isolate x." },
      { videoId: "Qyd_v3DGzTM", title: "Solving Basic Algebraic Equations (Part 2)", source: "Math Antics", description: "Harder one-step equations with fractions and negatives." },
      { videoId: "VgDe_D8ojxw", title: "Intro to Inequalities", source: "Khan Academy", description: "Symbols like < and ≥ and what they mean on a number line." },
      { videoId: "mgHO-bsCDrA", title: "Solving Inequalities", source: "Math Antics", description: "Solve inequality problems the same way you solve equations." },
      { videoId: "unSBFwK881s", title: "Graphing Linear Inequalities", source: "Khan Academy", description: "Shade the number line to show all solutions." },
      { videoId: "Hzxc4HASygU", title: "Graphing Linear Inequalities (walk-through)", source: "Mathispower4u", description: "Extra examples graphing inequality solutions." },
      { videoId: "SGC_d7O7_Eg", title: "Dependent & Independent Variables", source: "Khan Academy", description: "Which quantity you choose and which one depends on it." },
      { videoId: "vJclTPm3ofM", title: "Independent & Dependent Variables", source: "Mathispower4u", description: "Identify input and output in tables and graphs." },
      { videoId: "C_KffdI34ZU", title: "Translating Word Problems", source: "Khan Academy", description: "Turn a story problem into an equation you can solve." },
      { videoId: "QEnFIgN8UBw", title: "Translating Word Problems (long form)", source: "Organic Chemistry Tutor", description: "A longer walk-through of tricky word-problem setups." },
    ],
    worksheets: [
      { driveFileId: "1gWPLzo75q2usvfROnIeGmCYWT4Xf0mjU", title: "Worksheet — Equations & inequalities", description: "Mixed practice for the unit." },
    ],
    externalPractice: [
      { href: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-equations-and-inequalities-topic", title: "Equations & inequalities practice", source: "Khan Academy" },
    ],
    quiz: [
      {
        id: "u4-q1",
        prompt: "Solve for x: x + 7 = 12",
        type: "short-answer",
        answer: "5",
        explanation: "Subtract 7 from both sides: x = 12 − 7 = 5.",
        difficulty: "easy",
      },
      {
        id: "u4-q2",
        prompt: "Which inequality represents 'x is at most 9'?",
        type: "multiple-choice",
        options: ["x > 9", "x ≥ 9", "x ≤ 9", "x < 9"],
        answer: "x ≤ 9",
        explanation: "‘At most’ means less than or equal to.",
        difficulty: "medium",
      },
      {
        id: "u4-q3",
        prompt: "In y = 4x, x is the dependent variable.",
        type: "true-false",
        answer: false,
        explanation: "x is independent; y depends on x.",
        difficulty: "medium",
      },
    ],
  },

  // -----------------------------------------------------------------
  {
    id: "unit-5",
    number: 5,
    topics: [],
    slug: "unit-5",
    title: "Geometry — Area & Volume",
    short: "Area of polygons, surface area from nets, and volume of prisms.",
    description:
      "Compute area, surface area, and volume — and apply them to real measurement problems.",
    icon: "△",
    estimatedMinutes: 60,
    frameworkUrl: "https://drive.google.com/file/d/1VQ164yBRTVIgTD-NCh2IjW_r3uTaPosC/view",
    objectives: [
      "Find area of triangles, parallelograms, trapezoids, and composite figures",
      "Build surface area from nets",
      "Find volume of rectangular prisms with whole-number and fractional edges",
      "Solve word problems with volume and surface area",
    ],
    videos: [
      { videoId: "xCdxURXMdFY", title: "Introduction to Area", source: "Math Antics", description: "What area measures and how square units work." },
      { videoId: "hm17lVaor0Q", title: "Area of a Parallelogram", source: "Khan Academy", description: "Use base × height to find parallelogram area." },
      { videoId: "loAA3TCNAvU", title: "Area of Composite Shapes", source: "Khan Academy", description: "Split a weird shape into rectangles and triangles." },
      { videoId: "z4Lat1uOQI4", title: "Area of a Composite Figure", source: "Math with Mr. J", description: "Step-by-step practice with combined shapes." },
      { videoId: "mtMNvnm71Z0", title: "Surface Area Using Nets", source: "Other", description: "Unfold a 3-D shape and add up the flat faces." },
      { videoId: "ny5DVYNpqM8", title: "Surface Area Using Nets", source: "Khan Academy", description: "Another walk-through of finding surface area from nets." },
      { videoId: "qJwecTgce6c", title: "Volume", source: "Math Antics", description: "How much space a 3-D object fills — measured in cubic units." },
      { videoId: "EJTPGyWqhqc", title: "Volume of a Rectangular Prism", source: "Khan Academy", description: "Multiply length × width × height to find volume." },
      { videoId: "ThY_RCxC4gc", title: "Volume & Surface Area Word Problems", source: "Khan Academy", description: "Apply area, surface area, and volume to real situations." },
      { videoId: "eBAq_caikJ4", title: "Surface Area & Volume Review", source: "Mario's Math Tutoring", description: "Quick review of the key formulas from this unit." },
      { videoId: "OanPzjf2EYY", title: "Volume Word Problem: Water Tank", source: "Khan Academy", description: "Find how much water a tank holds using volume." },
    ],
    worksheets: [
      { driveFileId: "1vWT_exmaDi6YkbiMXVmwztS0nDPKyfyU", title: "Worksheet — Area & volume", description: "Mixed practice for the unit." },
    ],
    externalPractice: [
      { href: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-geometry-topic", title: "Grade 6 geometry practice", source: "Khan Academy" },
    ],
    quiz: [
      {
        id: "u5-q1",
        prompt: "What is the area of a triangle with base 10 cm and height 6 cm?",
        type: "multiple-choice",
        options: ["30 cm²", "60 cm²", "16 cm²", "20 cm²"],
        answer: "30 cm²",
        explanation: "A = (1/2) × b × h = (1/2)(10)(6) = 30 cm².",
        difficulty: "easy",
      },
      {
        id: "u5-q2",
        prompt: "Find the volume of a rectangular prism with edges 3, 4, and 5 units.",
        type: "short-answer",
        answer: "60",
        explanation: "V = l × w × h = 3 × 4 × 5 = 60 cubic units.",
        difficulty: "easy",
      },
      {
        id: "u5-q3",
        prompt: "Surface area uses square units; volume uses cubic units.",
        type: "true-false",
        answer: true,
        explanation: "Area covers a 2-D surface (squared units); volume fills 3-D space (cubed units).",
        difficulty: "easy",
      },
    ],
  },

  // -----------------------------------------------------------------
  {
    id: "unit-6",
    number: 6,
    topics: [],
    slug: "unit-6",
    title: "Statistics & Data Analysis",
    short: "Center, spread, and visualizing data with the right plot.",
    description:
      "Ask statistical questions, choose the right plot, and describe data with measures of center and spread.",
    icon: "∑",
    estimatedMinutes: 55,
    frameworkUrl: "https://drive.google.com/file/d/10aEjuN33SjjyTmCDSpBAj3Oc6WlUqnXB/view",
    objectives: [
      "Tell statistical from non-statistical questions",
      "Find mean, median, mode, and range",
      "Compute interquartile range (IQR)",
      "Build and read dot plots, histograms, and box-and-whisker plots",
      "Decide which display fits a question best",
    ],
    videos: [
      { videoId: "qyYSQDcSNlY", title: "Statistical & Non-Statistical Questions", source: "Khan Academy", description: "Learn which questions expect many different answers." },
      { videoId: "9IJ_NgP00FU", title: "Statistical vs Non-Statistical Questions", source: "Other", description: "More examples of questions that need data to answer." },
      { videoId: "B1HEzNTGeZ4", title: "Mean, Median & Mode", source: "Math Antics", description: "Three ways to describe the center of a data set." },
      { videoId: "oatwXlZBPw0", title: "Finding Mean, Median & Mode", source: "Math with Mr. J", description: "Calculate each measure of center with worked examples." },
      { videoId: "VABsJBw1JqA", title: "Interquartile Range (IQR)", source: "Math with Mr. J", description: "Measure the spread of the middle half of your data." },
      { videoId: "qLYYHWYr8xI", title: "Range and Interquartile Range", source: "Khan Academy", description: "Compare the full spread vs. the middle 50%." },
      { videoId: "gdE46YSedvE", title: "Dot Plots & Frequency Tables", source: "Khan Academy", description: "Show how often each value appears in a data set." },
      { videoId: "gSEYtAjuZ-Y", title: "Histograms", source: "Khan Academy", description: "Group numeric data into ranges and display as bars." },
      { videoId: "nV8jR8M8C74", title: "Box and Whisker Plots", source: "Math Antics", description: "Summarize a data set with five key numbers." },
      { videoId: "09Cx7xuIXig", title: "Constructing a Box and Whisker Plot", source: "Khan Academy", description: "Build a box plot step by step from raw data." },
      { videoId: "s_w3EJ2Jzw0", title: "Comparing Dot Plots, Histograms & Box Plots", source: "Khan Academy", description: "Pick the best display for the question you are asking." },
      { videoId: "-2OOBEBq9-4", title: "Impact on Mean & Median When Removing Data", source: "Khan Academy", description: "See how outliers change the center of a data set." },
    ],
    worksheets: [
      { driveFileId: "1GD8IoL1vAQ5gB-SrgNLIkxKhUfrhL12C", title: "Worksheet — Statistics & data", description: "Mixed practice for the unit." },
    ],
    externalPractice: [
      { href: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-data-statistics", title: "Statistics & data practice", source: "Khan Academy" },
    ],
    quiz: [
      {
        id: "u6-q1",
        prompt: "Find the median of: 4, 7, 2, 9, 5",
        type: "short-answer",
        answer: "5",
        explanation: "Sort: 2, 4, 5, 7, 9 → middle value is 5.",
        difficulty: "easy",
      },
      {
        id: "u6-q2",
        prompt: "Which display is best for showing the frequency of test-score ranges?",
        type: "multiple-choice",
        options: ["Histogram", "Pie chart", "Pictograph", "Line graph"],
        answer: "Histogram",
        explanation: "Histograms group numeric data into bins.",
        difficulty: "medium",
      },
      {
        id: "u6-q3",
        prompt: "“How tall are sixth-graders in our school?” is a statistical question.",
        type: "true-false",
        answer: true,
        explanation: "It anticipates variability across many students.",
        difficulty: "easy",
      },
    ],
  },

  // -----------------------------------------------------------------
  {
    id: "unit-7",
    number: 7,
    topics: [],
    slug: "unit-7",
    title: "Geometry in Action — Surface Area & Volume",
    short: "Putting area, surface area, and volume to work in real-world problems.",
    description:
      "Apply geometry to packaging, water tanks, and design — a culminating unit that revisits the year's measurement ideas.",
    icon: "▭",
    estimatedMinutes: 50,
    frameworkUrl: "https://drive.google.com/file/d/1YgLlErTGZ1Fbga1Elh11l8_Io0ik9Zz3/view",
    objectives: [
      "Compute area of triangles, polygons, and composite figures",
      "Calculate surface area using nets",
      "Compute volume of rectangular prisms (whole and fractional dimensions)",
      "Solve multi-step measurement word problems",
    ],
    videos: [
      { videoId: "xCdxURXMdFY", title: "Area of Triangles", source: "Math Antics", description: "Use ½ × base × height to find triangle area." },
      { videoId: "IaoZhhx_I9s", title: "Area of Polygons", source: "Math Antics", description: "Find area of shapes with more than four sides." },
      { videoId: "z4Lat1uOQI4", title: "Area of Composite Figures", source: "Math with Mr. J", description: "Break a complex shape into simpler pieces." },
      { videoId: "loAA3TCNAvU", title: "Area of Composite Shapes", source: "Khan Academy", description: "Add areas of rectangles and triangles together." },
      { videoId: "mtMNvnm71Z0", title: "Surface Area", source: "Khan Academy", description: "Total area of all faces on a 3-D object." },
      { videoId: "dCD02kuobnY", title: "Surface Area Using Nets", source: "Math with Mr. J", description: "Unfold a prism and add up each flat face." },
      { videoId: "EJTPGyWqhqc", title: "Volume of Rectangular Prisms", source: "Khan Academy", description: "Length × width × height for box-shaped objects." },
      { videoId: "By7sVb2IhFs", title: "Volume", source: "Math with Mr. J", description: "Practice finding how much space a solid fills." },
      { videoId: "OanPzjf2EYY", title: "Volume Word Problems", source: "Khan Academy", description: "Real-world problems about tanks, boxes, and containers." },
      { videoId: "gNqmI0f16QI", title: "Area & Perimeter Word Problems", source: "MashUp Math", description: "Decide whether a problem asks for area or perimeter." },
    ],
    worksheets: [
      { driveFileId: "1ctTOKapYtWPf0B_IyX6nlaOS8K0vXaOI", title: "Worksheet — Applied geometry", description: "End-of-year mixed practice." },
    ],
    externalPractice: [
      { href: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-geometry-topic", title: "Geometry practice", source: "Khan Academy" },
    ],
    quiz: [
      {
        id: "u7-q1",
        prompt: "A box has dimensions 2 ft × 3 ft × 5 ft. What is its volume?",
        type: "short-answer",
        answer: "30",
        explanation: "V = l × w × h = 2 × 3 × 5 = 30 cubic feet.",
        difficulty: "easy",
      },
      {
        id: "u7-q2",
        prompt: "Which formula finds the area of a triangle?",
        type: "multiple-choice",
        options: ["A = b × h", "A = (1/2) × b × h", "A = π × r²", "A = s²"],
        answer: "A = (1/2) × b × h",
        explanation: "Half the base times the height.",
        difficulty: "easy",
      },
      {
        id: "u7-q3",
        prompt: "Surface area of a rectangular prism equals the area of all 6 faces added together.",
        type: "true-false",
        answer: true,
        explanation: "Sum the areas of all six faces (top, bottom, and four sides).",
        difficulty: "easy",
      },
    ],
  },
];

export const getUnit = (slug: string) => UNITS.find((u) => u.slug === slug);
export const getUnitIndex = (slug: string) => UNITS.findIndex((u) => u.slug === slug);

export const getTopic = (unitSlug: string, topicSlug: string) => {
  const unit = getUnit(unitSlug);
  if (!unit) return undefined;
  const index = unit.topics.findIndex((t) => t.slug === topicSlug);
  if (index === -1) return undefined;
  return {
    unit,
    topic: unit.topics[index],
    index,
    prev: index > 0 ? unit.topics[index - 1] : null,
    next: index < unit.topics.length - 1 ? unit.topics[index + 1] : null,
  };
};

/** Total number of videos across a unit's topics (main + extra). */
export const countUnitVideos = (unit: Unit) =>
  unit.topics.reduce((n, t) => n + 1 + (t.extraVideo ? 1 : 0), 0);

/** Total number of Adam worksheets across a unit's topics. */
export const countUnitWorksheets = (unit: Unit) =>
  unit.topics.reduce((n, t) => n + (t.worksheet ? 1 : 0), 0);
