import type { Topic, WalkthroughBlock } from "./units";

const DEPTH_BY_KEYWORD: Record<string, string[]> = {
  "factors-and-multiples": [
    "A quick way to test factors: divide the number by each candidate. If the quotient is a whole number with no remainder, you found a factor.",
    "Every whole number has at least two factors: 1 and itself. Prime numbers have exactly those two, which is why primes are the building blocks for bigger numbers.",
  ],
  gcf: [
    "GCF is useful when you need the largest equal-sized groups you can make from two quantities. Example: 18 pencils and 24 erasers shared into identical kits with nothing left over. The kit size is the GCF.",
    "Another use: simplifying fractions. The GCF of the numerator and denominator is the biggest number you can divide both by at once.",
  ],
  lcm: [
    "LCM answers questions like: \"When will both buses arrive at the same time again?\" or \"What is the smallest batch size that works for two different recipes?\"",
    "If two denominators are different, the LCM of those denominators is often the least common denominator you need for adding fractions.",
  ],
  fraction: [
    "The denominator tells you how many equal parts the whole is split into. The numerator tells you how many of those parts you have.",
    "Always ask: \"What is the whole?\" In 3/4 of a pizza, the whole is one pizza. In 3/4 of 20 students, the whole is 20 students.",
  ],
  ratio: [
    "A ratio compares two quantities with the same units. Order matters: a ratio of cats to dogs is not the same as dogs to cats unless the problem says they are equivalent.",
    "Write ratios in three ways: with a colon (3:4), as a phrase (3 to 4), or as a fraction (3/4) when it fits the context.",
  ],
  equation: [
    "An equation says two expressions have the same value. Whatever you do to one side, you must do to the other to keep the balance.",
    "Check your solution by substituting it back into the original equation. If both sides match, your answer is correct.",
  ],
  percent: [
    "Percent means \"out of 100.\" 25% is 25 per hundred, or 25/100, or 0.25 depending on what form helps you calculate.",
    "To find a percent of a number, convert the percent to a decimal and multiply. To find what percent one number is of another, divide and multiply by 100.",
  ],
  expression: [
    "An expression is a math phrase without an equals sign. It can be evaluated when you know the value of the variable.",
    "Like terms have the same variable raised to the same power. You can only combine like terms: 3x and 5x combine, but 3x and 3y do not.",
  ],
  area: [
    "Area measures how much space a flat shape covers, in square units. Picture tiles on a floor. Each tile is one square unit.",
    "Break complicated shapes into rectangles or triangles you already know how to measure, then add the pieces together.",
  ],
  volume: [
    "Volume measures space inside a 3D object, in cubic units. Think of how many unit cubes would fill the shape.",
    "For prisms, volume is often (area of the base) × (height). The base and height must be perpendicular for that shortcut.",
  ],
};

function headingKeyword(heading: string): string | null {
  const h = heading.toLowerCase();
  if (/factors?\s+and\s+multiples/.test(h)) return "factors-and-multiples";
  if (/\bgcf\b|greatest common factor/.test(h)) return "gcf";
  if (/\blcm\b|least common multiple/.test(h)) return "lcm";
  if (/fraction/.test(h)) return "fraction";
  if (/ratio/.test(h)) return "ratio";
  if (/equation/.test(h)) return "equation";
  if (/percent/.test(h)) return "percent";
  if (/expression/.test(h)) return "expression";
  if (/area/.test(h)) return "area";
  if (/volume/.test(h)) return "volume";
  return null;
}

function keywordExpansions(heading: string, usedKeys: Set<string>, usedParagraphs: Set<string>): string[] {
  const key = headingKeyword(heading);
  if (!key || usedKeys.has(key)) return [];

  const paras = DEPTH_BY_KEYWORD[key] ?? [];
  const fresh = paras.filter((p) => !usedParagraphs.has(p));
  if (fresh.length === 0) return [];

  usedKeys.add(key);
  for (const p of fresh) usedParagraphs.add(p);
  return fresh;
}

function enrichBlock(
  block: WalkthroughBlock,
  usedKeys: Set<string>,
  usedParagraphs: Set<string>,
): WalkthroughBlock {
  const paragraphs = [...(block.paragraphs ?? [])];
  if (!block.heading) return block;

  const extra = keywordExpansions(block.heading, usedKeys, usedParagraphs);
  for (const p of extra) {
    paragraphs.push(p);
  }

  return { ...block, paragraphs: paragraphs.length ? paragraphs : block.paragraphs };
}

function commonMistakes(topic: Topic): string[] {
  const text = `${topic.title} ${topic.summary}`.toLowerCase();

  if (text.includes("gcf") || text.includes("lcm") || text.includes("factor")) {
    return [
      "Picking GCF when the problem asks for LCM, or the other way around. Check whether you need the biggest shared factor or the next time both counts line up.",
      "Assuming the LCM is always the product of the two numbers. That only works when the numbers share no factors besides 1.",
      "Skipping 1 when you list factors. Every whole number has 1 as a factor.",
    ];
  }
  if (text.includes("fraction")) {
    return [
      "Adding numerators and denominators separately (2/3 + 1/4 is not 3/7). Match denominators first, or use a clear model.",
      "Forgetting to simplify the final answer when a smaller equivalent fraction is possible.",
    ];
  }
  if (text.includes("ratio") || text.includes("rate")) {
    return [
      "Reversing the order named in the problem. Write the ratio in the same order the words give you.",
      "Treating a part-to-part ratio like a part-to-whole fraction without checking what the whole is.",
    ];
  }
  if (text.includes("equation") || text.includes("expression")) {
    return [
      "Doing different operations to each side of an equation. Whatever you add, subtract, multiply, or divide on one side, do to the other.",
      "Combining unlike terms (like 3x and 4) as if they were the same kind of term.",
    ];
  }
  if (text.includes("percent")) {
    return [
      "Moving the decimal the wrong direction when converting between percents and decimals.",
      "Treating a percent increase and a percent of a number as the same operation.",
    ];
  }

  return [
    "Rushing to the answer without writing steps. Clear work helps you catch mistakes and shows your reasoning.",
    "Re-reading the question too quickly. Underline what you are solving for before you start calculating.",
  ];
}

function closingSections(topic: Topic): WalkthroughBlock[] {
  const ideas: string[] = [];
  for (const block of topic.walkthrough) {
    if (block.heading) ideas.push(block.heading);
    block.steps?.forEach((s) => ideas.push(s));
  }

  const summary = topic.summary.trim().endsWith(".") ? topic.summary.trim() : `${topic.summary.trim()}.`;

  return [
    {
      heading: "Why this matters",
      paragraphs: [
        summary,
        "These ideas show up on homework, quizzes, and the next unit in this grade. Getting comfortable here saves time later when the problems stack more steps together.",
      ],
    },
    {
      heading: "Common mistakes to avoid",
      paragraphs: commonMistakes(topic),
      callout: {
        label: "Before you continue",
        text: "Can you walk through one example out loud without looking? If not, redo a worked example once more before you move on.",
      },
    },
    {
      heading: "Key ideas from this lesson",
      steps: ideas.slice(0, 6).length > 0 ? ideas.slice(0, 6) : [topic.summary],
    },
  ];
}

/** Expands every topic walkthrough with extra teaching depth (PyPath-style). */
export function expandWalkthrough(topic: Topic): WalkthroughBlock[] {
  const usedKeys = new Set<string>();
  const usedParagraphs = new Set<string>();

  const core = topic.walkthrough.map((b) => enrichBlock(b, usedKeys, usedParagraphs));
  const withTryPrompts: WalkthroughBlock[] = [];

  for (const block of core) {
    withTryPrompts.push(block);
    if (block.example) {
      withTryPrompts.push({
        callout: {
          label: "Try it yourself",
          text: "Pick a similar problem with different numbers and work it on paper. When you finish, compare your steps to the worked example line by line.",
        },
      });
    }
  }

  return [...withTryPrompts, ...closingSections(topic)];
}
