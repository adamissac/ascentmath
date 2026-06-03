type UnitSupplement = {
  studyGuide: string[];
  masteryOutcomes: string[];
};

export const UNIT_SUPPLEMENTS: Record<string, UnitSupplement> = {
  "unit-1": {
    studyGuide: [
      "Start with Topic 1 (factors & GCF/LCM) even if it feels easy, every fraction topic later depends on it.",
      "Do every exercise on paper before opening solutions; use hints only after a real attempt.",
      "Finish all four topics in order, then retake any quiz where you scored below 80%.",
      "Use the external practice links for extra drill if you miss GCF/LCM problems twice.",
      "Before Unit 2, you should simplify fractions quickly without a calculator.",
    ],
    masteryOutcomes: [
      "Find GCF and LCM of two whole numbers using lists or prime factorization.",
      "Add and subtract fractions with unlike denominators.",
      "Multiply and divide fractions and mixed numbers in context problems.",
      "Place fractions on a number line and compare them.",
    ],
  },
  "unit-2": {
    studyGuide: [
      "Keep a ratio table in your notebook while working through Topics 1–3.",
      "When a problem mentions “per” or “for every,” write a ratio before calculating.",
      "Watch both videos on double-number lines if Topic 2 feels confusing.",
      "Complete all exercises, then explain one rate problem out loud to check understanding.",
      "Review Unit 1 fractions if decimal conversions trip you up.",
    ],
    masteryOutcomes: [
      "Write and simplify ratios from verbal descriptions.",
      "Solve rate problems with double number lines and unit rates.",
      "Set up and solve proportions in real-world contexts.",
      "Convert between fractions, decimals, and percents in ratio problems.",
    ],
  },
  "unit-3": {
    studyGuide: [
      "Write PEMDAS on a sticky note, use it on every exercise until it's automatic.",
      "Topic 2 (expressions) is vocabulary-heavy; make flashcards for terms like coefficient and term.",
      "Substitute numbers into expressions slowly; parentheses matter.",
      "Do Topic 3 (distributive property) exercises without skipping steps.",
      "Retake quizzes until you can score 100% on order of operations.",
    ],
    masteryOutcomes: [
      "Evaluate numeric expressions using order of operations.",
      "Write and interpret variable expressions from words.",
      "Apply the distributive property to expand and simplify expressions.",
      "Combine like terms in simple expressions.",
    ],
  },
  "unit-4": {
    studyGuide: [
      "Balance scales in your head: whatever you do to one side, do to the other.",
      "Solve practice problems on paper; checking by substitution catches mistakes.",
      "Graph simple equations on a coordinate plane after Topic 2.",
      "Inequalities flip when multiplying/dividing by a negative, memorize that rule.",
      "Finish the unit with a perfect score on at least one quiz retake.",
    ],
    masteryOutcomes: [
      "Solve one-step and two-step equations.",
      "Graph ordered pairs and simple relationships on the coordinate plane.",
      "Write and graph solutions to one-variable inequalities.",
      "Check equation solutions by substitution.",
    ],
  },
  "unit-5": {
    studyGuide: [
      "Draw diagrams for every geometry problem before calculating.",
      "Write formulas with labels (cm, cm², cm³) to avoid unit mistakes.",
      "Topic 2 composite figures: break shapes into rectangles/triangles you know.",
      "Use nets from Topic 3 to visualize surface area, don't memorize blindly.",
      "Redo any exercise you got wrong after seeing the solution.",
    ],
    masteryOutcomes: [
      "Find area of rectangles, triangles, and parallelograms.",
      "Decompose composite figures into familiar shapes to find area.",
      "Calculate volume of rectangular prisms and use nets for surface area.",
      "Choose correct units for area versus volume.",
    ],
  },
  "unit-6": {
    studyGuide: [
      "For statistics topics, always ask: what question is the data answering?",
      "Make a quick dot plot or histogram on paper when the walkthrough shows one.",
      "Mean, median, and mode need different situations, know which to use.",
      "Read graphs twice: title, axes, then values.",
      "Practice exercises build graph literacy, don't skip them.",
    ],
    masteryOutcomes: [
      "Compute mean, median, and mode for a data set.",
      "Describe shape, center, and spread of data informally.",
      "Interpret dot plots, histograms, and box plots.",
      "Identify what a statistical question is asking.",
    ],
  },
  "unit-7": {
    studyGuide: [
      "Keep a formula sheet for area of special polygons as you go.",
      "Draw nets and label every face before adding surface areas.",
      "Volume with fractional edges: multiply fractions carefully, Unit 1 skills.",
      "Use scratch paper models for prisms and pyramids when confused.",
      "Complete all topics before your class test on measurement.",
    ],
    masteryOutcomes: [
      "Find area of polygons using appropriate formulas.",
      "Use nets to find surface area of prisms and pyramids.",
      "Calculate volume when edge lengths are fractions.",
      "Distinguish when a problem asks for area vs. surface area vs. volume.",
    ],
  },
  "g7-unit-1": {
    studyGuide: [
      "Draw a number line for every integer problem until sign rules feel natural.",
      "Same signs vs. different signs: write the rule at the top of your homework.",
      "Fraction and decimal problems in Topic 3 reuse Unit 1 skills, review if needed.",
      "Do all five exercises per topic before the quiz.",
      "Retake quizzes until you rarely miss sign errors.",
    ],
    masteryOutcomes: [
      "Add, subtract, multiply, and divide integers fluently.",
      "Apply integer rules to fractions and decimals.",
      "Solve real-world problems with negative values (temperature, elevation, money).",
      "Use absolute value correctly in comparisons.",
    ],
  },
  "g7-unit-2": {
    studyGuide: [
      "Always write the unit rate with its label (miles per hour, dollars per item).",
      "Identify constant of proportionality k in tables and graphs.",
      "Percent problems: decide whether you're finding part, whole, or percent first.",
      "Use ratio tables for every proportion exercise.",
      "Connect each topic quiz to a homework problem from class.",
    ],
    masteryOutcomes: [
      "Compute unit rates and compare rates.",
      "Recognize proportional relationships in tables and graphs.",
      "Solve percent problems including tax, tip, discount, and percent change.",
      "Set up and solve proportions.",
    ],
  },
  "g7-unit-3": {
    studyGuide: [
      "Show every step when solving equations, no skipping.",
      "When you divide both sides by a negative, flip the inequality symbol.",
      "Factoring and expanding are reverse processes, practice both directions.",
      "Translate word problems into equations before solving.",
      "Use exercises as mini-tests; hide solutions until you've tried.",
    ],
    masteryOutcomes: [
      "Solve two-step equations including those with fractions.",
      "Solve and graph simple inequalities.",
      "Expand and factor expressions using the distributive property.",
      "Write equations from verbal descriptions.",
    ],
  },
  "g7-unit-4": {
    studyGuide: [
      "Sketch diagrams for scale drawings and label corresponding sides.",
      "Write angle relationships (supplementary, vertical, adjacent) on your diagram.",
      "Memorize circle formulas C = 2πr and A = πr² with a labeled circle drawing.",
      "For volume, write the formula first, then substitute.",
      "Review 3-D vocabulary: face, edge, vertex, prism, pyramid.",
    ],
    masteryOutcomes: [
      "Solve problems with scale drawings and similar figures.",
      "Find missing angles using angle relationships.",
      "Calculate circumference and area of circles.",
      "Find volume and surface area of prisms, pyramids, and composite solids.",
    ],
  },
  "g7-unit-5": {
    studyGuide: [
      "Ask whether a sample is random and representative before analyzing.",
      "Compare centers and spreads, not just single numbers.",
      "Use dot plots and box plots to justify comparisons in writing.",
      "Redo exercises where you misread the graph.",
      "Link each quiz question back to a vocabulary term (mean, MAD, etc.).",
    ],
    masteryOutcomes: [
      "Describe populations vs. samples and identify bias.",
      "Compare two data sets using visual displays.",
      "Interpret mean as fair share and mean absolute deviation informally.",
      "Draw conclusions that match the data shown.",
    ],
  },
  "g7-unit-6": {
    studyGuide: [
      "Write the sample space before computing probability.",
      "For compound events, list outcomes systematically or use the multiplication rule when independent.",
      "Probability is between 0 and 1, check answers make sense.",
      "Simulate with dice/coins if a problem feels abstract.",
      "Finish both topics and retake quizzes until comfortable.",
    ],
    masteryOutcomes: [
      "Find theoretical probability of simple events.",
      "List sample spaces for compound events.",
      "Determine whether events are independent.",
      "Solve simple compound probability problems.",
    ],
  },
  "g8-unit-1": {
    studyGuide: [
      "Review exponent rules with integer exponents before scientific notation.",
      "Approximate radicals when exact form isn't required.",
      "Scientific notation: move the decimal, then adjust the exponent.",
      "Calculator use is fine after you set up the expression by hand.",
      "Master Topic 1 rules before moving to roots and notation.",
    ],
    masteryOutcomes: [
      "Apply laws of exponents to simplify expressions.",
      "Estimate and compare irrational numbers.",
      "Convert between standard form and scientific notation.",
      "Solve problems involving very large or very small quantities.",
    ],
  },
  "g8-unit-2": {
    studyGuide: [
      "Do the same operation to both sides of an equation every time.",
      "Combine like terms on one side before isolating the variable.",
      "Check solutions by substituting back into the original equation.",
      "Multi-step word problems: define the variable in a sentence first.",
      "Practice until equation solving feels routine.",
    ],
    masteryOutcomes: [
      "Solve multi-step linear equations including variables on both sides.",
      "Solve equations with special cases (one solution, none, infinitely many).",
      "Translate multi-step word problems into equations.",
      "Verify solutions and interpret in context.",
    ],
  },
  "g8-unit-3": {
    studyGuide: [
      "A function assigns exactly one output per input, test with tables.",
      "Plot points carefully; use a ruler for lines when graphing.",
      "Function notation f(x) means substitute x into the rule.",
      "Compare functions using tables and graphs side by side.",
      "Complete exercises before watching solutions.",
    ],
    masteryOutcomes: [
      "Determine whether a relation is a function.",
      "Evaluate functions using notation and tables.",
      "Graph functions from tables and simple rules.",
      "Compare rates of change from graphs.",
    ],
  },
  "g8-unit-4": {
    studyGuide: [
      "Slope = rise over run; label axes on every graph.",
      "Slope-intercept form y = mx + b: identify m and b from equations and graphs.",
      "Parallel lines share slope; perpendicular slopes are negative reciprocals.",
      "Write equations from graphs and word problems.",
      "Use graph paper for Topic 2 practice.",
    ],
    masteryOutcomes: [
      "Find slope from graphs and two points.",
      "Write equations in slope-intercept form.",
      "Graph lines from equations.",
      "Interpret slope and y-intercept in context.",
    ],
  },
  "g8-unit-5": {
    studyGuide: [
      "Substitution works best when one equation is already solved for a variable.",
      "Elimination: align like terms and add/subtract whole equations.",
      "Check ordered pair solutions in BOTH original equations.",
      "Word problems: define two variables and write two equations.",
      "Draw lines for each equation if elimination feels unclear.",
    ],
    masteryOutcomes: [
      "Solve systems by graphing and interpret the intersection.",
      "Solve systems by substitution.",
      "Solve systems by elimination.",
      "Model real situations with systems of two equations.",
    ],
  },
  "g8-unit-6": {
    studyGuide: [
      "Trace shapes on paper for transformations, label preimage and image.",
      "Know rules for reflections, rotations, translations on the coordinate plane.",
      "Similar figures: corresponding angles equal, sides proportional.",
      "Scale factor multiplies lengths; area scales by factor squared.",
      "Use patty paper or tracing for Topic 1 if visualizing is hard.",
    ],
    masteryOutcomes: [
      "Perform and describe rigid transformations on the coordinate plane.",
      "Identify congruent and similar figures.",
      "Use scale factors with similar figures.",
      "Apply transformations to solve problems.",
    ],
  },
  "g8-unit-7": {
    studyGuide: [
      "Draw right triangles and label legs and hypotenuse before using a² + b² = c².",
      "Converse of Pythagorean theorem tests whether a triangle is right.",
      "Volume formulas: write each formula, then substitute with units cubed.",
      "Sketch 3-D figures and label radius, height, slant height as needed.",
      "Finish all exercises, geometry retention comes from repetition.",
    ],
    masteryOutcomes: [
      "Use the Pythagorean theorem to find missing sides.",
      "Apply the converse to classify triangles.",
      "Find volume of cylinders, cones, and spheres.",
      "Solve composite volume problems in context.",
    ],
  },
};
