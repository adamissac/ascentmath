/**
 * Grade 7 Mathematics units - aligned to Georgia DOE (GADOE) standards.
 * Same shape as Grade 6: each unit is split into focused topics with a
 * walkthrough, a video, practice, and a short quiz.
 *
 * Units follow the Georgia standards strands: operations with rational
 * numbers, ratios & proportional relationships, expressions & equations,
 * geometry, statistics (inferences), and probability.
 */

import type { Unit } from "./units";

const KHAN_7 = "https://www.khanacademy.org/math/cc-seventh-grade-math";

export const GRADE_7_UNITS: Unit[] = [
  // ================================================================
  // UNIT 1 - Operations with Rational Numbers
  // ================================================================
  {
    id: "g7-unit-1",
    number: 1,
    slug: "rational-numbers",
    title: "Operations with Rational Numbers",
    short: "Add, subtract, multiply, and divide positive and negative numbers - integers, fractions, and decimals.",
    description:
      "Extend everything you know about arithmetic to negative numbers. You'll learn the sign rules for adding, subtracting, multiplying, and dividing integers, then apply them to fractions and decimals.",
    icon: "±",
    estimatedMinutes: 70,
    objectives: [
      "Add and subtract integers using a number line and the key sign rules.",
      "Multiply and divide integers and know when the result is positive or negative.",
      "Apply the rules of signs to operations with fractions and decimals.",
      "Solve real-world problems involving rational numbers.",
    ],
    vocabulary: [
      { term: "Integer", meaning: "A whole number and its opposite, including zero (…, -2, -1, 0, 1, 2, …)." },
      { term: "Rational number", meaning: "Any number that can be written as a fraction of two integers." },
      { term: "Additive inverse", meaning: "The opposite of a number; a number plus its opposite equals zero." },
      { term: "Absolute value", meaning: "A number's distance from zero on the number line, always positive." },
    ],
    topics: [
      {
        id: "g7u1-t1",
        slug: "adding-subtracting-integers",
        title: "Adding & Subtracting Integers",
        summary: "Use the number line and two key rules to combine positive and negative numbers.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Think of it as moving on a number line",
            paragraphs: [
              "Adding a positive number moves you right; adding a negative number moves you left. Subtracting flips the direction.",
            ],
          },
          {
            heading: "Two rules that make everything easier",
            steps: [
              "Adding a negative is the same as subtracting a positive: 5 + (-3) = 5 - 3 = 2.",
              "Subtracting a negative is the same as adding a positive: 5 - (-3) = 5 + 3 = 8.",
            ],
          },
          {
            example: {
              problem: "Simplify -4 + 9 - (-2).",
              solution: [
                "Rewrite the double negative: -4 + 9 + 2.",
                "Combine left to right: -4 + 9 = 5.",
                "Then 5 + 2 = 7.",
              ],
            },
          },
          {
            callout: {
              label: "Watch out",
              text: "When two numbers have different signs, subtract their absolute values and keep the sign of the larger one.",
            },
          },
        ],
        video: { videoId: "_BgblvF90UE", title: "Adding & Subtracting Integers", source: "Math Antics", description: "Two simple rules plus a number-line strategy for every case." },
        extraVideo: { videoId: "OAoLCXpao6s", title: "Negative Numbers", source: "Math Antics", description: "What negative numbers are and how to compare them." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-negative-numbers-add-and-subtract`, title: "Add & subtract negatives", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/integers.php", title: "Integers worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u1t1-q1",
            prompt: "What is -7 + 3?",
            type: "multiple-choice",
            options: ["-10", "-4", "4", "10"],
            answer: "-4",
            explanation: "Different signs: subtract absolute values (7 - 3 = 4) and keep the sign of the larger, which is negative.",
            difficulty: "easy",
          },
          {
            id: "g7u1t1-q2",
            prompt: "Simplify: 6 - (-5).",
            type: "multiple-choice",
            options: ["1", "-1", "11", "-11"],
            answer: "11",
            explanation: "Subtracting a negative is the same as adding a positive: 6 + 5 = 11.",
            difficulty: "easy",
          },
          {
            id: "g7u1t1-q3",
            prompt: "Adding a negative number is the same as subtracting a positive number.",
            type: "true-false",
            answer: true,
            explanation: "Yes - for example, 8 + (-3) = 8 - 3 = 5.",
            difficulty: "medium",
          },
        ],
      },
      {
        id: "g7u1-t2",
        slug: "multiplying-dividing-integers",
        title: "Multiplying & Dividing Integers",
        summary: "Same signs give a positive answer; different signs give a negative answer.",
        estimatedMinutes: 20,
        walkthrough: [
          {
            heading: "One rule for both operations",
            paragraphs: [
              "Multiplication and division follow the exact same sign rule, so you only have to remember one thing.",
            ],
            steps: [
              "Same signs (+ and +, or - and -) → the answer is positive.",
              "Different signs (+ and -) → the answer is negative.",
            ],
          },
          {
            example: {
              problem: "Evaluate (-6) × (-4) and (-20) ÷ 5.",
              solution: [
                "(-6) × (-4): same signs → positive. 6 × 4 = 24, so the answer is 24.",
                "(-20) ÷ 5: different signs → negative. 20 ÷ 5 = 4, so the answer is -4.",
              ],
            },
          },
          {
            callout: {
              label: "Tip",
              text: "Count the negative signs. An even number of negatives gives a positive; an odd number gives a negative.",
            },
          },
        ],
        video: { videoId: "K_tPbVPfHgk", title: "Integer Multiplication & Division", source: "Math Antics", description: "Why same signs make a positive and different signs make a negative." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-negative-numbers-multiply-and-divide`, title: "Multiply & divide negatives", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/integers.php", title: "Integer operations worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u1t2-q1",
            prompt: "What is (-8) × 3?",
            type: "multiple-choice",
            options: ["-24", "24", "-11", "11"],
            answer: "-24",
            explanation: "Different signs → negative. 8 × 3 = 24, so the answer is -24.",
            difficulty: "easy",
          },
          {
            id: "g7u1t2-q2",
            prompt: "What is (-36) ÷ (-9)?",
            type: "multiple-choice",
            options: ["-4", "4", "-27", "27"],
            answer: "4",
            explanation: "Same signs → positive. 36 ÷ 9 = 4.",
            difficulty: "easy",
          },
          {
            id: "g7u1t2-q3",
            prompt: "The product (-2)(-3)(-1) is positive.",
            type: "true-false",
            answer: false,
            explanation: "There are three negative signs (odd), so the product is negative. It equals -6.",
            difficulty: "medium",
          },
        ],
      },
      {
        id: "g7u1-t3",
        slug: "operations-rational-numbers",
        title: "Operations with Rational Numbers",
        summary: "Apply the sign rules to fractions and decimals, not just whole numbers.",
        estimatedMinutes: 24,
        walkthrough: [
          {
            heading: "The rules don't change",
            paragraphs: [
              "Negative fractions and decimals follow the same sign rules as integers. First handle the sign, then do the arithmetic you already know.",
            ],
          },
          {
            heading: "Adding & subtracting fractions",
            steps: [
              "Rewrite subtraction as adding the opposite if it helps.",
              "Find a common denominator.",
              "Add or subtract the numerators and apply the sign rule.",
            ],
          },
          {
            example: {
              problem: "Compute -3/4 + 1/2.",
              solution: [
                "Common denominator is 4: 1/2 = 2/4.",
                "-3/4 + 2/4 = -1/4.",
              ],
            },
          },
          {
            callout: {
              label: "Watch out",
              text: "A negative fraction can be written three equal ways: -3/4 = (-3)/4 = 3/(-4). Don't let the placement of the sign confuse you.",
            },
          },
        ],
        video: { videoId: "5juto2ze8Lg", title: "Adding & Subtracting Fractions", source: "Math Antics", description: "Find common denominators, then combine - the same process works with negatives." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-negative-numbers-add-and-subtract`, title: "Rational number operations", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/fractions.php", title: "Fraction operations worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u1t3-q1",
            prompt: "What is -1/3 + 1/3?",
            type: "multiple-choice",
            options: ["-2/3", "2/3", "0", "1"],
            answer: "0",
            explanation: "A number plus its opposite (additive inverse) equals zero.",
            difficulty: "easy",
          },
          {
            id: "g7u1t3-q2",
            prompt: "What is (-0.5) × 0.4?",
            type: "multiple-choice",
            options: ["-0.2", "0.2", "-0.9", "0.9"],
            answer: "-0.2",
            explanation: "Different signs → negative. 0.5 × 0.4 = 0.2, so the answer is -0.2.",
            difficulty: "medium",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_7}/cc-7th-negative-numbers-add-and-subtract`, title: "Negative numbers: add & subtract", source: "Khan Academy" },
      { href: `${KHAN_7}/cc-7th-negative-numbers-multiply-and-divide`, title: "Negative numbers: multiply & divide", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/integers.php", title: "Integers worksheet library", source: "Math Worksheets 4 Kids" },
    ],
  },

  // ================================================================
  // UNIT 2 - Ratios & Proportional Relationships
  // ================================================================
  {
    id: "g7-unit-2",
    number: 2,
    slug: "proportional-relationships",
    title: "Ratios & Proportional Relationships",
    short: "Unit rates with fractions, the constant of proportionality, and real-world percent problems.",
    description:
      "Build on Grade 6 ratios to work with proportional relationships. You'll compute unit rates from fractions, find the constant of proportionality, and solve percent problems like tax, tips, discounts, and percent change.",
    icon: "∝",
    estimatedMinutes: 68,
    objectives: [
      "Compute unit rates from ratios of fractions.",
      "Recognize proportional relationships and find the constant of proportionality (k).",
      "Write equations in the form y = kx.",
      "Solve multi-step percent problems: tax, tip, markup, discount, and percent change.",
    ],
    vocabulary: [
      { term: "Unit rate", meaning: "A rate with a denominator of 1, like miles per hour." },
      { term: "Proportional relationship", meaning: "Two quantities with a constant ratio; graphs as a straight line through the origin." },
      { term: "Constant of proportionality", meaning: "The fixed ratio k in the equation y = kx." },
      { term: "Percent change", meaning: "How much a quantity increased or decreased, as a percent of the original." },
    ],
    topics: [
      {
        id: "g7u2-t1",
        slug: "unit-rates-with-fractions",
        title: "Unit Rates with Fractions",
        summary: "Find a per-one rate even when the quantities are fractions.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "A unit rate is 'per one'",
            paragraphs: [
              "A unit rate tells you how much of one quantity goes with exactly one of another - like miles per hour or cost per pound.",
            ],
          },
          {
            heading: "When the numbers are fractions",
            steps: [
              "Write the rate as a fraction (a complex fraction).",
              "Divide the top by the bottom - multiply by the reciprocal.",
              "Simplify to get the rate per one.",
            ],
          },
          {
            example: {
              problem: "A person walks 1/2 mile in 1/4 hour. What is the speed in miles per hour?",
              solution: [
                "Set up the rate: (1/2) ÷ (1/4).",
                "Multiply by the reciprocal: 1/2 × 4/1 = 4/2 = 2.",
                "The unit rate is 2 miles per hour.",
              ],
            },
          },
        ],
        video: { videoId: "2DBBKArGfus", title: "Determining Rates with Fractions", source: "Khan Academy", description: "Turn a ratio of fractions into a clean unit rate." },
        extraVideo: { videoId: "qGTYSAeLTOE", title: "Rates and Unit Rates", source: "Other", description: "A refresher on cost-per-item and speed rates." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-fractions-decimals`, title: "Rates with fractions", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/unit-rate.php", title: "Unit rate worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u2t1-q1",
            prompt: "You read 1/3 page in 1/6 minute. What is your rate in pages per minute?",
            type: "multiple-choice",
            options: ["1/2", "2", "1/18", "3"],
            answer: "2",
            explanation: "(1/3) ÷ (1/6) = 1/3 × 6/1 = 6/3 = 2 pages per minute.",
            difficulty: "medium",
          },
          {
            id: "g7u2t1-q2",
            prompt: "Dividing by a fraction is the same as multiplying by its reciprocal.",
            type: "true-false",
            answer: true,
            explanation: "Yes - that is the key step for computing unit rates from fractions.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g7u2-t2",
        slug: "constant-of-proportionality",
        title: "Proportional Relationships & k",
        summary: "Spot proportional relationships and find the constant of proportionality.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "What makes a relationship proportional?",
            paragraphs: [
              "Two quantities are proportional when their ratio is always the same. On a graph, that means a straight line through the origin (0, 0).",
            ],
          },
          {
            heading: "Finding the constant of proportionality",
            steps: [
              "Pick any pair of values (x, y) from a table or graph.",
              "Divide: k = y ÷ x.",
              "Write the equation y = kx.",
            ],
          },
          {
            example: {
              problem: "A table shows (2, 8), (3, 12), (5, 20). Find k and write the equation.",
              solution: [
                "k = y ÷ x = 8 ÷ 2 = 4 (check: 12 ÷ 3 = 4, 20 ÷ 5 = 4).",
                "The equation is y = 4x.",
              ],
            },
          },
          {
            callout: {
              label: "Tip",
              text: "The constant of proportionality is the same as the unit rate - the value of y when x = 1.",
            },
          },
        ],
        video: { videoId: "qcz1Cm_-l50", title: "Equations of Proportional Relationships", source: "Khan Academy", description: "Write y = kx and find the constant of proportionality." },
        extraVideo: { videoId: "l-HtxhClZ-0", title: "Proportional Relationships", source: "Khan Academy", description: "How to tell when two quantities grow together at a steady rate." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-rates-and-proportional-relationships`, title: "Proportional relationships", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/proportion.php", title: "Proportion worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u2t2-q1",
            prompt: "A proportional relationship contains the point (4, 28). What is the constant of proportionality?",
            type: "multiple-choice",
            options: ["4", "7", "24", "32"],
            answer: "7",
            explanation: "k = y ÷ x = 28 ÷ 4 = 7.",
            difficulty: "easy",
          },
          {
            id: "g7u2t2-q2",
            prompt: "A proportional relationship always passes through the origin (0, 0).",
            type: "true-false",
            answer: true,
            explanation: "When x = 0, y = k(0) = 0, so the line always goes through (0, 0).",
            difficulty: "medium",
          },
        ],
      },
      {
        id: "g7u2-t3",
        slug: "percent-problems",
        title: "Percent Problems",
        summary: "Solve tax, tip, discount, markup, and percent-change problems.",
        estimatedMinutes: 24,
        walkthrough: [
          {
            heading: "Percent means 'per 100'",
            paragraphs: [
              "To find a percent of a number, change the percent to a decimal and multiply. 25% = 0.25, so 25% of 80 is 0.25 × 80 = 20.",
            ],
          },
          {
            heading: "Tax, tip, discount, and markup",
            steps: [
              "Find the percent amount (the tax, tip, or discount).",
              "For tax, tip, or markup, add it to the original.",
              "For a discount, subtract it from the original.",
            ],
          },
          {
            example: {
              problem: "A $40 shirt is 30% off. What is the sale price?",
              solution: [
                "Discount = 0.30 × 40 = 12.",
                "Sale price = 40 - 12 = 28.",
                "A shortcut: pay 70%, so 0.70 × 40 = 28.",
              ],
            },
          },
          {
            callout: {
              label: "Percent change",
              text: "Percent change = (amount of change ÷ original amount) × 100. Increase is positive; decrease is negative.",
            },
          },
        ],
        video: { videoId: "rR95Cbcjzus", title: "Finding a Percent of a Number", source: "Math Antics", description: "Two methods for finding a percent of any amount." },
        extraVideo: { videoId: "5nZEUpZX_P0", title: "Calculating Percent Change", source: "Math Antics", description: "The formula for percent increase and decrease." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-fractions-decimals`, title: "Percent word problems", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/percent.php", title: "Percent worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u2t3-q1",
            prompt: "A $60 jacket is marked up 20%. What is the new price?",
            type: "multiple-choice",
            options: ["$72", "$48", "$80", "$12"],
            answer: "$72",
            explanation: "Markup = 0.20 × 60 = 12, so the price is 60 + 12 = 72.",
            difficulty: "easy",
          },
          {
            id: "g7u2t3-q2",
            prompt: "A price drops from $50 to $40. What is the percent decrease?",
            type: "multiple-choice",
            options: ["10%", "20%", "25%", "80%"],
            answer: "20%",
            explanation: "Change is 10. Percent change = 10 ÷ 50 × 100 = 20%.",
            difficulty: "medium",
          },
          {
            id: "g7u2t3-q3",
            prompt: "To find 15% of a number, you can multiply by 0.15.",
            type: "true-false",
            answer: true,
            explanation: "15% = 15/100 = 0.15, so multiplying by 0.15 finds 15% of a number.",
            difficulty: "easy",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_7}/cc-7th-rates-and-proportional-relationships`, title: "Rates & proportional relationships", source: "Khan Academy" },
      { href: `${KHAN_7}/cc-7th-fractions-decimals`, title: "Rates & percentages", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/proportion.php", title: "Proportion worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },

  // ================================================================
  // UNIT 3 - Expressions & Equations
  // ================================================================
  {
    id: "g7-unit-3",
    number: 3,
    slug: "expressions-equations",
    title: "Expressions & Equations",
    short: "Expand and factor linear expressions, then solve two-step equations and inequalities.",
    description:
      "Work with algebraic expressions and equations. You'll use the distributive property to expand and factor, combine like terms, and solve two-step equations and inequalities - including knowing when to flip an inequality sign.",
    icon: "x",
    estimatedMinutes: 66,
    objectives: [
      "Use the distributive property to expand and factor linear expressions.",
      "Combine like terms to write equivalent expressions.",
      "Solve two-step equations using inverse operations.",
      "Solve two-step inequalities and graph their solutions.",
    ],
    vocabulary: [
      { term: "Coefficient", meaning: "The number multiplied by a variable, like the 3 in 3x." },
      { term: "Like terms", meaning: "Terms with the same variable raised to the same power." },
      { term: "Distributive property", meaning: "a(b + c) = ab + ac." },
      { term: "Inequality", meaning: "A statement comparing values with <, >, ≤, or ≥." },
    ],
    topics: [
      {
        id: "g7u3-t1",
        slug: "linear-expressions",
        title: "Expanding & Factoring Expressions",
        summary: "Use the distributive property and combine like terms.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Distribute to expand",
            paragraphs: [
              "The distributive property says a(b + c) = ab + ac. Multiply the outside number by every term inside the parentheses.",
            ],
          },
          {
            heading: "Combine like terms",
            paragraphs: [
              "Like terms share the same variable part. Add or subtract their coefficients: 5x + 2x = 7x. The number term (constant) stays separate.",
            ],
          },
          {
            example: {
              problem: "Expand and simplify 3(2x + 4) - x.",
              solution: [
                "Distribute: 3 · 2x + 3 · 4 = 6x + 12.",
                "Now the expression is 6x + 12 - x.",
                "Combine like terms: 6x - x = 5x, so the answer is 5x + 12.",
              ],
            },
          },
          {
            callout: {
              label: "Factoring is the reverse",
              text: "To factor, pull out the greatest common factor: 6x + 9 = 3(2x + 3).",
            },
          },
        ],
        video: { videoId: "3NHSwiv_pSE", title: "Distributive Property", source: "Khan Academy", description: "Multiply a number across terms inside parentheses." },
        extraVideo: { videoId: "DKC74YKJpNY", title: "Combining Like Terms", source: "Math Antics", description: "Add or subtract terms that share the same variable part." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-expressions-equations`, title: "Equivalent expressions", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/algebraic-expressions.php", title: "Expressions worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u3t1-q1",
            prompt: "Expand: 4(x + 3).",
            type: "multiple-choice",
            options: ["4x + 3", "4x + 12", "x + 12", "4x + 7"],
            answer: "4x + 12",
            explanation: "Distribute the 4: 4·x + 4·3 = 4x + 12.",
            difficulty: "easy",
          },
          {
            id: "g7u3t1-q2",
            prompt: "Simplify: 7y + 2 - 3y.",
            type: "multiple-choice",
            options: ["4y + 2", "10y + 2", "6y", "4y - 2"],
            answer: "4y + 2",
            explanation: "Combine like terms: 7y - 3y = 4y. The constant 2 stays, giving 4y + 2.",
            difficulty: "easy",
          },
          {
            id: "g7u3t1-q3",
            prompt: "Factor: 5x + 15.",
            type: "multiple-choice",
            options: ["5(x + 3)", "5(x + 15)", "x(5 + 15)", "5(x + 10)"],
            answer: "5(x + 3)",
            explanation: "The GCF is 5: 5x + 15 = 5(x + 3).",
            difficulty: "medium",
          },
        ],
      },
      {
        id: "g7u3-t2",
        slug: "two-step-equations",
        title: "Two-Step Equations",
        summary: "Undo two operations to isolate the variable.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Work the order of operations in reverse",
            paragraphs: [
              "To get the variable alone, undo addition or subtraction first, then undo multiplication or division.",
            ],
          },
          {
            example: {
              problem: "Solve 2x + 5 = 13.",
              solution: [
                "Subtract 5 from both sides: 2x = 8.",
                "Divide both sides by 2: x = 4.",
                "Check: 2(4) + 5 = 13. ✓",
              ],
            },
          },
          {
            callout: {
              label: "Always check",
              text: "Substitute your answer back into the original equation. If both sides match, you're done.",
            },
          },
        ],
        video: { videoId: "LDIiYKYvvdA", title: "Solving 2-Step Equations", source: "Math Antics", description: "Undo operations in reverse to isolate the variable." },
        extraVideo: { videoId: "l3XzepN03KQ", title: "Solving Basic Equations", source: "Math Antics", description: "A refresher on one-step equations." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-expressions-equations`, title: "Two-step equations", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/equation.php", title: "Equation worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u3t2-q1",
            prompt: "Solve: 3x - 4 = 11.",
            type: "multiple-choice",
            options: ["x = 5", "x = 3", "x = 7", "x = 9"],
            answer: "x = 5",
            explanation: "Add 4: 3x = 15. Divide by 3: x = 5.",
            difficulty: "easy",
          },
          {
            id: "g7u3t2-q2",
            prompt: "Solve: x/2 + 3 = 7.",
            type: "multiple-choice",
            options: ["x = 8", "x = 5", "x = 20", "x = 2"],
            answer: "x = 8",
            explanation: "Subtract 3: x/2 = 4. Multiply by 2: x = 8.",
            difficulty: "medium",
          },
        ],
      },
      {
        id: "g7u3-t3",
        slug: "two-step-inequalities",
        title: "Two-Step Inequalities",
        summary: "Solve like equations - but flip the sign when you multiply or divide by a negative.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Solve like a two-step equation",
            paragraphs: [
              "Use inverse operations to isolate the variable, just like with equations.",
            ],
          },
          {
            heading: "The one special rule",
            callout: {
              label: "Flip the sign",
              text: "When you multiply or divide both sides by a negative number, reverse the inequality symbol.",
            },
          },
          {
            example: {
              problem: "Solve -2x + 1 < 9.",
              solution: [
                "Subtract 1 from both sides: -2x < 8.",
                "Divide by -2 and flip the sign: x > -4.",
              ],
            },
          },
        ],
        video: { videoId: "xOxvyeSl0uA", title: "Multi-Step Inequalities", source: "Khan Academy", description: "Solve inequalities and know when to reverse the sign." },
        extraVideo: { videoId: "mgHO-bsCDrA", title: "Solving Inequalities", source: "Math Antics", description: "Solve inequalities the same way you solve equations." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-expressions-equations`, title: "Two-step inequalities", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/inequalities.php", title: "Inequalities worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u3t3-q1",
            prompt: "Solve: 2x + 3 > 11.",
            type: "multiple-choice",
            options: ["x > 4", "x < 4", "x > 7", "x > 8"],
            answer: "x > 4",
            explanation: "Subtract 3: 2x > 8. Divide by 2 (positive, no flip): x > 4.",
            difficulty: "easy",
          },
          {
            id: "g7u3t3-q2",
            prompt: "When you divide both sides of an inequality by -3, you must reverse the inequality symbol.",
            type: "true-false",
            answer: true,
            explanation: "Dividing or multiplying by a negative number flips the direction of the inequality.",
            difficulty: "medium",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_7}/cc-7th-expressions-equations`, title: "Expressions & equations practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/equation.php", title: "Equation worksheets", source: "Math Worksheets 4 Kids" },
      { href: "https://www.mathworksheets4kids.com/inequalities.php", title: "Inequalities worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },

  // ================================================================
  // UNIT 4 - Geometry
  // ================================================================
  {
    id: "g7-unit-4",
    number: 4,
    slug: "geometry",
    title: "Geometry",
    short: "Scale drawings, angle relationships, circles, and the area, surface area, and volume of figures.",
    description:
      "Apply proportional reasoning and formulas to geometry. You'll work with scale drawings, angle relationships, the circumference and area of circles, and the surface area and volume of 3-D figures.",
    icon: "△",
    estimatedMinutes: 80,
    objectives: [
      "Use scale factors to interpret and create scale drawings.",
      "Find unknown angles using complementary, supplementary, vertical, and adjacent relationships.",
      "Calculate the circumference and area of circles.",
      "Find the area, surface area, and volume of 2-D and 3-D figures.",
    ],
    vocabulary: [
      { term: "Scale factor", meaning: "The ratio that compares a scale drawing to the real object." },
      { term: "Complementary angles", meaning: "Two angles whose measures add to 90°." },
      { term: "Supplementary angles", meaning: "Two angles whose measures add to 180°." },
      { term: "Circumference", meaning: "The distance around a circle: C = πd." },
    ],
    topics: [
      {
        id: "g7u4-t1",
        slug: "scale-drawings",
        title: "Scale Drawings",
        summary: "Use a scale factor to relate a drawing to the real object.",
        estimatedMinutes: 20,
        walkthrough: [
          {
            heading: "What a scale factor does",
            paragraphs: [
              "A scale factor tells you how many times bigger or smaller a drawing is than the real thing. A factor of 2 doubles every length; a factor of 0.1 shrinks everything to a tenth.",
            ],
          },
          {
            example: {
              problem: "A map uses a scale of 1 cm : 50 km. Two cities are 4 cm apart on the map. How far apart are they really?",
              solution: [
                "Each cm represents 50 km.",
                "4 cm × 50 km/cm = 200 km.",
              ],
            },
          },
          {
            callout: {
              label: "Tip",
              text: "Corresponding lengths scale by the scale factor, but areas scale by the factor squared.",
            },
          },
        ],
        video: { videoId: "o07enwTfSpU", title: "Corresponding Parts of Scaled Copies", source: "Khan Academy", description: "Identify matching sides and find the scale factor." },
        extraVideo: { videoId: "byjmR7JBXKc", title: "Interpreting a Scale Drawing", source: "Khan Academy", description: "Use a scale to convert drawing lengths to real lengths." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-geometry`, title: "Scale drawings", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "g7u4t1-q1",
            prompt: "A scale is 1 in : 8 ft. A wall is 3 in long on the drawing. How long is it in real life?",
            type: "multiple-choice",
            options: ["11 ft", "24 ft", "8 ft", "16 ft"],
            answer: "24 ft",
            explanation: "Each inch is 8 ft, so 3 × 8 = 24 ft.",
            difficulty: "easy",
          },
          {
            id: "g7u4t1-q2",
            prompt: "A scale factor greater than 1 makes the drawing larger than the original.",
            type: "true-false",
            answer: true,
            explanation: "A factor above 1 enlarges; a factor between 0 and 1 reduces.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g7u4-t2",
        slug: "angle-relationships",
        title: "Angle Relationships",
        summary: "Use complementary, supplementary, vertical, and adjacent angles to find unknowns.",
        estimatedMinutes: 20,
        walkthrough: [
          {
            heading: "The key relationships",
            steps: [
              "Complementary angles add to 90°.",
              "Supplementary angles add to 180°.",
              "Vertical angles (across an X) are equal.",
              "Adjacent angles share a side and a vertex.",
            ],
          },
          {
            example: {
              problem: "Two angles are supplementary. One is 110°. Find the other.",
              solution: [
                "Supplementary angles add to 180°.",
                "180° - 110° = 70°.",
              ],
            },
          },
          {
            callout: {
              label: "Set up an equation",
              text: "When an unknown angle is part of a relationship, write an equation (like x + 110 = 180) and solve.",
            },
          },
        ],
        video: { videoId: "DGKwdHMiqCg", title: "Angle Basics", source: "Math Antics", description: "Right, acute, obtuse, complementary, and supplementary angles." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-geometry`, title: "Angle relationships", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/angles.php", title: "Angles worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u4t2-q1",
            prompt: "An angle is complementary to a 35° angle. What is its measure?",
            type: "multiple-choice",
            options: ["55°", "65°", "145°", "35°"],
            answer: "55°",
            explanation: "Complementary angles add to 90°: 90 - 35 = 55.",
            difficulty: "easy",
          },
          {
            id: "g7u4t2-q2",
            prompt: "Vertical angles are always equal in measure.",
            type: "true-false",
            answer: true,
            explanation: "Vertical angles (opposite each other where two lines cross) are congruent.",
            difficulty: "medium",
          },
        ],
      },
      {
        id: "g7u4-t3",
        slug: "circumference-area-circles",
        title: "Circumference & Area of Circles",
        summary: "Use π with the radius and diameter to measure circles.",
        estimatedMinutes: 20,
        walkthrough: [
          {
            heading: "Two formulas to memorize",
            steps: [
              "Circumference: C = πd (or C = 2πr).",
              "Area: A = πr² (radius times itself, then times π).",
            ],
          },
          {
            example: {
              problem: "A circle has radius 5 cm. Find its circumference and area (use π ≈ 3.14).",
              solution: [
                "Circumference: C = 2πr = 2 × 3.14 × 5 = 31.4 cm.",
                "Area: A = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 cm².",
              ],
            },
          },
          {
            callout: {
              label: "Watch out",
              text: "For area you square the radius (r × r), not double it. Squaring and doubling are very different.",
            },
          },
        ],
        video: { videoId: "O-cawByg2aA", title: "Circles, Circumference and Area", source: "Math Antics", description: "Use π with radius and diameter to find both measures." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-geometry`, title: "Area & circumference of circles", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/circumference.php", title: "Circle worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u4t3-q1",
            prompt: "A circle has a diameter of 10 m. What is its circumference? (π ≈ 3.14)",
            type: "multiple-choice",
            options: ["31.4 m", "15.7 m", "78.5 m", "62.8 m"],
            answer: "31.4 m",
            explanation: "C = πd = 3.14 × 10 = 31.4 m.",
            difficulty: "easy",
          },
          {
            id: "g7u4t3-q2",
            prompt: "The area of a circle uses the formula A = πr².",
            type: "true-false",
            answer: true,
            explanation: "Area equals π times the radius squared.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g7u4-t4",
        slug: "area-volume-surface-area",
        title: "Volume & Surface Area",
        summary: "Find how much space a solid fills and the total area of its faces.",
        estimatedMinutes: 20,
        walkthrough: [
          {
            heading: "Volume vs. surface area",
            paragraphs: [
              "Volume measures the space inside a 3-D figure (cubic units). Surface area is the total area of all the faces (square units).",
            ],
          },
          {
            heading: "Prisms",
            steps: [
              "Volume of any prism = area of the base × height.",
              "Surface area = the sum of the areas of every face (use a net to keep track).",
            ],
          },
          {
            example: {
              problem: "Find the volume of a box 4 cm × 3 cm × 2 cm.",
              solution: [
                "Base area = 4 × 3 = 12 cm².",
                "Volume = base × height = 12 × 2 = 24 cm³.",
              ],
            },
          },
        ],
        video: { videoId: "qJwecTgce6c", title: "Volume", source: "Math Antics", description: "How much space a 3-D object fills, in cubic units." },
        extraVideo: { videoId: "ny5DVYNpqM8", title: "Surface Area Using Nets", source: "Khan Academy", description: "Unfold a 3-D shape and add up the flat faces." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-geometry`, title: "Volume & surface area", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/volume.php", title: "Volume worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u4t4-q1",
            prompt: "A rectangular prism is 5 × 2 × 3. What is its volume?",
            type: "multiple-choice",
            options: ["30", "10", "31", "16"],
            answer: "30",
            explanation: "Volume = length × width × height = 5 × 2 × 3 = 30 cubic units.",
            difficulty: "easy",
          },
          {
            id: "g7u4t4-q2",
            prompt: "Surface area is measured in cubic units.",
            type: "true-false",
            answer: false,
            explanation: "Surface area is measured in square units; volume is measured in cubic units.",
            difficulty: "medium",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_7}/cc-7th-geometry`, title: "Grade 7 geometry practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/angles.php", title: "Angles worksheets", source: "Math Worksheets 4 Kids" },
      { href: "https://www.mathworksheets4kids.com/volume.php", title: "Volume worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },

  // ================================================================
  // UNIT 5 - Statistics & Inferences
  // ================================================================
  {
    id: "g7-unit-5",
    number: 5,
    slug: "statistics",
    title: "Statistics & Inferences",
    short: "Use random samples to make inferences and compare two populations.",
    description:
      "Learn how statisticians use samples to draw conclusions about whole populations. You'll explore random sampling and how to avoid bias, then compare two populations using their centers and spread.",
    icon: "x̄",
    estimatedMinutes: 44,
    objectives: [
      "Understand why random samples are used to represent a population.",
      "Recognize sources of bias in a sample.",
      "Use measures of center and spread to compare two data sets.",
      "Draw informal comparative inferences about two populations.",
    ],
    vocabulary: [
      { term: "Population", meaning: "The entire group you want to learn about." },
      { term: "Sample", meaning: "A smaller part of the population that is actually studied." },
      { term: "Random sample", meaning: "A sample where every member has an equal chance of being chosen." },
      { term: "Bias", meaning: "Anything that makes a sample unrepresentative of the population." },
    ],
    topics: [
      {
        id: "g7u5-t1",
        slug: "random-sampling",
        title: "Random Sampling",
        summary: "Why a fair, random sample lets you make valid inferences.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Samples stand in for populations",
            paragraphs: [
              "It's usually impossible to survey everyone, so we study a sample and use it to estimate facts about the whole population.",
            ],
          },
          {
            heading: "Random keeps it fair",
            paragraphs: [
              "A random sample gives every member an equal chance of being selected. That keeps the sample representative and reduces bias.",
            ],
          },
          {
            callout: {
              label: "Watch out for bias",
              text: "Surveying only your friends, or only people in one place, can make a sample unrepresentative - even if the sample is large.",
            },
          },
        ],
        video: { videoId: "PdXDLNNXPik", title: "Random Sampling & Avoiding Bias", source: "Khan Academy", description: "Techniques for fair sampling and the bias to watch for." },
        extraVideo: { videoId: "TrOS8OnM1u4", title: "Systematic Random Sampling", source: "Khan Academy", description: "Another method for selecting a fair sample." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-statistics-and-probability`, title: "Sampling & inferences", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "g7u5t1-q1",
            prompt: "Which sample is most likely to represent all students at a school?",
            type: "multiple-choice",
            options: [
              "Students randomly chosen from the whole school list",
              "Only members of the basketball team",
              "Only students in one math class",
              "Only your friends",
            ],
            answer: "Students randomly chosen from the whole school list",
            explanation: "A random sample from the whole population is the most representative and least biased.",
            difficulty: "easy",
          },
          {
            id: "g7u5t1-q2",
            prompt: "In a random sample, every member of the population has an equal chance of being selected.",
            type: "true-false",
            answer: true,
            explanation: "That equal chance is exactly what makes a sample random.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g7u5-t2",
        slug: "comparing-populations",
        title: "Comparing Two Populations",
        summary: "Compare data sets using their centers and how spread out they are.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Compare center and spread",
            paragraphs: [
              "To compare two groups, look at a measure of center (mean or median) and a measure of spread (range, IQR, or mean absolute deviation).",
            ],
          },
          {
            example: {
              problem: "Class A has a mean test score of 80; Class B has a mean of 72. Both have similar spread. What can you infer?",
              solution: [
                "The centers differ by 8 points.",
                "Since the spreads are similar, Class A generally scored higher than Class B.",
              ],
            },
          },
          {
            callout: {
              label: "Tip",
              text: "A difference between groups is more meaningful when it is large compared to how spread out the data is.",
            },
          },
        ],
        video: { videoId: "s_w3EJ2Jzw0", title: "Comparing Dot Plots, Histograms & Box Plots", source: "Khan Academy", description: "Pick the right display and compare two data sets." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-statistics-and-probability`, title: "Comparing populations", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/mean.php", title: "Mean & data worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u5t2-q1",
            prompt: "To compare the typical value of two data sets, which should you compare?",
            type: "multiple-choice",
            options: ["A measure of center like the mean or median", "Only the largest value", "Only the number of data points", "The colors of the graphs"],
            answer: "A measure of center like the mean or median",
            explanation: "Center (mean or median) describes the typical value of a data set.",
            difficulty: "easy",
          },
          {
            id: "g7u5t2-q2",
            prompt: "A difference between two groups is more convincing when it is large compared to the spread of the data.",
            type: "true-false",
            answer: true,
            explanation: "If groups overlap a lot (high spread), a small difference in centers may not be meaningful.",
            difficulty: "medium",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_7}/cc-7th-statistics-and-probability`, title: "Statistics & probability practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/mean.php", title: "Mean, median & mode worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },

  // ================================================================
  // UNIT 6 - Probability
  // ================================================================
  {
    id: "g7-unit-6",
    number: 6,
    slug: "probability",
    title: "Probability",
    short: "Measure how likely events are, from a single coin flip to compound events.",
    description:
      "Probability tells you how likely something is to happen. You'll find the probability of simple events, compare theoretical and experimental probability, and calculate the probability of compound events.",
    icon: "?",
    estimatedMinutes: 44,
    objectives: [
      "Express the probability of an event as a number from 0 to 1.",
      "Find the probability of a simple event.",
      "Compare theoretical and experimental probability.",
      "Find the probability of compound events using lists, tables, and the multiplication idea.",
    ],
    vocabulary: [
      { term: "Probability", meaning: "A number from 0 (impossible) to 1 (certain) describing how likely an event is." },
      { term: "Outcome", meaning: "A single possible result of a trial." },
      { term: "Theoretical probability", meaning: "Favorable outcomes ÷ total possible outcomes." },
      { term: "Compound event", meaning: "An event made of two or more simple events." },
    ],
    topics: [
      {
        id: "g7u6-t1",
        slug: "simple-probability",
        title: "Simple Probability",
        summary: "Find how likely a single event is on a 0-to-1 scale.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "The probability scale",
            paragraphs: [
              "Probability runs from 0 (impossible) to 1 (certain). One-half means an event is just as likely to happen as not.",
            ],
          },
          {
            heading: "Calculating probability",
            paragraphs: [
              "For equally likely outcomes, probability = (number of favorable outcomes) ÷ (total number of outcomes).",
            ],
          },
          {
            example: {
              problem: "A bag has 3 red and 5 blue marbles. What is the probability of drawing red?",
              solution: [
                "Favorable outcomes (red) = 3.",
                "Total outcomes = 3 + 5 = 8.",
                "Probability = 3/8.",
              ],
            },
          },
        ],
        video: { videoId: "KzfWUEJjG18", title: "Basic Probability", source: "Math Antics", description: "The probability line, outcomes, and trials explained." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-statistics-and-probability`, title: "Basic probability", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/probability.php", title: "Probability worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u6t1-q1",
            prompt: "A fair die is rolled. What is the probability of rolling a 4?",
            type: "multiple-choice",
            options: ["1/6", "1/4", "4/6", "1/2"],
            answer: "1/6",
            explanation: "One favorable outcome (4) out of six equally likely outcomes: 1/6.",
            difficulty: "easy",
          },
          {
            id: "g7u6t1-q2",
            prompt: "A probability of 0 means an event is certain to happen.",
            type: "true-false",
            answer: false,
            explanation: "A probability of 0 means impossible; 1 means certain.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g7u6-t2",
        slug: "compound-probability",
        title: "Compound Probability",
        summary: "Find the probability of two or more events happening together.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Independent events",
            paragraphs: [
              "Events are independent when one doesn't affect the other (like two coin flips). For independent events, multiply the individual probabilities.",
            ],
          },
          {
            example: {
              problem: "What is the probability of flipping heads and then rolling a 3?",
              solution: [
                "P(heads) = 1/2.",
                "P(rolling 3) = 1/6.",
                "Multiply: 1/2 × 1/6 = 1/12.",
              ],
            },
          },
          {
            callout: {
              label: "Tip",
              text: "Listing all outcomes in a table or tree diagram is a reliable way to count compound outcomes.",
            },
          },
        ],
        video: { videoId: "xSc4oLA9e8o", title: "Compound Probability of Independent Events", source: "Khan Academy", description: "Multiply probabilities when events don't affect each other." },
        extraVideo: { videoId: "VjLEoo3hIoM", title: "Dependent Probability", source: "Khan Academy", description: "When the first event changes the second." },
        practiceLinks: [
          { href: `${KHAN_7}/cc-7th-statistics-and-probability`, title: "Compound events", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/probability.php", title: "Probability worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g7u6t2-q1",
            prompt: "Two coins are flipped. What is the probability of getting heads on both?",
            type: "multiple-choice",
            options: ["1/2", "1/4", "1/8", "2"],
            answer: "1/4",
            explanation: "P(heads) × P(heads) = 1/2 × 1/2 = 1/4.",
            difficulty: "medium",
          },
          {
            id: "g7u6t2-q2",
            prompt: "For independent events, you multiply their probabilities to find the probability of both happening.",
            type: "true-false",
            answer: true,
            explanation: "The multiplication rule applies to independent compound events.",
            difficulty: "medium",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_7}/cc-7th-statistics-and-probability`, title: "Probability practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/probability.php", title: "Probability worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },
];
