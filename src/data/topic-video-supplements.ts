/**
 * Extra video resources per topic — merged by enrichCurriculum.ts so every
 * topic ends up with exactly four videos (video + extraVideo + supplements).
 */

import type { VideoResource } from "./units";

export const TOPIC_VIDEO_SUPPLEMENTS: Record<string, VideoResource[]> = {
  "u1-t1": [
    { videoId: "CUEOL3_Wm3Y", title: "GCF: Greatest Common Factor", source: "Math Antics", description: "Find the greatest factor two numbers share in common." },
    { videoId: "Nu6AC6X3_E4", title: "LCM: Basic Method", source: "Math Antics", description: "List multiples to find the least common multiple of two numbers." },
    { videoId: "0NvLtTwnUHs", title: "Factoring", source: "Math Antics", description: "Test for divisibility and find all factors of a whole number." }
  ],
  "u1-t2": [
    { videoId: "AtBUQH8Tkqc", title: "Simplifying Fractions", source: "Math Antics", description: "Reduce fractions to lowest terms using the greatest common factor." },
    { videoId: "WPimvspI0_c", title: "Fractions in Lowest Terms", source: "Khan Academy", description: "Write equivalent fractions in simplest form step by step." }
  ],
  "u1-t3": [
    { videoId: "KNdUJQ_qd4U", title: "Comparing Fractions", source: "Math Antics", description: "Compare fractions with like or unlike denominators." },
    { videoId: "4CKDqvddhhg", title: "How to Simplify Fractions", source: "Math with Mr. J", description: "Put products and quotients of fractions in lowest terms." }
  ],
  "u1-t4": [
    { videoId: "oLh_sIESQnY", title: "Adding Decimals", source: "Khan Academy", description: "Line up decimal points and add multi-digit decimal numbers." },
    { videoId: "kwh4SD1ToFc", title: "Decimal Arithmetic", source: "Math Antics", description: "Add, subtract, multiply, and divide decimals by hand." }
  ],
  "u2-t1": [
    { videoId: "MaMk6-f3T9k", title: "Solving Ratio Problems with Tables", source: "Khan Academy", description: "Use ratio tables to find equivalent ratios in context." },
    { videoId: "GO5ajwbFqVQ", title: "Solving a Proportion", source: "Khan Academy", description: "Set two equal ratios and solve for an unknown value." }
  ],
  "u2-t2": [
    { videoId: "USmit5zUGas", title: "Proportions", source: "Math Antics", description: "Write and solve equations where two ratios are equal." },
    { videoId: "2DBBKArGfus", title: "Determining Rates with Fractions", source: "Khan Academy", description: "Compute a unit rate when the rate involves fractions." }
  ],
  "u2-t3": [
    { videoId: "qcz1Cm_-l50", title: "Equations of Proportional Relationships", source: "Khan Academy", description: "Write y = kx and identify the constant of proportionality." },
    { videoId: "GO5ajwbFqVQ", title: "Solving a Proportion", source: "Khan Academy", description: "Cross-multiply to solve real-world proportion problems." }
  ],
  "u3-t1": [
    { videoId: "-zUmvpkhvW8", title: "Intro to Exponents", source: "Math Antics", description: "Understand repeated multiplication and exponent notation." },
    { videoId: "ccyZpjKvJV8", title: "Evaluating Expressions with Exponents", source: "Khan Academy", description: "Substitute values and evaluate numeric expressions with powers." }
  ],
  "u3-t2": [
    { videoId: "ccyZpjKvJV8", title: "Evaluating Expressions with Exponents", source: "Khan Academy", description: "Plug in values for variables and follow order of operations." },
    { videoId: "S_OX3ByvBSc", title: "Evaluating Expressions with Two Variables", source: "Khan Academy", description: "Substitute two values and simplify a variable expression." }
  ],
  "u3-t3": [
    { videoId: "Q1vMNyIP4Us", title: "Writing Expressions with Variables", source: "Khan Academy", description: "Translate word phrases into algebraic expressions." },
    { videoId: "S_OX3ByvBSc", title: "Evaluating Expressions with Two Variables", source: "Khan Academy", description: "Evaluate simplified expressions after combining like terms." }
  ],
  "u4-t1": [
    { videoId: "LDIiYKYvvdA", title: "Solving 2-Step Equations", source: "Math Antics", description: "Undo two operations in reverse order to isolate the variable." },
    { videoId: "BOIA9wsM4ok", title: "Two-Step Equations with Decimals and Fractions", source: "Khan Academy", description: "Solve equations that include rational number coefficients." }
  ],
  "u4-t2": [
    { videoId: "dTwZ5N126gw", title: "Inequalities on a Number Line", source: "Khan Academy", description: "Graph simple inequalities with open or closed circles." },
    { videoId: "xOxvyeSl0uA", title: "Multi-Step Inequalities", source: "Khan Academy", description: "Solve inequalities and know when to reverse the inequality sign." }
  ],
  "u4-t3": [
    { videoId: "kvGsIo1TmsM", title: "What Is a Function?", source: "Khan Academy", description: "Relate inputs and outputs to independent and dependent variables." },
    { videoId: "rgvysb9emcQ", title: "Graphs of Linear Equations", source: "Khan Academy", description: "See how x and y values pair up on a coordinate graph." }
  ],
  "u5-t1": [
    { videoId: "rRTXKQpblEc", title: "Area of Triangles Intuition", source: "Khan Academy", description: "See why triangle area is one-half base times height." },
    { videoId: "yZ4CbopnVBg", title: "Area of an Isosceles Triangle", source: "Khan Academy", description: "Find triangle area using base, height, and the area formula." }
  ],
  "u5-t2": [
    { videoId: "IaoZhhx_I9s", title: "Polygons", source: "Math Antics", description: "Break composite figures into triangles and other polygons." },
    { videoId: "rRTXKQpblEc", title: "Area of Triangles Intuition", source: "Khan Academy", description: "Add triangle areas when decomposing composite shapes." }
  ],
  "u5-t3": [
    { videoId: "mtMNvnm71Z0", title: "Surface Area Using Nets", source: "Khan Academy", description: "Unfold a 3-D figure and add the areas of each face." },
    { videoId: "dCD02kuobnY", title: "Surface Area of a Rectangular Prism", source: "Math with Mr. J", description: "Find total face area step by step using a net." }
  ],
  "u6-t1": [
    { videoId: "gdE46YSedvE", title: "Frequency Tables and Dot Plots", source: "Khan Academy", description: "Organize data and see where values cluster on a dot plot." },
    { videoId: "0ZKtsUkrgFQ", title: "Ways to Represent Data", source: "Khan Academy", description: "Compare tables, dot plots, and other displays for a data set." }
  ],
  "u6-t2": [
    { videoId: "nV8jR8M8C74", title: "Box and Whisker Plots", source: "Math with Mr. J", description: "Summarize spread using five key values on a box plot." },
    { videoId: "gSEYtAjuZ-Y", title: "Histograms", source: "Khan Academy", description: "Group numeric data into intervals and display as bars." }
  ],
  "u6-t3": [
    { videoId: "s_w3EJ2Jzw0", title: "Comparing Dot Plots, Histograms, and Box Plots", source: "Khan Academy", description: "Pick the best display and compare two data sets." },
    { videoId: "gdE46YSedvE", title: "Frequency Tables and Dot Plots", source: "Khan Academy", description: "Build dot plots from raw data and read their features." }
  ],
  "u7-t1": [
    { videoId: "hm17lVaor0Q", title: "Area of a Parallelogram", source: "Khan Academy", description: "Use base times height to find parallelogram area." },
    { videoId: "rRTXKQpblEc", title: "Area of Triangles Intuition", source: "Khan Academy", description: "Find triangle area inside polygons and composite figures." }
  ],
  "u7-t2": [
    { videoId: "ny5DVYNpqM8", title: "Surface Area Using Nets", source: "Khan Academy", description: "Add face areas after unfolding prisms and pyramids." },
    { videoId: "qJwecTgce6c", title: "Volume", source: "Math Antics", description: "Connect 3-D space filling to nets and face areas." }
  ],
  "u7-t3": [
    { videoId: "qJwecTgce6c", title: "Volume", source: "Math Antics", description: "Find how much space a solid fills using cubic units." },
    { videoId: "mtMNvnm71Z0", title: "Surface Area Using Nets", source: "Khan Academy", description: "Relate volume formulas to the faces of a prism." }
  ],
  "g7u1-t1": [
    { videoId: "pzQY-9Nmtws", title: "Why a Negative Times a Negative Makes Sense", source: "Khan Academy", description: "Build intuition for integer sign rules on a number line." },
    { videoId: "mPLCXCscqI8", title: "Multiplying and Dividing Negative Numbers", source: "Khan Academy", description: "Interpret signed-number multiplication and division in context." }
  ],
  "g7u1-t2": [
    { videoId: "pzQY-9Nmtws", title: "Why a Negative Times a Negative Makes Sense", source: "Khan Academy", description: "Understand why same signs give a positive product." },
    { videoId: "mPLCXCscqI8", title: "Multiplying and Dividing Negative Numbers", source: "Khan Academy", description: "Apply integer rules to multiplication and division word problems." },
    { videoId: "OAoLCXpao6s", title: "Negative Numbers", source: "Math Antics", description: "Compare and order positive and negative values on a number line." }
  ],
  "g7u1-t3": [
    { videoId: "qmfXyR7Z6Lk", title: "Multiplying Fractions", source: "Math Antics", description: "Multiply across numerators and denominators, then simplify." },
    { videoId: "4lkq3DgvmJo", title: "Dividing Fractions", source: "Math Antics", description: "Keep-change-flip to divide fractions and mixed numbers." },
    { videoId: "AtBUQH8Tkqc", title: "Simplifying Fractions", source: "Math Antics", description: "Reduce rational-number answers to lowest terms." }
  ],
  "g7u2-t1": [
    { videoId: "jC1K7fM91sE", title: "Rates and Unit Rates", source: "Math with Mr. J", description: "Turn a rate into a per-one unit rate with fractions." },
    { videoId: "GO5ajwbFqVQ", title: "Solving a Proportion", source: "Khan Academy", description: "Use proportions to solve fraction rate problems." }
  ],
  "g7u2-t2": [
    { videoId: "USmit5zUGas", title: "Proportions", source: "Math Antics", description: "Set up and solve proportional relationship equations." },
    { videoId: "MaMk6-f3T9k", title: "Solving Ratio Problems with Tables", source: "Khan Academy", description: "Organize equivalent ratios to find the constant k." }
  ],
  "g7u2-t3": [
    { videoId: "JeVSmq1Nrpw", title: "What Are Percentages?", source: "Math Antics", description: "Connect percents to fractions and decimals out of 100." },
    { videoId: "GO5ajwbFqVQ", title: "Solving a Proportion", source: "Khan Academy", description: "Use proportions to solve percent increase and decrease problems." }
  ],
  "g7u3-t1": [
    { videoId: "Q1vMNyIP4Us", title: "Writing Expressions with Variables", source: "Khan Academy", description: "Expand factored expressions into equivalent forms." },
    { videoId: "ccyZpjKvJV8", title: "Evaluating Expressions with Exponents", source: "Khan Academy", description: "Substitute values into expanded and factored expressions." }
  ],
  "g7u3-t2": [
    { videoId: "jWpiMu5LNdg", title: "One-Step Equations", source: "Khan Academy", description: "Review inverse operations before tackling two-step equations." },
    { videoId: "BOIA9wsM4ok", title: "Two-Step Equations with Decimals and Fractions", source: "Khan Academy", description: "Solve two-step equations with rational coefficients." }
  ],
  "g7u3-t3": [
    { videoId: "dTwZ5N126gw", title: "Inequalities on a Number Line", source: "Khan Academy", description: "Graph two-step inequality solutions on a number line." },
    { videoId: "VgDe_D8ojxw", title: "Intro to Inequalities", source: "Khan Academy", description: "Compare inequality symbols and interpret solution sets." }
  ],
  "g7u4-t1": [
    { videoId: "QBiTspq2Wck", title: "Identifying Scaled Copies", source: "Khan Academy", description: "Decide whether two figures are scaled versions of each other." },
    { videoId: "qlWZJ21O63s", title: "Dilating Shapes", source: "Khan Academy", description: "Scale a figure from the origin using a scale factor." }
  ],
  "g7u4-t2": [
    { videoId: "wRBMmiNHQaE", title: "Vertical Angles Are Equal", source: "Khan Academy", description: "Prove and use the fact that vertical angles are congruent." },
    { videoId: "gRKZaojKeP0", title: "Angles, Parallel Lines & Transversals", source: "Khan Academy", description: "Identify corresponding and alternate angle relationships." },
    { videoId: "yZ4CbopnVBg", title: "Area of an Isosceles Triangle", source: "Khan Academy", description: "Use complementary and supplementary angles to find missing measures." }
  ],
  "g7u4-t3": [
    { videoId: "Rcb7ZUTOQ1I", title: "Circumference of a Circle", source: "Khan Academy", description: "Relate radius, area, and circumference using pi." },
    { videoId: "_cF1cwv2EQU", title: "Composite Area Related to Circles", source: "Khan Academy", description: "Find shaded area by combining circles and other shapes." },
    { videoId: "gL3HxBQyeg0", title: "Cylinder Volume & Surface Area", source: "Khan Academy", description: "Apply circle area and circumference formulas to cylinders." }
  ],
  "g7u4-t4": [
    { videoId: "mtMNvnm71Z0", title: "Surface Area Using Nets", source: "Khan Academy", description: "Add face areas after unfolding 3-D solids." },
    { videoId: "dCD02kuobnY", title: "Surface Area of a Rectangular Prism", source: "Math with Mr. J", description: "Practice finding total surface area with a net." }
  ],
  "g7u5-t1": [
    { videoId: "qyYSQDcSNlY", title: "Statistical and Non-Statistical Questions", source: "Khan Academy", description: "Decide which questions expect many different answers." },
    { videoId: "B1HEzNTGeZ4", title: "Mean, Median & Mode", source: "Math Antics", description: "Summarize a sample using measures of center." }
  ],
  "g7u5-t2": [
    { videoId: "gSEYtAjuZ-Y", title: "Histograms", source: "Khan Academy", description: "Compare distributions of two populations with histograms." },
    { videoId: "nV8jR8M8C74", title: "Box and Whisker Plots", source: "Math with Mr. J", description: "Compare spread and center of two data sets with box plots." },
    { videoId: "gdE46YSedvE", title: "Frequency Tables and Dot Plots", source: "Khan Academy", description: "Display and compare small data sets with dot plots." }
  ],
  "g7u6-t1": [
    { videoId: "uzkc-qNVoOk", title: "Probability Explained", source: "Khan Academy", description: "Introduce sample space, outcomes, and the probability line." },
    { videoId: "yUaI0JriZtY", title: "Finding Probability Example", source: "Khan Academy", description: "Count favorable outcomes over total possible outcomes." },
    { videoId: "QE2uR6Z-NcU", title: "Addition Rule for Probability", source: "Khan Academy", description: "Combine probabilities of overlapping events." }
  ],
  "g7u6-t2": [
    { videoId: "uzkc-qNVoOk", title: "Probability Explained", source: "Khan Academy", description: "Review basic probability before compound events." },
    { videoId: "QE2uR6Z-NcU", title: "Addition Rule for Probability", source: "Khan Academy", description: "Add probabilities for mutually exclusive compound events." }
  ],
  "g8u1-t1": [
    { videoId: "-zUmvpkhvW8", title: "Intro to Exponents", source: "Math Antics", description: "Understand bases, exponents, and repeated multiplication." },
    { videoId: "dAgfnK528RA", title: "Order of Operations", source: "Math Antics", description: "Apply PEMDAS when expressions include powers." },
    { videoId: "ccyZpjKvJV8", title: "Evaluating Expressions with Exponents", source: "Khan Academy", description: "Evaluate numeric expressions that use exponent rules." }
  ],
  "g8u1-t2": [
    { videoId: "i6lfVUp5RW8", title: "Scientific Notation Examples", source: "Khan Academy", description: "Convert between standard form and scientific notation." },
    { videoId: "ios3QL9t9LQ", title: "Subtracting in Scientific Notation", source: "Khan Academy", description: "Add and subtract numbers written in scientific notation." },
    { videoId: "497oIjqRPco", title: "Multiplying and Dividing in Scientific Notation", source: "Khan Academy", description: "Operate on numbers in scientific notation efficiently." }
  ],
  "g8u1-t3": [
    { videoId: "EFVrAk61xjE", title: "Approximating Square Roots", source: "Khan Academy", description: "Estimate irrational square roots to the nearest hundredth." },
    { videoId: "16-GZWi66CI", title: "Sums and Products of Irrational Numbers", source: "Khan Academy", description: "Explore when roots and pi produce rational or irrational results." },
    { videoId: "WqhlG3Vakw8", title: "The Pythagorean Theorem", source: "Math Antics", description: "Use square roots to find a missing side in a right triangle." }
  ],
  "g8u2-t1": [
    { videoId: "vkhYFml0w6c", title: "Why We Do the Same Thing to Both Sides", source: "Khan Academy", description: "Balance multi-step equations by keeping both sides equal." },
    { videoId: "Z7C69xP08d8", title: "Multi-Step Equation Example", source: "Khan Academy", description: "Clear fractions and solve a multi-step linear equation." },
    { videoId: "jWpiMu5LNdg", title: "One-Step Equations", source: "Khan Academy", description: "Review inverse operations before combining steps." }
  ],
  "g8u2-t2": [
    { videoId: "LDIiYKYvvdA", title: "Solving 2-Step Equations", source: "Math Antics", description: "Collect like terms as a step toward variables on both sides." },
    { videoId: "l3XzepN03KQ", title: "Solving Basic Equations", source: "Math Antics", description: "Isolate the variable when terms appear on both sides." }
  ],
  "g8u3-t1": [
    { videoId: "oORnGaJp1pk", title: "Evaluating Functions from Graphs", source: "Khan Academy", description: "Read inputs and outputs from a function graph." },
    { videoId: "rgvysb9emcQ", title: "Graphs of Linear Equations", source: "Khan Academy", description: "See how ordered pairs define a function on the coordinate plane." },
    { videoId: "SGC_d7O7_Eg", title: "Dependent & Independent Variables", source: "Khan Academy", description: "Identify input and output in function relationships." }
  ],
  "g8u3-t2": [
    { videoId: "rgvysb9emcQ", title: "Graphs of Linear Equations", source: "Khan Academy", description: "Recognize straight-line graphs as linear functions." },
    { videoId: "R948Tsyq4vA", title: "Finding the Slope of a Line", source: "Khan Academy", description: "Compare steepness to tell linear from nonlinear patterns." },
    { videoId: "IL3UCuXrUzE", title: "Slope-Intercept Form", source: "Khan Academy", description: "Write linear functions in y = mx + b form." }
  ],
  "g8u4-t1": [
    { videoId: "Z65mz__8DQ0", title: "Slope and y-Intercept from an Equation", source: "Khan Academy", description: "Read slope and intercept directly from a linear equation." },
    { videoId: "rgvysb9emcQ", title: "Graphs of Linear Equations", source: "Khan Academy", description: "Plot points to graph a line from its slope." }
  ],
  "g8u4-t2": [
    { videoId: "-4JuRgJRli8", title: "Graphing a Line in Slope-Intercept Form", source: "Khan Academy", description: "Graph a line using its slope and y-intercept." },
    { videoId: "Z65mz__8DQ0", title: "Slope and y-Intercept from an Equation", source: "Khan Academy", description: "Identify m and b in equations written in different forms." },
    { videoId: "rgvysb9emcQ", title: "Graphs of Linear Equations", source: "Khan Academy", description: "Connect tables, equations, and graphs of linear functions." }
  ],
  "g8u5-t1": [
    { videoId: "rgvysb9emcQ", title: "Graphs of Linear Equations", source: "Khan Academy", description: "Graph two lines to prepare for finding their intersection." },
    { videoId: "-4JuRgJRli8", title: "Graphing a Line in Slope-Intercept Form", source: "Khan Academy", description: "Plot each equation quickly using slope-intercept form." },
    { videoId: "IL3UCuXrUzE", title: "Slope-Intercept Form", source: "Khan Academy", description: "Rewrite equations so they are easy to graph." }
  ],
  "g8u5-t2": [
    { videoId: "Aug8r8qV7W8", title: "Solving a System by Graphing", source: "Other", description: "Graph both lines and read the intersection point." },
    { videoId: "rgvysb9emcQ", title: "Graphs of Linear Equations", source: "Khan Academy", description: "Review graphing before comparing algebraic solution methods." }
  ],
  "g8u6-t1": [
    { videoId: "YD3HIMUae_4", title: "Translations, Reflections, and Rotations", source: "Other", description: "See rigid motions that preserve size and shape." },
    { videoId: "QBiTspq2Wck", title: "Identifying Scaled Copies", source: "Khan Academy", description: "Distinguish rigid transformations from non-rigid ones." },
    { videoId: "o07enwTfSpU", title: "Corresponding Parts of Scaled Copies", source: "Khan Academy", description: "Match vertices and sides after a transformation." }
  ],
  "g8u6-t2": [
    { videoId: "QBiTspq2Wck", title: "Identifying Scaled Copies", source: "Khan Academy", description: "Verify two figures are similar using scale factors." },
    { videoId: "o07enwTfSpU", title: "Corresponding Parts of Scaled Copies", source: "Khan Academy", description: "Find matching sides and angles in dilated figures." },
    { videoId: "R-6CAr_zEEk", title: "Similarity Example Problems", source: "Khan Academy", description: "Use proportions to find missing sides in similar shapes." }
  ],
  "g8u6-t3": [
    { videoId: "wRBMmiNHQaE", title: "Vertical Angles Are Equal", source: "Khan Academy", description: "Use vertical angle relationships with parallel lines." },
    { videoId: "DGKwdHMiqCg", title: "Angle Basics", source: "Math Antics", description: "Review complementary, supplementary, and angle types." },
    { videoId: "yZ4CbopnVBg", title: "Area of an Isosceles Triangle", source: "Khan Academy", description: "Apply angle facts to find missing measures in triangles." }
  ],
  "g8u7-t1": [
    { videoId: "yZ4CbopnVBg", title: "Area of an Isosceles Triangle", source: "Khan Academy", description: "Use the Pythagorean theorem to find height, then area." },
    { videoId: "mbc3_e5lWw0", title: "Introduction to Square Roots", source: "Khan Academy", description: "Connect square roots to the Pythagorean theorem." }
  ],
  "g8u7-t2": [
    { videoId: "hC6zx9WAiC4", title: "Volume of a Cone", source: "Khan Academy", description: "Apply V = (1/3)πr²h to find cone volume." },
    { videoId: "IelS2vg7JO8", title: "Volume of a Sphere", source: "Khan Academy", description: "Use V = (4/3)πr³ to find sphere volume." },
    { videoId: "qJwecTgce6c", title: "Volume", source: "Math Antics", description: "Compare volume formulas for prisms, cylinders, cones, and spheres." }
  ],
};
