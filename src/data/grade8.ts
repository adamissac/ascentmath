/**
 * Grade 8 Mathematics units — aligned to Georgia DOE (GADOE) standards.
 * Same shape as Grade 6: each unit is split into focused topics with a
 * walkthrough, a video, practice, and a short quiz.
 *
 * Units follow the Georgia standards strands: exponents & real numbers,
 * linear equations, functions, linear functions, systems of equations,
 * transformations & similarity, and the Pythagorean theorem & volume.
 */

import type { Unit } from "./units";

const KHAN_8 = "https://www.khanacademy.org/math/cc-eighth-grade-math";

export const GRADE_8_UNITS: Unit[] = [
  // ================================================================
  // UNIT 1 — Real Numbers & Exponents
  // ================================================================
  {
    id: "g8-unit-1",
    number: 1,
    slug: "exponents-real-numbers",
    title: "Real Numbers & Exponents",
    short: "Properties of exponents, scientific notation, square and cube roots, and rational vs. irrational numbers.",
    description:
      "Work with very large and very small numbers. You'll apply the laws of exponents, write numbers in scientific notation, evaluate square and cube roots, and tell rational numbers apart from irrational ones.",
    icon: "√",
    estimatedMinutes: 70,
    objectives: [
      "Apply the properties of integer exponents to simplify expressions.",
      "Write and interpret numbers in scientific notation.",
      "Evaluate square roots and cube roots of perfect squares and cubes.",
      "Classify numbers as rational or irrational.",
    ],
    vocabulary: [
      { term: "Exponent", meaning: "The small number that tells how many times to multiply the base by itself." },
      { term: "Scientific notation", meaning: "A number written as a value between 1 and 10 times a power of 10." },
      { term: "Square root", meaning: "A number that, multiplied by itself, gives the original number." },
      { term: "Irrational number", meaning: "A number that cannot be written as a fraction; its decimal never ends or repeats." },
    ],
    topics: [
      {
        id: "g8u1-t1",
        slug: "properties-of-exponents",
        title: "Properties of Exponents",
        summary: "Use the product, quotient, and power rules to simplify expressions.",
        estimatedMinutes: 24,
        walkthrough: [
          {
            heading: "Exponents are repeated multiplication",
            paragraphs: [
              "2⁴ means 2 × 2 × 2 × 2 = 16. The base is 2 and the exponent is 4.",
            ],
          },
          {
            heading: "The key rules",
            steps: [
              "Product rule: same base, add exponents — x³ · x² = x⁵.",
              "Quotient rule: same base, subtract exponents — x⁵ ÷ x² = x³.",
              "Power rule: power of a power, multiply exponents — (x³)² = x⁶.",
              "Zero exponent: any nonzero base to the 0 power is 1.",
            ],
          },
          {
            example: {
              problem: "Simplify x⁴ · x³ ÷ x².",
              solution: [
                "Multiply: x⁴ · x³ = x⁷ (add 4 + 3).",
                "Divide: x⁷ ÷ x² = x⁵ (subtract 7 - 2).",
              ],
            },
          },
          {
            callout: {
              label: "Watch out",
              text: "A negative exponent means a reciprocal: x⁻² = 1 / x². It does not make the number negative.",
            },
          },
        ],
        video: { videoId: "LkhPRz7Hocg", title: "Exponents", source: "Math Antics", description: "What exponents mean and how to work with them." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-numbers-operations`, title: "Exponent properties", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/exponents.php", title: "Exponents worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g8u1t1-q1",
            prompt: "Simplify: x⁵ · x³.",
            type: "multiple-choice",
            options: ["x⁸", "x¹⁵", "x²", "x¹⁶"],
            answer: "x⁸",
            explanation: "Product rule: same base, add the exponents. 5 + 3 = 8.",
            difficulty: "easy",
          },
          {
            id: "g8u1t1-q2",
            prompt: "What is (2³)²?",
            type: "multiple-choice",
            options: ["2⁵", "2⁶", "2⁹", "2¹"],
            answer: "2⁶",
            explanation: "Power rule: multiply the exponents. 3 × 2 = 6.",
            difficulty: "medium",
          },
          {
            id: "g8u1t1-q3",
            prompt: "Any nonzero number raised to the zero power equals 1.",
            type: "true-false",
            answer: true,
            explanation: "For example, 7⁰ = 1 and (−4)⁰ = 1.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g8u1-t2",
        slug: "scientific-notation",
        title: "Scientific Notation",
        summary: "Write huge and tiny numbers compactly using powers of 10.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "The format",
            paragraphs: [
              "Scientific notation writes a number as (a value from 1 up to 10) × 10 raised to a power. Example: 125,000,000 = 1.25 × 10⁸.",
            ],
          },
          {
            heading: "Converting",
            steps: [
              "Move the decimal so one nonzero digit is in front of it.",
              "Count how many places you moved — that is the exponent.",
              "Large numbers get a positive exponent; small numbers (less than 1) get a negative exponent.",
            ],
          },
          {
            example: {
              problem: "Write 0.00046 in scientific notation.",
              solution: [
                "Move the decimal 4 places right to get 4.6.",
                "Because the number is small, the exponent is negative: 4.6 × 10⁻⁴.",
              ],
            },
          },
        ],
        video: { videoId: "bXkewQ7WEdI", title: "Scientific Notation", source: "Math Antics", description: "Convert between standard form and scientific notation." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-numbers-operations`, title: "Scientific notation", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/scientific-notation.php", title: "Scientific notation worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g8u1t2-q1",
            prompt: "Write 52,000 in scientific notation.",
            type: "multiple-choice",
            options: ["5.2 × 10⁴", "52 × 10³", "5.2 × 10³", "5.2 × 10⁻⁴"],
            answer: "5.2 × 10⁴",
            explanation: "Move the decimal 4 places: 5.2, and the number is large, so 10⁴.",
            difficulty: "easy",
          },
          {
            id: "g8u1t2-q2",
            prompt: "A number written as 3.0 × 10⁻⁵ is smaller than 1.",
            type: "true-false",
            answer: true,
            explanation: "A negative exponent means the number is a small decimal (0.00003).",
            difficulty: "medium",
          },
        ],
      },
      {
        id: "g8u1-t3",
        slug: "roots-and-irrational-numbers",
        title: "Roots & Irrational Numbers",
        summary: "Evaluate square and cube roots and tell rational from irrational numbers.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Square roots and cube roots",
            paragraphs: [
              "The square root of 49 is 7 because 7 × 7 = 49. The cube root of 8 is 2 because 2 × 2 × 2 = 8.",
            ],
          },
          {
            heading: "Rational vs. irrational",
            steps: [
              "Rational numbers can be written as a fraction; their decimals end or repeat (like 0.5 or 0.333…).",
              "Irrational numbers cannot; their decimals go on forever without repeating (like π or √2).",
            ],
          },
          {
            callout: {
              label: "Tip",
              text: "The square root of a perfect square (4, 9, 16, 25…) is rational. Most other square roots are irrational.",
            },
          },
        ],
        video: { videoId: "mbc3_e5lWw0", title: "Introduction to Square Roots", source: "Khan Academy", description: "What the radical symbol means and how to find square roots." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-numbers-operations`, title: "Roots & irrational numbers", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/square-roots.php", title: "Square root worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g8u1t3-q1",
            prompt: "What is √64?",
            type: "multiple-choice",
            options: ["6", "7", "8", "32"],
            answer: "8",
            explanation: "8 × 8 = 64, so √64 = 8.",
            difficulty: "easy",
          },
          {
            id: "g8u1t3-q2",
            prompt: "Which number is irrational?",
            type: "multiple-choice",
            options: ["0.25", "√2", "1/3", "9"],
            answer: "√2",
            explanation: "√2 ≈ 1.41421… never ends or repeats, so it is irrational.",
            difficulty: "medium",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_8}/cc-8th-numbers-operations`, title: "Numbers & operations practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/exponents.php", title: "Exponents worksheets", source: "Math Worksheets 4 Kids" },
      { href: "https://www.mathworksheets4kids.com/scientific-notation.php", title: "Scientific notation worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },

  // ================================================================
  // UNIT 2 — Linear Equations
  // ================================================================
  {
    id: "g8-unit-2",
    number: 2,
    slug: "linear-equations",
    title: "Linear Equations",
    short: "Solve multi-step equations, including ones with variables on both sides and special solution cases.",
    description:
      "Solve more complex linear equations. You'll work through multi-step equations, handle variables on both sides, and recognize when an equation has one solution, no solution, or infinitely many solutions.",
    icon: "=",
    estimatedMinutes: 46,
    objectives: [
      "Solve multi-step linear equations using inverse operations.",
      "Solve equations with variables on both sides.",
      "Recognize equations with one, no, or infinitely many solutions.",
      "Check solutions by substitution.",
    ],
    vocabulary: [
      { term: "Linear equation", meaning: "An equation whose variable is only to the first power." },
      { term: "Inverse operation", meaning: "An operation that undoes another, like subtraction undoing addition." },
      { term: "No solution", meaning: "An equation that is never true, like 3 = 5 after simplifying." },
      { term: "Infinitely many solutions", meaning: "An equation true for every value, like 4 = 4 after simplifying." },
    ],
    topics: [
      {
        id: "g8u2-t1",
        slug: "multi-step-equations",
        title: "Multi-Step Equations",
        summary: "Combine like terms and use inverse operations to solve.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "A repeatable plan",
            steps: [
              "Distribute to remove parentheses.",
              "Combine like terms on each side.",
              "Undo addition or subtraction, then multiplication or division.",
            ],
          },
          {
            example: {
              problem: "Solve 2(x + 3) + 4 = 18.",
              solution: [
                "Distribute: 2x + 6 + 4 = 18.",
                "Combine: 2x + 10 = 18.",
                "Subtract 10: 2x = 8. Divide by 2: x = 4.",
              ],
            },
          },
        ],
        video: { videoId: "LDIiYKYvvdA", title: "Solving 2-Step Equations", source: "Math Antics", description: "Undo operations in reverse — the same idea extends to multi-step equations." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-solving-equations`, title: "Multi-step equations", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/equation.php", title: "Equation worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g8u2t1-q1",
            prompt: "Solve: 3(x - 2) = 12.",
            type: "multiple-choice",
            options: ["x = 6", "x = 4", "x = 2", "x = 10"],
            answer: "x = 6",
            explanation: "Distribute: 3x - 6 = 12. Add 6: 3x = 18. Divide by 3: x = 6.",
            difficulty: "easy",
          },
          {
            id: "g8u2t1-q2",
            prompt: "Solve: 5x + 2x - 4 = 10.",
            type: "multiple-choice",
            options: ["x = 2", "x = 1", "x = 7", "x = 14"],
            answer: "x = 2",
            explanation: "Combine: 7x - 4 = 10. Add 4: 7x = 14. Divide by 7: x = 2.",
            difficulty: "medium",
          },
        ],
      },
      {
        id: "g8u2-t2",
        slug: "variables-on-both-sides",
        title: "Variables on Both Sides",
        summary: "Move variable terms to one side, then solve — and spot special cases.",
        estimatedMinutes: 24,
        walkthrough: [
          {
            heading: "Get variables together",
            steps: [
              "Add or subtract to move all variable terms to one side.",
              "Move constants to the other side.",
              "Divide to isolate the variable.",
            ],
          },
          {
            example: {
              problem: "Solve 2x + 3 = 5x - 6.",
              solution: [
                "Subtract 2x from both sides: 3 = 3x - 6.",
                "Add 6: 9 = 3x.",
                "Divide by 3: x = 3.",
              ],
            },
          },
          {
            callout: {
              label: "Special cases",
              text: "If the variables cancel and you get a false statement (3 = 5), there is no solution. If you get a true statement (4 = 4), there are infinitely many solutions.",
            },
          },
        ],
        video: { videoId: "f15zA0PhSek", title: "Equations with Variables on Both Sides", source: "Khan Academy", description: "Collect variable terms on one side, then solve." },
        extraVideo: { videoId: "1c5HY3z4k8M", title: "Variables on Both Sides (example)", source: "Khan Academy", description: "Another worked example: 20 − 7x = 6x − 6." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-solving-equations`, title: "Variables on both sides", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/equation.php", title: "Equation worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g8u2t2-q1",
            prompt: "Solve: 4x - 1 = 2x + 7.",
            type: "multiple-choice",
            options: ["x = 4", "x = 3", "x = 2", "x = 8"],
            answer: "x = 4",
            explanation: "Subtract 2x: 2x - 1 = 7. Add 1: 2x = 8. Divide by 2: x = 4.",
            difficulty: "medium",
          },
          {
            id: "g8u2t2-q2",
            prompt: "If solving an equation leads to 5 = 5, the equation has no solution.",
            type: "true-false",
            answer: false,
            explanation: "A true statement like 5 = 5 means infinitely many solutions, not none.",
            difficulty: "medium",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_8}/cc-8th-solving-equations`, title: "Solving equations practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/equation.php", title: "Equation worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },

  // ================================================================
  // UNIT 3 — Functions
  // ================================================================
  {
    id: "g8-unit-3",
    number: 3,
    slug: "functions",
    title: "Functions",
    short: "What a function is, how to tell if a relationship is one, and the difference between linear and nonlinear.",
    description:
      "Meet functions. You'll learn that a function pairs each input with exactly one output, use the vertical line test, and compare linear and nonlinear functions from tables, graphs, and equations.",
    icon: "ƒ",
    estimatedMinutes: 44,
    objectives: [
      "Define a function as a rule with exactly one output per input.",
      "Determine whether a relationship is a function (vertical line test).",
      "Identify linear functions and distinguish them from nonlinear ones.",
      "Interpret functions from tables, graphs, and equations.",
    ],
    vocabulary: [
      { term: "Function", meaning: "A rule that assigns exactly one output to each input." },
      { term: "Input / output", meaning: "The value you put in (x) and the value you get out (y)." },
      { term: "Vertical line test", meaning: "If a vertical line hits a graph more than once, it is not a function." },
      { term: "Linear function", meaning: "A function whose graph is a straight line; can be written y = mx + b." },
    ],
    topics: [
      {
        id: "g8u3-t1",
        slug: "intro-to-functions",
        title: "Introduction to Functions",
        summary: "A function gives exactly one output for each input.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "One input, one output",
            paragraphs: [
              "A function is like a machine: you put in an input and get exactly one output. If a single input could give two different outputs, it is not a function.",
            ],
          },
          {
            heading: "The vertical line test",
            paragraphs: [
              "On a graph, if you can draw a vertical line that crosses the graph more than once, the relationship is not a function.",
            ],
          },
          {
            example: {
              problem: "Is the set {(1, 2), (3, 4), (1, 5)} a function?",
              solution: [
                "Look at the inputs: 1 appears twice, with outputs 2 and 5.",
                "Since one input has two different outputs, it is not a function.",
              ],
            },
          },
        ],
        video: { videoId: "kvGsIo1TmsM", title: "What Is a Function?", source: "Khan Academy", description: "Inputs, outputs, and what makes a relationship a function." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-function-intro`, title: "Intro to functions", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "g8u3t1-q1",
            prompt: "Which set of ordered pairs is a function?",
            type: "multiple-choice",
            options: ["{(1,2), (1,3), (2,4)}", "{(1,2), (2,3), (3,4)}", "{(2,1), (2,2), (2,3)}", "{(0,1), (0,2)}"],
            answer: "{(1,2), (2,3), (3,4)}",
            explanation: "Each input appears only once, so every input has exactly one output.",
            difficulty: "medium",
          },
          {
            id: "g8u3t1-q2",
            prompt: "If a vertical line crosses a graph at two points, the graph is a function.",
            type: "true-false",
            answer: false,
            explanation: "That fails the vertical line test, so the graph is NOT a function.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g8u3-t2",
        slug: "linear-and-nonlinear-functions",
        title: "Linear & Nonlinear Functions",
        summary: "Tell straight-line functions apart from curved ones.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Linear functions",
            paragraphs: [
              "A linear function graphs as a straight line and can be written as y = mx + b. In a table, the output changes by a constant amount each step.",
            ],
          },
          {
            heading: "Nonlinear functions",
            paragraphs: [
              "Anything that is not a straight line is nonlinear — for example y = x². In a table, the change between outputs is not constant.",
            ],
          },
          {
            callout: {
              label: "Quick check",
              text: "If you can write the rule as y = mx + b (no exponents on x, no x in a denominator), it is linear.",
            },
          },
        ],
        video: { videoId: "OWPVZoxNe-U", title: "Linear and Nonlinear Functions", source: "Khan Academy", description: "Decide whether a relationship can be written as a linear equation." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-linear-equations-functions`, title: "Linear & nonlinear functions", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "g8u3t2-q1",
            prompt: "Which equation represents a linear function?",
            type: "multiple-choice",
            options: ["y = 2x + 1", "y = x²", "y = 3/x", "y = x² - 4"],
            answer: "y = 2x + 1",
            explanation: "y = 2x + 1 is in the form y = mx + b, so its graph is a straight line.",
            difficulty: "easy",
          },
          {
            id: "g8u3t2-q2",
            prompt: "In a linear function's table, the output changes by the same amount for each equal step in the input.",
            type: "true-false",
            answer: true,
            explanation: "A constant rate of change is the hallmark of a linear function.",
            difficulty: "medium",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_8}/cc-8th-function-intro`, title: "Functions practice", source: "Khan Academy" },
      { href: `${KHAN_8}/cc-8th-linear-equations-functions`, title: "Linear equations & functions", source: "Khan Academy" },
    ],
  },

  // ================================================================
  // UNIT 4 — Linear Functions
  // ================================================================
  {
    id: "g8-unit-4",
    number: 4,
    slug: "linear-functions",
    title: "Linear Functions",
    short: "Find slope, use slope-intercept form, and graph and interpret straight-line relationships.",
    description:
      "Dig into linear functions. You'll calculate slope as rise over run, write equations in slope-intercept form (y = mx + b), and graph lines and interpret what the slope and intercept mean.",
    icon: "/",
    estimatedMinutes: 48,
    objectives: [
      "Find the slope of a line from a graph or two points.",
      "Write linear equations in slope-intercept form, y = mx + b.",
      "Graph linear equations using slope and y-intercept.",
      "Interpret slope as a rate of change and the y-intercept as a starting value.",
    ],
    vocabulary: [
      { term: "Slope", meaning: "The steepness of a line: rise over run, or change in y over change in x." },
      { term: "y-intercept", meaning: "Where a line crosses the y-axis; the value of y when x = 0." },
      { term: "Slope-intercept form", meaning: "y = mx + b, where m is the slope and b is the y-intercept." },
      { term: "Rate of change", meaning: "How much one quantity changes for each unit change in another." },
    ],
    topics: [
      {
        id: "g8u4-t1",
        slug: "slope",
        title: "Slope",
        summary: "Measure steepness as rise over run.",
        estimatedMinutes: 24,
        walkthrough: [
          {
            heading: "Rise over run",
            paragraphs: [
              "Slope tells how steep a line is. It is the change in y (rise) divided by the change in x (run).",
            ],
          },
          {
            heading: "Slope from two points",
            steps: [
              "Pick two points (x₁, y₁) and (x₂, y₂).",
              "Slope m = (y₂ − y₁) ÷ (x₂ − x₁).",
            ],
          },
          {
            example: {
              problem: "Find the slope through (1, 2) and (4, 8).",
              solution: [
                "Change in y: 8 − 2 = 6.",
                "Change in x: 4 − 1 = 3.",
                "Slope = 6 ÷ 3 = 2.",
              ],
            },
          },
          {
            callout: {
              label: "Tip",
              text: "A line going up left-to-right has positive slope; going down has negative slope. A flat line has slope 0.",
            },
          },
        ],
        video: { videoId: "R948Tsyq4vA", title: "Finding the Slope of a Line", source: "Khan Academy", description: "Slope as change in y over change in x." },
        extraVideo: { videoId: "WkspBxrzuZo", title: "Slope from Two Points", source: "Khan Academy", description: "Compute slope from a pair of ordered pairs." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-linear-equations-functions`, title: "Slope", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "g8u4t1-q1",
            prompt: "Find the slope through (2, 3) and (6, 11).",
            type: "multiple-choice",
            options: ["2", "4", "1/2", "8"],
            answer: "2",
            explanation: "(11 − 3) ÷ (6 − 2) = 8 ÷ 4 = 2.",
            difficulty: "medium",
          },
          {
            id: "g8u4t1-q2",
            prompt: "A horizontal line has a slope of 0.",
            type: "true-false",
            answer: true,
            explanation: "There is no rise (change in y = 0), so the slope is 0.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g8u4-t2",
        slug: "slope-intercept-form",
        title: "Slope-Intercept Form",
        summary: "Read slope and y-intercept straight from y = mx + b.",
        estimatedMinutes: 24,
        walkthrough: [
          {
            heading: "y = mx + b",
            paragraphs: [
              "In slope-intercept form, m is the slope and b is the y-intercept (where the line crosses the y-axis).",
            ],
          },
          {
            heading: "Graphing from y = mx + b",
            steps: [
              "Plot the y-intercept (0, b) first.",
              "Use the slope as rise over run to plot a second point.",
              "Draw a line through the two points.",
            ],
          },
          {
            example: {
              problem: "Graph y = 2x + 3.",
              solution: [
                "y-intercept is 3, so plot (0, 3).",
                "Slope 2 = 2/1: go up 2 and right 1 to (1, 5).",
                "Draw the line through (0, 3) and (1, 5).",
              ],
            },
          },
        ],
        video: { videoId: "IL3UCuXrUzE", title: "Slope-Intercept Form", source: "Khan Academy", description: "Identify slope and y-intercept and graph the line." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-linear-equations-functions`, title: "Slope-intercept form", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "g8u4t2-q1",
            prompt: "In y = -3x + 5, what is the slope?",
            type: "multiple-choice",
            options: ["5", "-3", "3", "-5"],
            answer: "-3",
            explanation: "In y = mx + b, the slope m is the coefficient of x, which is -3.",
            difficulty: "easy",
          },
          {
            id: "g8u4t2-q2",
            prompt: "In y = 4x - 2, the line crosses the y-axis at -2.",
            type: "true-false",
            answer: true,
            explanation: "The y-intercept b is -2, so the line crosses the y-axis at (0, -2).",
            difficulty: "easy",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_8}/cc-8th-linear-equations-functions`, title: "Linear functions practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/slope.php", title: "Slope worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },

  // ================================================================
  // UNIT 5 — Systems of Equations
  // ================================================================
  {
    id: "g8-unit-5",
    number: 5,
    slug: "systems-of-equations",
    title: "Systems of Equations",
    short: "Find the point that satisfies two equations — by graphing and by algebra.",
    description:
      "A system is two equations at once. You'll solve systems by graphing to find the intersection point, then use algebra (substitution and elimination) for exact answers.",
    icon: "⋂",
    estimatedMinutes: 46,
    objectives: [
      "Understand that a solution to a system makes both equations true.",
      "Solve systems of linear equations by graphing.",
      "Solve systems using substitution and elimination.",
      "Recognize systems with one solution, no solution, or infinitely many.",
    ],
    vocabulary: [
      { term: "System of equations", meaning: "Two or more equations considered together." },
      { term: "Solution of a system", meaning: "The point (x, y) that satisfies every equation." },
      { term: "Substitution", meaning: "Replacing a variable with an equivalent expression to solve." },
      { term: "Elimination", meaning: "Adding or subtracting equations to remove a variable." },
    ],
    topics: [
      {
        id: "g8u5-t1",
        slug: "systems-by-graphing",
        title: "Systems by Graphing",
        summary: "The solution is the point where the two lines cross.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Graph both lines",
            steps: [
              "Write each equation in slope-intercept form if needed.",
              "Graph both lines on the same grid.",
              "The intersection point is the solution.",
            ],
          },
          {
            example: {
              problem: "Where do y = x + 1 and y = -x + 3 intersect?",
              solution: [
                "Graph both lines.",
                "They cross at (1, 2).",
                "Check: 1 + 1 = 2 ✓ and -1 + 3 = 2 ✓.",
              ],
            },
          },
          {
            callout: {
              label: "Special cases",
              text: "Parallel lines never cross → no solution. Identical lines overlap everywhere → infinitely many solutions.",
            },
          },
        ],
        video: { videoId: "Aug8r8qV7W8", title: "Solving a System by Graphing", source: "Other", description: "Graph both lines and read the intersection point." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-systems`, title: "Systems by graphing", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "g8u5t1-q1",
            prompt: "The solution to a system of two lines is found where the lines do what?",
            type: "multiple-choice",
            options: ["Intersect", "Are steepest", "Cross the x-axis", "Have the same y-intercept"],
            answer: "Intersect",
            explanation: "The intersection point satisfies both equations, so it is the solution.",
            difficulty: "easy",
          },
          {
            id: "g8u5t1-q2",
            prompt: "Two parallel lines form a system with no solution.",
            type: "true-false",
            answer: true,
            explanation: "Parallel lines never intersect, so there is no point that satisfies both equations.",
            difficulty: "medium",
          },
        ],
      },
      {
        id: "g8u5-t2",
        slug: "systems-algebraically",
        title: "Solving Systems Algebraically",
        summary: "Use substitution or elimination for exact answers.",
        estimatedMinutes: 24,
        walkthrough: [
          {
            heading: "Substitution",
            steps: [
              "Solve one equation for a variable.",
              "Substitute that expression into the other equation.",
              "Solve, then back-substitute to find the other variable.",
            ],
          },
          {
            example: {
              problem: "Solve y = x + 1 and 2x + y = 7.",
              solution: [
                "Substitute y = x + 1: 2x + (x + 1) = 7.",
                "Combine: 3x + 1 = 7 → 3x = 6 → x = 2.",
                "Then y = 2 + 1 = 3. Solution: (2, 3).",
              ],
            },
          },
          {
            callout: {
              label: "Elimination",
              text: "If you line up the equations, you can add or subtract them to cancel a variable — handy when nothing is solved for y yet.",
            },
          },
        ],
        video: { videoId: "V7H1oUHXPkg", title: "Solving Systems by Substitution", source: "Khan Academy", description: "Substitute one equation into the other to solve." },
        extraVideo: { videoId: "nok99JOhcjo", title: "Systems of Equations (Elimination)", source: "Khan Academy", description: "Add or subtract equations to eliminate a variable." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-systems`, title: "Systems with substitution & elimination", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "g8u5t2-q1",
            prompt: "Solve the system y = 2x and x + y = 9.",
            type: "multiple-choice",
            options: ["(3, 6)", "(6, 3)", "(2, 7)", "(4, 5)"],
            answer: "(3, 6)",
            explanation: "Substitute y = 2x: x + 2x = 9 → 3x = 9 → x = 3, so y = 6.",
            difficulty: "medium",
          },
          {
            id: "g8u5t2-q2",
            prompt: "In substitution, you replace a variable with an equivalent expression from the other equation.",
            type: "true-false",
            answer: true,
            explanation: "That is exactly how the substitution method works.",
            difficulty: "easy",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_8}/cc-8th-systems`, title: "Systems of equations practice", source: "Khan Academy" },
    ],
  },

  // ================================================================
  // UNIT 6 — Transformations & Similarity
  // ================================================================
  {
    id: "g8-unit-6",
    number: 6,
    slug: "transformations-similarity",
    title: "Transformations & Similarity",
    short: "Translations, reflections, rotations, dilations, similarity, and angles from parallel lines.",
    description:
      "Move and resize figures on the coordinate plane. You'll perform rigid transformations, use dilations to create similar figures, and find angles formed when a transversal crosses parallel lines.",
    icon: "▱",
    estimatedMinutes: 64,
    objectives: [
      "Perform translations, reflections, and rotations of figures.",
      "Understand that rigid transformations preserve size and shape (congruence).",
      "Use dilations to create similar figures and find scale factors.",
      "Find angles formed by parallel lines cut by a transversal.",
    ],
    vocabulary: [
      { term: "Rigid transformation", meaning: "A move that keeps size and shape: translation, reflection, or rotation." },
      { term: "Dilation", meaning: "A transformation that resizes a figure by a scale factor." },
      { term: "Similar figures", meaning: "Same shape, possibly different size; angles equal and sides proportional." },
      { term: "Transversal", meaning: "A line that crosses two or more other lines." },
    ],
    topics: [
      {
        id: "g8u6-t1",
        slug: "transformations",
        title: "Transformations",
        summary: "Slide, flip, and turn figures while keeping their size and shape.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Three rigid transformations",
            steps: [
              "Translation: slide every point the same distance and direction.",
              "Reflection: flip across a line (a mirror image).",
              "Rotation: turn around a fixed point.",
            ],
          },
          {
            callout: {
              label: "Key idea",
              text: "Rigid transformations preserve lengths and angles, so the image is congruent to the original.",
            },
          },
          {
            example: {
              problem: "Translate the point (2, 3) right 4 and down 1.",
              solution: [
                "Right 4: x goes from 2 to 6.",
                "Down 1: y goes from 3 to 2.",
                "New point: (6, 2).",
              ],
            },
          },
        ],
        video: { videoId: "XiAoUDfrar0", title: "Introduction to Transformations", source: "Khan Academy", description: "Translations, reflections, and rotations explained." },
        practiceLinks: [
          { href: `${KHAN_8}/geometric-transformations`, title: "Transformations", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/transformation.php", title: "Transformation worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g8u6t1-q1",
            prompt: "Which transformation is NOT rigid (does not preserve size)?",
            type: "multiple-choice",
            options: ["Translation", "Reflection", "Rotation", "Dilation"],
            answer: "Dilation",
            explanation: "A dilation resizes a figure, so it does not preserve size. The other three are rigid.",
            difficulty: "medium",
          },
          {
            id: "g8u6t1-q2",
            prompt: "A reflection produces a mirror image of a figure.",
            type: "true-false",
            answer: true,
            explanation: "A reflection flips the figure across a line, creating a mirror image.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g8u6-t2",
        slug: "dilations-similarity",
        title: "Dilations & Similarity",
        summary: "Resize figures by a scale factor to make similar shapes.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Dilations resize",
            paragraphs: [
              "A dilation multiplies the distance of each point from the center by the scale factor. Scale factor > 1 enlarges; between 0 and 1 shrinks.",
            ],
          },
          {
            heading: "Similar figures",
            paragraphs: [
              "Similar figures have equal corresponding angles and proportional corresponding sides. A dilation always produces a figure similar to the original.",
            ],
          },
          {
            example: {
              problem: "A point is at (4, 6). Dilate by a scale factor of 1/2 centered at the origin.",
              solution: [
                "Multiply each coordinate by 1/2.",
                "New point: (2, 3).",
              ],
            },
          },
        ],
        video: { videoId: "qlWZJ21O63s", title: "Dilating Shapes", source: "Khan Academy", description: "Scale a figure from the origin using a scale factor." },
        practiceLinks: [
          { href: `${KHAN_8}/geometric-transformations`, title: "Dilations & similarity", source: "Khan Academy" },
        ],
        quiz: [
          {
            id: "g8u6t2-q1",
            prompt: "Dilate (10, 4) by a scale factor of 1/2 from the origin. What is the image?",
            type: "multiple-choice",
            options: ["(5, 2)", "(20, 8)", "(10, 2)", "(5, 4)"],
            answer: "(5, 2)",
            explanation: "Multiply both coordinates by 1/2: (10 × 1/2, 4 × 1/2) = (5, 2).",
            difficulty: "medium",
          },
          {
            id: "g8u6t2-q2",
            prompt: "Similar figures have the same shape but may be different sizes.",
            type: "true-false",
            answer: true,
            explanation: "Similar figures have equal angles and proportional sides, so the same shape at a possibly different size.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g8u6-t3",
        slug: "angles-parallel-lines",
        title: "Angles & Parallel Lines",
        summary: "Find angle measures when a transversal crosses parallel lines.",
        estimatedMinutes: 20,
        walkthrough: [
          {
            heading: "When a transversal crosses parallel lines",
            steps: [
              "Corresponding angles are equal.",
              "Alternate interior angles are equal.",
              "Same-side interior angles are supplementary (add to 180°).",
            ],
          },
          {
            example: {
              problem: "Two parallel lines are cut by a transversal. One angle is 65°. Find its corresponding angle.",
              solution: [
                "Corresponding angles are equal.",
                "So the corresponding angle is also 65°.",
              ],
            },
          },
          {
            callout: {
              label: "Tip",
              text: "The angles in a triangle add to 180°. This connects to parallel-line angle facts in many problems.",
            },
          },
        ],
        video: { videoId: "gRKZaojKeP0", title: "Angles, Parallel Lines & Transversals", source: "Khan Academy", description: "Corresponding and alternate angle relationships." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-geometry`, title: "Angle relationships", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/angles.php", title: "Angles worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g8u6t3-q1",
            prompt: "Parallel lines are cut by a transversal. An angle measures 110°. Its alternate interior angle is:",
            type: "multiple-choice",
            options: ["70°", "110°", "20°", "180°"],
            answer: "110°",
            explanation: "Alternate interior angles are equal when lines are parallel.",
            difficulty: "medium",
          },
          {
            id: "g8u6t3-q2",
            prompt: "The interior angles of a triangle add up to 180°.",
            type: "true-false",
            answer: true,
            explanation: "Every triangle's three interior angles sum to 180°.",
            difficulty: "easy",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_8}/geometric-transformations`, title: "Transformations & similarity practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/transformation.php", title: "Transformation worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },

  // ================================================================
  // UNIT 7 — Pythagorean Theorem & Volume
  // ================================================================
  {
    id: "g8-unit-7",
    number: 7,
    slug: "pythagorean-volume",
    title: "Pythagorean Theorem & Volume",
    short: "Use a² + b² = c² for right triangles and find the volume of cylinders, cones, and spheres.",
    description:
      "Apply what you know about exponents and roots to geometry. You'll use the Pythagorean theorem to find missing sides of right triangles and compute the volume of cylinders, cones, and spheres.",
    icon: "△",
    estimatedMinutes: 44,
    objectives: [
      "Use the Pythagorean theorem to find a missing side of a right triangle.",
      "Determine whether a triangle is a right triangle.",
      "Find the volume of cylinders, cones, and spheres.",
      "Solve real-world problems with these formulas.",
    ],
    vocabulary: [
      { term: "Hypotenuse", meaning: "The longest side of a right triangle, opposite the right angle." },
      { term: "Legs", meaning: "The two shorter sides of a right triangle that form the right angle." },
      { term: "Cylinder", meaning: "A solid with two circular bases; volume V = πr²h." },
      { term: "Sphere", meaning: "A perfectly round solid; volume V = (4/3)πr³." },
    ],
    topics: [
      {
        id: "g8u7-t1",
        slug: "pythagorean-theorem",
        title: "The Pythagorean Theorem",
        summary: "For a right triangle, a² + b² = c².",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "The relationship",
            paragraphs: [
              "For any right triangle with legs a and b and hypotenuse c (the side opposite the right angle): a² + b² = c².",
            ],
          },
          {
            example: {
              problem: "A right triangle has legs 3 and 4. Find the hypotenuse.",
              solution: [
                "a² + b² = c²: 3² + 4² = c².",
                "9 + 16 = 25, so c² = 25.",
                "c = √25 = 5.",
              ],
            },
          },
          {
            callout: {
              label: "Watch out",
              text: "The hypotenuse (c) is always the longest side and is opposite the right angle. Don't put a leg in the c spot.",
            },
          },
        ],
        video: { videoId: "WqhlG3Vakw8", title: "The Pythagorean Theorem", source: "Math Antics", description: "Use a² + b² = c² to find a missing side." },
        extraVideo: { videoId: "AA6RfgP-AHU", title: "Pythagorean Theorem Intro", source: "Khan Academy", description: "Another walk-through of the theorem with examples." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-geometry`, title: "Pythagorean theorem", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/pythagorean-theorem.php", title: "Pythagorean theorem worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g8u7t1-q1",
            prompt: "A right triangle has legs 6 and 8. What is the hypotenuse?",
            type: "multiple-choice",
            options: ["10", "14", "12", "48"],
            answer: "10",
            explanation: "6² + 8² = 36 + 64 = 100, and √100 = 10.",
            difficulty: "easy",
          },
          {
            id: "g8u7t1-q2",
            prompt: "In a² + b² = c², the variable c stands for the hypotenuse.",
            type: "true-false",
            answer: true,
            explanation: "c is always the hypotenuse, the side opposite the right angle.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "g8u7-t2",
        slug: "volume-cylinders-cones-spheres",
        title: "Volume of Cylinders, Cones & Spheres",
        summary: "Apply the three key volume formulas with π.",
        estimatedMinutes: 22,
        walkthrough: [
          {
            heading: "Three formulas",
            steps: [
              "Cylinder: V = πr²h.",
              "Cone: V = (1/3)πr²h — a third of a cylinder with the same base and height.",
              "Sphere: V = (4/3)πr³.",
            ],
          },
          {
            example: {
              problem: "Find the volume of a cylinder with radius 3 and height 5 (use π ≈ 3.14).",
              solution: [
                "V = πr²h = 3.14 × 3² × 5.",
                "= 3.14 × 9 × 5 = 141.3 cubic units.",
              ],
            },
          },
          {
            callout: {
              label: "Tip",
              text: "A cone holds exactly one-third of the cylinder with the same base and height — that's where the 1/3 comes from.",
            },
          },
        ],
        video: { videoId: "gL3HxBQyeg0", title: "Cylinder Volume & Surface Area", source: "Khan Academy", description: "Find the volume of a cylinder using V = πr²h." },
        practiceLinks: [
          { href: `${KHAN_8}/cc-8th-geometry`, title: "Volume of cylinders, cones & spheres", source: "Khan Academy" },
          { href: "https://www.mathworksheets4kids.com/volume.php", title: "Volume worksheets", source: "Math Worksheets 4 Kids" },
        ],
        quiz: [
          {
            id: "g8u7t2-q1",
            prompt: "Which formula gives the volume of a sphere?",
            type: "multiple-choice",
            options: ["V = πr²h", "V = (4/3)πr³", "V = (1/3)πr²h", "V = 2πr"],
            answer: "V = (4/3)πr³",
            explanation: "The volume of a sphere is (4/3)πr³.",
            difficulty: "medium",
          },
          {
            id: "g8u7t2-q2",
            prompt: "A cone has one-third the volume of a cylinder with the same base and height.",
            type: "true-false",
            answer: true,
            explanation: "That's why the cone formula has a factor of 1/3.",
            difficulty: "medium",
          },
        ],
      },
    ],
    externalPractice: [
      { href: `${KHAN_8}/cc-8th-geometry`, title: "Grade 8 geometry practice", source: "Khan Academy" },
      { href: "https://www.mathworksheets4kids.com/pythagorean-theorem.php", title: "Pythagorean theorem worksheets", source: "Math Worksheets 4 Kids" },
      { href: "https://www.mathworksheets4kids.com/volume.php", title: "Volume worksheets", source: "Math Worksheets 4 Kids" },
    ],
  },
];
