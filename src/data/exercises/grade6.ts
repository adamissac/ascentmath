export const TOPIC_EXERCISES_GRADE_6: Record<string, import("../units").PracticeExercise[]> = {
  "u1-t1": [
    {
      id: "u1-t1-e1",
      problem: "List all the factors of 24.",
      hint: "Find every whole number that divides 24 with no remainder.",
      steps: [
        "Test divisors starting at 1: 24 ÷ 1 = 24, 24 ÷ 2 = 12, 24 ÷ 3 = 8, 24 ÷ 4 = 6.",
        "Also 24 ÷ 6 = 4, 24 ÷ 8 = 3, 24 ÷ 12 = 2, 24 ÷ 24 = 1.",
        "The factors are 1, 2, 3, 4, 6, 8, 12, and 24.",
      ],
      answer: "1, 2, 3, 4, 6, 8, 12, 24",
      difficulty: "easy",
    },
    {
      id: "u1-t1-e2",
      problem: "What is the GCF of 30 and 45?",
      hint: "List factors of each number and pick the largest one they share.",
      steps: [
        "Factors of 30: 1, 2, 3, 5, 6, 10, 15, 30.",
        "Factors of 45: 1, 3, 5, 9, 15, 45.",
        "Shared factors: 1, 3, 5, 15. The greatest is 15.",
      ],
      answer: "15",
      difficulty: "medium",
    },
    {
      id: "u1-t1-e3",
      problem: "What is the LCM of 9 and 12?",
      hint: "Skip-count by each number until you find the first value in both lists.",
      steps: [
        "Multiples of 9: 9, 18, 27, 36, 45…",
        "Multiples of 12: 12, 24, 36, 48…",
        "The first number in both lists is 36.",
      ],
      answer: "36",
      difficulty: "medium",
    },
    {
      id: "u1-t1-e4",
      problem: "Find the GCF of 48 and 72 using prime factorization.",
      hint: "Write each number as a product of primes, then multiply the common primes with the smallest exponents.",
      steps: [
        "48 = 2⁴ × 3 and 72 = 2³ × 3².",
        "Common primes: 2 and 3. Use 2³ and 3¹.",
        "GCF = 2³ × 3 = 8 × 3 = 24.",
      ],
      answer: "24",
      difficulty: "hard",
    },
    {
      id: "u1-t1-e5",
      problem: "Two buses leave a station at the same time. Bus A returns every 8 minutes and Bus B every 12 minutes. After how many minutes will they both be at the station again at the same time?",
      hint: "This is an LCM situation: find the smallest time both intervals fit into.",
      steps: [
        "Multiples of 8: 8, 16, 24, 32…",
        "Multiples of 12: 12, 24, 36…",
        "LCM(8, 12) = 24 minutes.",
      ],
      answer: "24 minutes",
      difficulty: "hard",
    },
  ],
  "u1-t2": [
    {
      id: "u1-t2-e1",
      problem: "What is 3/8 + 1/8?",
      steps: [
        "The denominators already match.",
        "Add the numerators: 3 + 1 = 4.",
        "Keep the denominator: 4/8, which simplifies to 1/2.",
      ],
      answer: "1/2",
      difficulty: "easy",
    },
    {
      id: "u1-t2-e2",
      problem: "What is 5/6 − 1/3?",
      hint: "Rewrite 1/3 with denominator 6 before subtracting.",
      steps: [
        "1/3 = 2/6.",
        "5/6 − 2/6 = 3/6.",
        "Simplify: 3/6 = 1/2.",
      ],
      answer: "1/2",
      difficulty: "easy",
    },
    {
      id: "u1-t2-e3",
      problem: "What is 2/5 + 1/4?",
      hint: "The LCM of 5 and 4 is 20.",
      steps: [
        "Rewrite: 2/5 = 8/20 and 1/4 = 5/20.",
        "8/20 + 5/20 = 13/20.",
        "13/20 is already in simplest form.",
      ],
      answer: "13/20",
      difficulty: "medium",
    },
    {
      id: "u1-t2-e4",
      problem: "Mia had 7/8 of a pizza. She ate 1/6 of a pizza. How much pizza is left?",
      steps: [
        "Subtract: 7/8 − 1/6. Common denominator is 24.",
        "7/8 = 21/24 and 1/6 = 4/24.",
        "21/24 − 4/24 = 17/24 of a pizza left.",
      ],
      answer: "17/24",
      difficulty: "medium",
    },
    {
      id: "u1-t2-e5",
      problem: "What is 2 1/3 − 1 5/6?",
      hint: "Convert mixed numbers to improper fractions first.",
      steps: [
        "2 1/3 = 7/3 and 1 5/6 = 11/6.",
        "Common denominator 6: 7/3 = 14/6.",
        "14/6 − 11/6 = 3/6 = 1/2.",
      ],
      answer: "1/2",
      difficulty: "hard",
    },
  ],
  "u1-t3": [
    {
      id: "u1-t3-e1",
      problem: "What is 2/5 × 3/7?",
      steps: [
        "Multiply numerators: 2 × 3 = 6.",
        "Multiply denominators: 5 × 7 = 35.",
        "The product is 6/35.",
      ],
      answer: "6/35",
      difficulty: "easy",
    },
    {
      id: "u1-t3-e2",
      problem: "What is 4/9 ÷ 2/3?",
      hint: "Keep-change-flip: keep 4/9, change ÷ to ×, flip 2/3 to 3/2.",
      steps: [
        "4/9 × 3/2 = 12/18.",
        "Simplify by dividing numerator and denominator by 6: 2/3.",
      ],
      answer: "2/3",
      difficulty: "medium",
    },
    {
      id: "u1-t3-e3",
      problem: "What is 3/4 × 8?",
      hint: "Write 8 as 8/1, then multiply across.",
      steps: [
        "3/4 × 8/1 = 24/4.",
        "24 ÷ 4 = 6.",
      ],
      answer: "6",
      difficulty: "easy",
    },
    {
      id: "u1-t3-e4",
      problem: "A recipe uses 2/3 cup of flour. You want to make half the recipe. How much flour do you need?",
      steps: [
        "Half of 2/3 means multiply by 1/2.",
        "2/3 × 1/2 = 2/6 = 1/3 cup.",
      ],
      answer: "1/3 cup",
      difficulty: "medium",
    },
    {
      id: "u1-t3-e5",
      problem: "What is 1 2/3 ÷ 2 1/2?",
      hint: "Convert both mixed numbers to improper fractions before dividing.",
      steps: [
        "1 2/3 = 5/3 and 2 1/2 = 5/2.",
        "5/3 ÷ 5/2 = 5/3 × 2/5 = 10/15 = 2/3.",
      ],
      answer: "2/3",
      difficulty: "hard",
    },
  ],
  "u1-t4": [
    {
      id: "u1-t4-e1",
      problem: "What is 3.6 + 2.47?",
      hint: "Line up the decimal points and add.",
      steps: [
        "Write as 3.60 + 2.47.",
        "Add hundredths, tenths, and ones: 6.07.",
      ],
      answer: "6.07",
      difficulty: "easy",
    },
    {
      id: "u1-t4-e2",
      problem: "What is 8.2 − 5.75?",
      steps: [
        "Line up decimals: 8.20 − 5.75.",
        "Subtract: 2.45.",
      ],
      answer: "2.45",
      difficulty: "easy",
    },
    {
      id: "u1-t4-e3",
      problem: "What is 1.5 × 0.4?",
      hint: "Multiply 15 × 4 first, then count decimal places.",
      steps: [
        "15 × 4 = 60.",
        "Two decimal places total → 0.60 = 0.6.",
      ],
      answer: "0.6",
      difficulty: "medium",
    },
    {
      id: "u1-t4-e4",
      problem: "What is 0.25 × 3.2?",
      steps: [
        "25 × 32 = 800.",
        "Three decimal places total → 0.800 = 0.8.",
      ],
      answer: "0.8",
      difficulty: "medium",
    },
    {
      id: "u1-t4-e5",
      problem: "You buy 3 notebooks at $2.35 each. How much do you pay in total?",
      steps: [
        "Multiply: 3 × 2.35.",
        "3 × 2.35 = 7.05.",
      ],
      answer: "$7.05",
      difficulty: "hard",
    },
  ],
  "u2-t1": [
    {
      id: "u2-t1-e1",
      problem: "A class has 12 boys and 15 girls. Write the ratio of boys to girls.",
      hint: "Keep the order the problem gives: boys first.",
      steps: [
        "Boys : girls = 12 : 15.",
        "You can also write 12/15, which simplifies to 4/5.",
      ],
      answer: "12:15 (or 4:5)",
      difficulty: "easy",
    },
    {
      id: "u2-t1-e2",
      problem: "Are the ratios 3:5 and 12:20 equivalent?",
      steps: [
        "Multiply 3:5 by 4: 3 × 4 = 12 and 5 × 4 = 20.",
        "12:20 matches, so they are equivalent.",
      ],
      answer: "Yes",
      difficulty: "easy",
    },
    {
      id: "u2-t1-e3",
      problem: "Simplify the ratio 18:24 to lowest terms.",
      steps: [
        "Find the GCF of 18 and 24, which is 6.",
        "Divide both parts by 6: 18 ÷ 6 = 3 and 24 ÷ 6 = 4.",
        "The simplified ratio is 3:4.",
      ],
      answer: "3:4",
      difficulty: "medium",
    },
    {
      id: "u2-t1-e4",
      problem: "A paint mix uses 2 parts blue to 5 parts white. How much blue do you need for 15 parts white?",
      hint: "Set up a proportion: 2/5 = x/15.",
      steps: [
        "2/5 = x/15. Cross-multiply: 5x = 30.",
        "x = 6 parts blue.",
      ],
      answer: "6 parts blue",
      difficulty: "medium",
    },
    {
      id: "u2-t1-e5",
      problem: "The ratio of red marbles to blue marbles is 7:3. There are 35 red marbles. How many blue marbles are there?",
      steps: [
        "7 parts red correspond to 35 marbles, so 1 part = 35 ÷ 7 = 5.",
        "Blue has 3 parts: 3 × 5 = 15 blue marbles.",
      ],
      answer: "15",
      difficulty: "hard",
    },
  ],
  "u2-t2": [
    {
      id: "u2-t2-e1",
      problem: "A runner goes 10 miles in 2 hours. What is the unit rate in miles per hour?",
      steps: [
        "Write the rate: 10 miles / 2 hours.",
        "Divide: 10 ÷ 2 = 5.",
        "The unit rate is 5 miles per hour.",
      ],
      answer: "5 mph",
      difficulty: "easy",
    },
    {
      id: "u2-t2-e2",
      problem: "6 oranges cost $4.50. What is the cost per orange?",
      steps: [
        "Unit rate: $4.50 ÷ 6 = $0.75 per orange.",
      ],
      answer: "$0.75 per orange",
      difficulty: "easy",
    },
    {
      id: "u2-t2-e3",
      problem: "A printer makes 240 pages in 8 minutes. How many pages per minute?",
      steps: [
        "240 ÷ 8 = 30 pages per minute.",
      ],
      answer: "30 pages per minute",
      difficulty: "medium",
    },
    {
      id: "u2-t2-e4",
      problem: "Store A sells 5 notebooks for $6. Store B sells 8 notebooks for $9.60. Which store has the better unit price?",
      hint: "Find dollars per notebook at each store and compare.",
      steps: [
        "Store A: $6 ÷ 5 = $1.20 per notebook.",
        "Store B: $9.60 ÷ 8 = $1.20 per notebook.",
        "The unit prices are the same.",
      ],
      answer: "Same price ($1.20 each)",
      difficulty: "medium",
    },
    {
      id: "u2-t2-e5",
      problem: "A car uses 14 gallons of gas to drive 392 miles. How far can it drive on 1 gallon?",
      steps: [
        "Unit rate: 392 ÷ 14 = 28 miles per gallon.",
      ],
      answer: "28 miles per gallon",
      difficulty: "hard",
    },
  ],
  "u2-t3": [
    {
      id: "u2-t3-e1",
      problem: "Solve the proportion: 2/7 = x/21.",
      hint: "Cross-multiply to find x.",
      steps: [
        "2 × 21 = 7 × x → 42 = 7x.",
        "Divide by 7: x = 6.",
      ],
      answer: "6",
      difficulty: "easy",
    },
    {
      id: "u2-t3-e2",
      problem: "If 4 pencils cost $3, how much do 10 pencils cost?",
      steps: [
        "Unit price: $3 ÷ 4 = $0.75 per pencil.",
        "10 × $0.75 = $7.50.",
      ],
      answer: "$7.50",
      difficulty: "easy",
    },
    {
      id: "u2-t3-e3",
      problem: "A map scale is 1 inch = 15 miles. Two towns are 4.5 inches apart on the map. How many miles apart are they?",
      steps: [
        "Multiply: 4.5 × 15 = 67.5 miles.",
      ],
      answer: "67.5 miles",
      difficulty: "medium",
    },
    {
      id: "u2-t3-e4",
      problem: "Solve: 5/8 = 15/x.",
      steps: [
        "Cross-multiply: 5x = 8 × 15 = 120.",
        "x = 120 ÷ 5 = 24.",
      ],
      answer: "24",
      difficulty: "medium",
    },
    {
      id: "u2-t3-e5",
      problem: "A recipe for 6 servings uses 2 cups of rice. How many cups are needed for 15 servings?",
      steps: [
        "Set up 2/6 = x/15. Cross-multiply: 6x = 30.",
        "x = 5 cups of rice.",
      ],
      answer: "5 cups",
      difficulty: "hard",
    },
  ],
  "u3-t1": [
    {
      id: "u3-t1-e1",
      problem: "Evaluate: 5².",
      steps: [
        "5² means 5 × 5.",
        "5 × 5 = 25.",
      ],
      answer: "25",
      difficulty: "easy",
    },
    {
      id: "u3-t1-e2",
      problem: "Evaluate: 2 + 3² × 2.",
      hint: "Exponents before multiplication; multiplication before addition.",
      steps: [
        "Exponent first: 3² = 9.",
        "Multiply: 9 × 2 = 18.",
        "Add: 2 + 18 = 20.",
      ],
      answer: "20",
      difficulty: "medium",
    },
    {
      id: "u3-t1-e3",
      problem: "Evaluate: (8 − 3)² ÷ 5.",
      steps: [
        "Parentheses: 8 − 3 = 5.",
        "Exponent: 5² = 25.",
        "Divide: 25 ÷ 5 = 5.",
      ],
      answer: "5",
      difficulty: "medium",
    },
    {
      id: "u3-t1-e4",
      problem: "Evaluate: 48 ÷ 6 × 2 + 1.",
      hint: "Multiplication and division go left to right.",
      steps: [
        "48 ÷ 6 = 8.",
        "8 × 2 = 16.",
        "16 + 1 = 17.",
      ],
      answer: "17",
      difficulty: "medium",
    },
    {
      id: "u3-t1-e5",
      problem: "Evaluate: 4 × (2 + 3)² − 10.",
      steps: [
        "Parentheses: 2 + 3 = 5.",
        "Exponent: 5² = 25.",
        "Multiply: 4 × 25 = 100.",
        "Subtract: 100 − 10 = 90.",
      ],
      answer: "90",
      difficulty: "hard",
    },
  ],
  "u3-t2": [
    {
      id: "u3-t2-e1",
      problem: "Write an expression for \"a number plus 11.\"",
      steps: [
        "Use a variable for the number, such as n.",
        "Plus 11 gives n + 11.",
      ],
      answer: "n + 11",
      difficulty: "easy",
    },
    {
      id: "u3-t2-e2",
      problem: "Write an expression for \"7 less than a number.\"",
      hint: "Start with the number, then subtract 7.",
      steps: [
        "Let the number be x.",
        "\"7 less than\" means x − 7, not 7 − x.",
      ],
      answer: "x − 7",
      difficulty: "easy",
    },
    {
      id: "u3-t2-e3",
      problem: "Evaluate 4a − 6 when a = 5.",
      steps: [
        "Substitute: 4(5) − 6.",
        "Multiply: 20 − 6 = 14.",
      ],
      answer: "14",
      difficulty: "medium",
    },
    {
      id: "u3-t2-e4",
      problem: "Write an expression for \"twice a number, decreased by 3.\"",
      steps: [
        "Twice a number is 2n.",
        "Decreased by 3 means subtract 3: 2n − 3.",
      ],
      answer: "2n − 3",
      difficulty: "medium",
    },
    {
      id: "u3-t2-e5",
      problem: "Evaluate 3(x + 2) − x when x = 4.",
      steps: [
        "Substitute: 3(4 + 2) − 4 = 3(6) − 4.",
        "Multiply: 18 − 4 = 14.",
      ],
      answer: "14",
      difficulty: "hard",
    },
  ],
  "u3-t3": [
    {
      id: "u3-t3-e1",
      problem: "Use the distributive property to expand: 5(y + 2).",
      steps: [
        "Multiply 5 by each term inside: 5·y + 5·2.",
        "Result: 5y + 10.",
      ],
      answer: "5y + 10",
      difficulty: "easy",
    },
    {
      id: "u3-t3-e2",
      problem: "Simplify: 4x + 7 + 2x.",
      steps: [
        "Combine like terms with x: 4x + 2x = 6x.",
        "Keep the constant: 6x + 7.",
      ],
      answer: "6x + 7",
      difficulty: "easy",
    },
    {
      id: "u3-t3-e3",
      problem: "Simplify: 3(2m − 4) + m.",
      steps: [
        "Distribute: 6m − 12 + m.",
        "Combine like terms: 7m − 12.",
      ],
      answer: "7m − 12",
      difficulty: "medium",
    },
    {
      id: "u3-t3-e4",
      problem: "Simplify: 8a − 3 + 2a + 9 − a.",
      steps: [
        "Combine a terms: 8a + 2a − a = 9a.",
        "Combine constants: −3 + 9 = 6.",
        "Result: 9a + 6.",
      ],
      answer: "9a + 6",
      difficulty: "medium",
    },
    {
      id: "u3-t3-e5",
      problem: "Simplify: 2(3x − 5) − 4(x + 1).",
      steps: [
        "Distribute: 6x − 10 − 4x − 4.",
        "Combine like terms: 2x − 14.",
      ],
      answer: "2x − 14",
      difficulty: "hard",
    },
  ],
  "u4-t1": [
    {
      id: "u4-t1-e1",
      problem: "Solve for x: x + 9 = 17.",
      steps: [
        "Subtract 9 from both sides.",
        "x = 17 − 9 = 8.",
      ],
      answer: "8",
      difficulty: "easy",
    },
    {
      id: "u4-t1-e2",
      problem: "Solve for n: n − 6 = 11.",
      steps: [
        "Add 6 to both sides.",
        "n = 11 + 6 = 17.",
      ],
      answer: "17",
      difficulty: "easy",
    },
    {
      id: "u4-t1-e3",
      problem: "Solve for y: 4y = 28.",
      steps: [
        "Divide both sides by 4.",
        "y = 28 ÷ 4 = 7.",
      ],
      answer: "7",
      difficulty: "medium",
    },
    {
      id: "u4-t1-e4",
      problem: "Solve for m: m/5 = 9.",
      steps: [
        "Multiply both sides by 5.",
        "m = 9 × 5 = 45.",
      ],
      answer: "45",
      difficulty: "medium",
    },
    {
      id: "u4-t1-e5",
      problem: "After buying a $12 book, Maya has $23 left. Write and solve an equation for how much money m she started with.",
      steps: [
        "Equation: m − 12 = 23.",
        "Add 12 to both sides: m = 35.",
        "Check: 35 − 12 = 23.",
      ],
      answer: "35",
      difficulty: "hard",
    },
  ],
  "u4-t2": [
    {
      id: "u4-t2-e1",
      problem: "Solve: x + 4 > 11. Write the solution as an inequality.",
      steps: [
        "Subtract 4 from both sides.",
        "x > 7.",
      ],
      answer: "x > 7",
      difficulty: "easy",
    },
    {
      id: "u4-t2-e2",
      problem: "Which inequality means \"x is at least 12\"?",
      steps: [
        "\"At least\" includes 12 and all greater values.",
        "That is x ≥ 12.",
      ],
      answer: "x ≥ 12",
      difficulty: "easy",
    },
    {
      id: "u4-t2-e3",
      problem: "Solve: 3n ≤ 18.",
      steps: [
        "Divide both sides by 3.",
        "n ≤ 6.",
      ],
      answer: "n ≤ 6",
      difficulty: "medium",
    },
    {
      id: "u4-t2-e4",
      problem: "You must be at least 48 inches tall to ride. Write an inequality for height h.",
      hint: "\"At least\" uses ≥.",
      steps: [
        "Height must be 48 or more.",
        "h ≥ 48.",
      ],
      answer: "h ≥ 48",
      difficulty: "medium",
    },
    {
      id: "u4-t2-e5",
      problem: "Solve: 2x − 5 < 13.",
      steps: [
        "Add 5 to both sides: 2x < 18.",
        "Divide by 2: x < 9.",
      ],
      answer: "x < 9",
      difficulty: "hard",
    },
  ],
  "u4-t3": [
    {
      id: "u4-t3-e1",
      problem: "In the equation d = 5t, which variable is independent and which is dependent?",
      steps: [
        "t is the input you choose (time).",
        "d depends on t (distance), so t is independent and d is dependent.",
      ],
      answer: "t independent, d dependent",
      difficulty: "easy",
    },
    {
      id: "u4-t3-e2",
      problem: "A gym charges $25 per month plus a $10 sign-up fee. Write an equation for total cost C after m months.",
      steps: [
        "$25 per month → 25m.",
        "Plus one-time $10 fee: C = 25m + 10.",
      ],
      answer: "C = 25m + 10",
      difficulty: "medium",
    },
    {
      id: "u4-t3-e3",
      problem: "You earn $12 per hour. Complete the table: 0 h → $0, 3 h → ?, 5 h → ?",
      steps: [
        "Equation: earnings = 12 × hours.",
        "3 hours: 12 × 3 = 36. 5 hours: 12 × 5 = 60.",
      ],
      answer: "$36 and $60",
      difficulty: "medium",
    },
    {
      id: "u4-t3-e4",
      problem: "A taxi charges $3 plus $2 per mile. Which is the independent variable in c = 2m + 3?",
      steps: [
        "m represents miles, which you choose.",
        "c (cost) depends on m, so m is independent.",
      ],
      answer: "m (miles)",
      difficulty: "easy",
    },
    {
      id: "u4-t3-e5",
      problem: "A plant grows 2 cm per week. It starts at 5 cm tall. Write an equation for height h after w weeks and find h when w = 6.",
      steps: [
        "h = 2w + 5.",
        "When w = 6: h = 2(6) + 5 = 17 cm.",
      ],
      answer: "h = 2w + 5; 17 cm",
      difficulty: "hard",
    },
  ],
  "u5-t1": [
    {
      id: "u5-t1-e1",
      problem: "Find the area of a rectangle 9 cm long and 4 cm wide.",
      steps: [
        "A = length × width.",
        "A = 9 × 4 = 36 cm².",
      ],
      answer: "36 cm²",
      difficulty: "easy",
    },
    {
      id: "u5-t1-e2",
      problem: "Find the area of a triangle with base 8 m and height 5 m.",
      steps: [
        "A = ½ × base × height.",
        "A = ½ × 8 × 5 = 20 m².",
      ],
      answer: "20 m²",
      difficulty: "easy",
    },
    {
      id: "u5-t1-e3",
      problem: "Find the area of a parallelogram with base 12 in and height 7 in.",
      hint: "Use base × height (perpendicular height).",
      steps: [
        "A = base × height = 12 × 7.",
        "A = 84 in².",
      ],
      answer: "84 in²",
      difficulty: "medium",
    },
    {
      id: "u5-t1-e4",
      problem: "A trapezoid has parallel sides 6 cm and 10 cm and height 4 cm. Find its area.",
      steps: [
        "A = ½ × (b₁ + b₂) × h.",
        "A = ½ × (6 + 10) × 4 = ½ × 16 × 4 = 32 cm².",
      ],
      answer: "32 cm²",
      difficulty: "medium",
    },
    {
      id: "u5-t1-e5",
      problem: "A triangle has area 54 ft² and base 12 ft. Find the height.",
      steps: [
        "54 = ½ × 12 × h → 54 = 6h.",
        "h = 54 ÷ 6 = 9 ft.",
      ],
      answer: "9 ft",
      difficulty: "hard",
    },
  ],
  "u5-t2": [
    {
      id: "u5-t2-e1",
      problem: "An L-shape is a 10 × 6 rectangle with a 4 × 3 corner removed. Find the area.",
      steps: [
        "Whole rectangle: 10 × 6 = 60.",
        "Cut-out: 4 × 3 = 12.",
        "60 − 12 = 48 square units.",
      ],
      answer: "48 square units",
      difficulty: "medium",
    },
    {
      id: "u5-t2-e2",
      problem: "A figure is made of a 5 × 8 rectangle topped by a triangle with base 5 and height 3. Find the total area.",
      steps: [
        "Rectangle: 5 × 8 = 40.",
        "Triangle: ½ × 5 × 3 = 7.5.",
        "Total: 40 + 7.5 = 47.5 square units.",
      ],
      answer: "47.5 square units",
      difficulty: "medium",
    },
    {
      id: "u5-t2-e3",
      problem: "A 12 × 9 poster has a 6 × 4 rectangular hole cut in the center. Find the remaining area.",
      steps: [
        "Outer area: 12 × 9 = 108.",
        "Hole: 6 × 4 = 24.",
        "108 − 24 = 84 square units.",
      ],
      answer: "84 square units",
      difficulty: "easy",
    },
    {
      id: "u5-t2-e4",
      problem: "Split a T-shape into two rectangles: top 8 × 2 and stem 3 × 6. Find the total area.",
      steps: [
        "Top: 8 × 2 = 16.",
        "Stem: 3 × 6 = 18.",
        "16 + 18 = 34 square units.",
      ],
      answer: "34 square units",
      difficulty: "easy",
    },
    {
      id: "u5-t2-e5",
      problem: "A room is 15 ft by 12 ft with a 5 ft by 4 ft closet cut out. How much floor area needs carpet?",
      steps: [
        "Full floor: 15 × 12 = 180 ft².",
        "Closet: 5 × 4 = 20 ft².",
        "Carpet area: 180 − 20 = 160 ft².",
      ],
      answer: "160 ft²",
      difficulty: "hard",
    },
  ],
  "u5-t3": [
    {
      id: "u5-t3-e1",
      problem: "Find the volume of a rectangular prism 6 cm × 4 cm × 3 cm.",
      steps: [
        "V = length × width × height.",
        "V = 6 × 4 × 3 = 72 cm³.",
      ],
      answer: "72 cm³",
      difficulty: "easy",
    },
    {
      id: "u5-t3-e2",
      problem: "A box is 5 in × 5 in × 2 in. Find its volume.",
      steps: [
        "V = 5 × 5 × 2 = 50 in³.",
      ],
      answer: "50 in³",
      difficulty: "easy",
    },
    {
      id: "u5-t3-e3",
      problem: "A cube has edge length 4 cm. Find its volume and surface area.",
      steps: [
        "Volume: 4³ = 64 cm³.",
        "One face: 4 × 4 = 16 cm². Six faces: 6 × 16 = 96 cm².",
      ],
      answer: "64 cm³; 96 cm² surface area",
      difficulty: "medium",
    },
    {
      id: "u5-t3-e4",
      problem: "A prism has volume 120 m³. The base is 10 m². Find the height.",
      steps: [
        "V = base area × height.",
        "120 = 10 × h → h = 12 m.",
      ],
      answer: "12 m",
      difficulty: "medium",
    },
    {
      id: "u5-t3-e5",
      problem: "An open-top box (no lid) is 8 cm × 5 cm × 3 cm. Find the surface area of the material needed.",
      hint: "Count 5 faces: bottom plus four sides, not the top.",
      steps: [
        "Bottom: 8 × 5 = 40.",
        "Sides: 2(8×3) + 2(5×3) = 48 + 30 = 78.",
        "Total: 40 + 78 = 118 cm².",
      ],
      answer: "118 cm²",
      difficulty: "hard",
    },
  ],
  "u6-t1": [
    {
      id: "u6-t1-e1",
      problem: "Is \"How many pets does each student in our class have?\" a statistical question?",
      steps: [
        "Different students will have different answers.",
        "The data varies, so it is statistical.",
      ],
      answer: "Yes",
      difficulty: "easy",
    },
    {
      id: "u6-t1-e2",
      problem: "Find the mean of: 6, 8, 10, 12.",
      steps: [
        "Sum: 6 + 8 + 10 + 12 = 36.",
        "Mean: 36 ÷ 4 = 9.",
      ],
      answer: "9",
      difficulty: "easy",
    },
    {
      id: "u6-t1-e3",
      problem: "Find the median of: 11, 3, 7, 9, 5.",
      hint: "Sort the data first.",
      steps: [
        "Sorted: 3, 5, 7, 9, 11.",
        "The middle value is 7.",
      ],
      answer: "7",
      difficulty: "medium",
    },
    {
      id: "u6-t1-e4",
      problem: "Find the mode of: 4, 7, 7, 9, 7, 12.",
      steps: [
        "7 appears most often (three times).",
        "The mode is 7.",
      ],
      answer: "7",
      difficulty: "medium",
    },
    {
      id: "u6-t1-e5",
      problem: "Test scores: 82, 90, 76, 90, 88. Find the mean and median.",
      steps: [
        "Mean: (82+90+76+90+88) ÷ 5 = 426 ÷ 5 = 85.2.",
        "Sorted: 76, 82, 88, 90, 90. Median = 88.",
      ],
      answer: "mean 85.2; median 88",
      difficulty: "hard",
    },
  ],
  "u6-t2": [
    {
      id: "u6-t2-e1",
      problem: "Find the range of: 15, 22, 18, 30, 12.",
      steps: [
        "Maximum − minimum = 30 − 12.",
        "Range = 18.",
      ],
      answer: "18",
      difficulty: "easy",
    },
    {
      id: "u6-t2-e2",
      problem: "Data set: 4, 8, 10, 12, 16, 20. Find the range.",
      steps: [
        "20 − 4 = 16.",
      ],
      answer: "16",
      difficulty: "easy",
    },
    {
      id: "u6-t2-e3",
      problem: "For the data 3, 5, 7, 9, 11, 13, 15, the median is 9. What percent of the data lies between the minimum and median?",
      hint: "Count values below the median.",
      steps: [
        "Values below 9: 3, 5, 7 → 3 out of 7 values.",
        "About 3/7 of the data is below the median (roughly the lower half).",
      ],
      answer: "3 of 7 values (lower half)",
      difficulty: "medium",
    },
    {
      id: "u6-t2-e4",
      problem: "Two data sets both have range 20. Set A: 10–30. Set B: 0–20 with one value 50. Which range is more misleading?",
      steps: [
        "Set B has an outlier at 50 that stretches the range.",
        "IQR would describe Set B's middle better than range.",
      ],
      answer: "Set B (outlier affects range more)",
      difficulty: "medium",
    },
    {
      id: "u6-t2-e5",
      problem: "A data set has Q1 = 12, Q3 = 20. Find the IQR.",
      steps: [
        "IQR = Q3 − Q1.",
        "IQR = 20 − 12 = 8.",
      ],
      answer: "8",
      difficulty: "hard",
    },
  ],
  "u6-t3": [
    {
      id: "u6-t3-e1",
      problem: "You surveyed 8 students on how many siblings they have: 0, 1, 1, 2, 2, 2, 3, 4. Which display shows every value clearly?",
      steps: [
        "The data set is small.",
        "A dot plot shows each individual value well.",
      ],
      answer: "Dot plot",
      difficulty: "easy",
    },
    {
      id: "u6-t3-e2",
      problem: "Test scores grouped into intervals 60–69, 70–79, 80–89, 90–100. Which graph shows frequency by interval?",
      steps: [
        "Grouped numeric ranges use bins.",
        "A histogram is the best choice.",
      ],
      answer: "Histogram",
      difficulty: "easy",
    },
    {
      id: "u6-t3-e3",
      problem: "You want to compare the spread of homework time for boys vs. girls. Which display helps most?",
      steps: [
        "Comparing two groups' spread suggests five-number summaries.",
        "Side-by-side box plots work well.",
      ],
      answer: "Box plot (or side-by-side box plots)",
      difficulty: "medium",
    },
    {
      id: "u6-t3-e4",
      problem: "A pie chart shows favorite colors. Is this good for showing exact counts of a small class survey?",
      hint: "Think about whether you need precise values or parts of a whole.",
      steps: [
        "Pie charts show parts of a whole but make exact counts hard to read.",
        "A dot plot or bar graph is better for exact counts in a small set.",
      ],
      answer: "No; use a dot plot or bar graph",
      difficulty: "medium",
    },
    {
      id: "u6-t3-e5",
      problem: "Daily temperatures for 30 days need to be summarized by week. Name the best display and why.",
      steps: [
        "Grouping many values into ranges (weekly bins) fits a histogram.",
        "Histograms show how many days fell in each temperature interval.",
      ],
      answer: "Histogram; it groups many values into intervals",
      difficulty: "hard",
    },
  ],
  "u7-t1": [
    {
      id: "u7-t1-e1",
      problem: "Find the area of a triangle with base 14 cm and height 9 cm.",
      steps: [
        "A = ½ × 14 × 9 = 63 cm².",
      ],
      answer: "63 cm²",
      difficulty: "easy",
    },
    {
      id: "u7-t1-e2",
      problem: "A regular hexagon splits into 6 identical equilateral triangles, each with area 15 cm². Find the hexagon's area.",
      steps: [
        "Add the six triangle areas: 6 × 15.",
        "Total area = 90 cm².",
      ],
      answer: "90 cm²",
      difficulty: "easy",
    },
    {
      id: "u7-t1-e3",
      problem: "A pentagon splits into a 6 × 4 rectangle and a triangle with base 6 and height 3. Find the total area.",
      steps: [
        "Rectangle: 6 × 4 = 24.",
        "Triangle: ½ × 6 × 3 = 9.",
        "Total: 24 + 9 = 33 square units.",
      ],
      answer: "33 square units",
      difficulty: "medium",
    },
    {
      id: "u7-t1-e4",
      problem: "A parallelogram has sides 10 cm and 6 cm, but the height perpendicular to the 10 cm base is 5 cm. Find the area.",
      hint: "Use the perpendicular height, not the slanted side.",
      steps: [
        "A = base × height = 10 × 5.",
        "A = 50 cm².",
      ],
      answer: "50 cm²",
      difficulty: "medium",
    },
    {
      id: "u7-t1-e5",
      problem: "A garden is shaped like a trapezoid with parallel sides 20 m and 12 m and height 8 m. Find the area to cover with grass seed.",
      steps: [
        "A = ½ × (20 + 12) × 8.",
        "A = ½ × 32 × 8 = 128 m².",
      ],
      answer: "128 m²",
      difficulty: "hard",
    },
  ],
  "u7-t2": [
    {
      id: "u7-t2-e1",
      problem: "A cube has edge 3 cm. Find the area of one face and the total surface area.",
      steps: [
        "One face: 3 × 3 = 9 cm².",
        "Six faces: 6 × 9 = 54 cm².",
      ],
      answer: "9 cm² per face; 54 cm² total",
      difficulty: "easy",
    },
    {
      id: "u7-t2-e2",
      problem: "A rectangular prism has faces 4×3, 4×2, and 3×2 cm. Find the surface area.",
      steps: [
        "Areas: 12, 8, and 6 cm².",
        "Each appears twice: 2(12+8+6) = 2(26) = 52 cm².",
      ],
      answer: "52 cm²",
      difficulty: "medium",
    },
    {
      id: "u7-t2-e3",
      problem: "Find the surface area of a cube with edge 5 in.",
      steps: [
        "One face: 25 in².",
        "Six faces: 6 × 25 = 150 in².",
      ],
      answer: "150 in²",
      difficulty: "easy",
    },
    {
      id: "u7-t2-e4",
      problem: "An open box (no top) is 10 cm × 6 cm × 4 cm. How much cardboard is needed?",
      steps: [
        "Bottom: 10 × 6 = 60.",
        "Four sides: 2(10×4) + 2(6×4) = 80 + 48 = 128.",
        "Total: 60 + 128 = 188 cm².",
      ],
      answer: "188 cm²",
      difficulty: "medium",
    },
    {
      id: "u7-t2-e5",
      problem: "A room needs paint on four walls only (no ceiling or floor). Walls are 12 ft × 8 ft (two) and 10 ft × 8 ft (two). Find the painted area.",
      steps: [
        "12×8 walls: 2 × 96 = 192 ft².",
        "10×8 walls: 2 × 80 = 160 ft².",
        "Total: 192 + 160 = 352 ft².",
      ],
      answer: "352 ft²",
      difficulty: "hard",
    },
  ],
  "u7-t3": [
    {
      id: "u7-t3-e1",
      problem: "Find the volume of a box 2 ft × 3 ft × 5 ft.",
      steps: [
        "V = 2 × 3 × 5 = 30 ft³.",
      ],
      answer: "30 ft³",
      difficulty: "easy",
    },
    {
      id: "u7-t3-e2",
      problem: "Find the volume of a prism 1½ in × 4 in × 2 in.",
      hint: "Write 1½ as 3/2 or 1.5 before multiplying.",
      steps: [
        "1.5 × 4 × 2 = 12 in³.",
      ],
      answer: "12 in³",
      difficulty: "medium",
    },
    {
      id: "u7-t3-e3",
      problem: "A fish tank is 2½ ft long, 1 ft wide, and 1½ ft tall. How many cubic feet of water does it hold?",
      steps: [
        "2.5 × 1 × 1.5 = 3.75 ft³.",
      ],
      answer: "3.75 ft³",
      difficulty: "medium",
    },
    {
      id: "u7-t3-e4",
      problem: "A prism has volume 45 m³. The base is 7½ m². Find the height.",
      steps: [
        "45 = 7.5 × h.",
        "h = 45 ÷ 7.5 = 6 m.",
      ],
      answer: "6 m",
      difficulty: "hard",
    },
    {
      id: "u7-t3-e5",
      problem: "A storage crate is 3¼ ft × 2 ft × 1⅖ ft. Round to the nearest tenth and find the volume in cubic feet.",
      steps: [
        "3.25 × 2 × 1.4 = 9.1 ft³ (nearest tenth).",
      ],
      answer: "9.1 ft³",
      difficulty: "hard",
    },
  ],
};
