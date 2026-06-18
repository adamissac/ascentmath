import type { Topic, WalkthroughBlock } from "./units";

const DEPTH_BY_KEYWORD: Record<string, string[]> = {
  factor: [
    "A quick way to test factors: divide the number by each candidate. If the quotient is a whole number with no remainder, you found a factor.",
    "Every whole number has at least two factors: 1 and itself. Prime numbers have exactly those two — which is why primes are the building blocks for bigger numbers.",
  ],
  multiple: [
    "Multiples never end — you can always keep skip-counting. The first multiple of any number (except 0) is the number itself.",
    "When a word problem asks when two events happen together again, you are usually looking for a common multiple — often the least common multiple (LCM).",
  ],
  gcf: [
    "GCF is useful when you need the largest equal-sized groups you can make from two quantities. Example: 18 pencils and 24 erasers shared into identical kits with nothing left over — the kit size is the GCF.",
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
    "Like terms have the same variable raised to the same power. You can only combine like terms — 3x and 5x combine, but 3x and 3y do not.",
  ],
  area: [
    "Area measures how much space a flat shape covers, in square units. Picture tiles on a floor — each tile is one square unit.",
    "Break complicated shapes into rectangles or triangles you already know how to measure, then add the pieces together.",
  ],
  volume: [
    "Volume measures space inside a 3D object, in cubic units. Think of how many unit cubes would fill the shape.",
    "For prisms, volume is often (area of the base) × (height). The base and height must be perpendicular for that shortcut.",
  ],
};

function keywordExpansions(heading: string, body: string): string[] {
  const text = `${heading} ${body}`.toLowerCase();
  const out: string[] = [];
  for (const [key, paras] of Object.entries(DEPTH_BY_KEYWORD)) {
    if (text.includes(key)) out.push(...paras);
  }
  return [...new Set(out)].slice(0, 2);
}

function enrichBlock(block: WalkthroughBlock, topic: Topic): WalkthroughBlock {
  const paragraphs = [...(block.paragraphs ?? [])];
  const extra = keywordExpansions(block.heading ?? topic.title, paragraphs.join(" "));

  for (const p of extra) {
    if (!paragraphs.some((existing) => existing.includes(p.slice(0, 40)))) {
      paragraphs.push(p);
    }
  }

  if (block.heading && paragraphs.length < 3) {
    paragraphs.push(
      `When you study ${block.heading.toLowerCase()}, slow down and write one example in your notebook without looking at the screen. That active step is what turns reading into learning.`,
    );
  }

  return { ...block, paragraphs: paragraphs.length ? paragraphs : block.paragraphs };
}

function closingSections(topic: Topic): WalkthroughBlock[] {
  const ideas: string[] = [];
  for (const block of topic.walkthrough) {
    if (block.heading) ideas.push(block.heading);
    block.steps?.forEach((s) => ideas.push(s));
  }

  return [
    {
      heading: "Why this matters",
      paragraphs: [
        `${topic.title} shows up constantly in ${topic.summary.charAt(0).toLowerCase()}${topic.summary.slice(1)} It also connects to what you will see on homework, quizzes, and the next unit in this grade.`,
        "Teachers often move fast in class. This page is here so you can pause, re-read, and practice until the idea feels familiar — not just until you have memorized a rule for one day.",
      ],
    },
    {
      heading: "Common mistakes to avoid",
      paragraphs: [
        "Rushing to the answer without writing steps. Middle-school math rewards clear work — and you catch errors earlier when steps are visible.",
        "Mixing up similar ideas from the same topic. If two terms feel alike, make a two-column note: what is the same, what is different, and one example of each.",
      ],
      callout: {
        label: "Before you continue",
        text: `Can you explain ${topic.title} to someone else in two sentences without looking? If not, re-read the worked examples above once more.`,
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
  const core = topic.walkthrough.map((b) => enrichBlock(b, topic));
  const withTryPrompts: WalkthroughBlock[] = [];

  for (const block of core) {
    withTryPrompts.push(block);
    if (block.example) {
      withTryPrompts.push({
        callout: {
          label: "Try it yourself",
          text: `Close the solution and try this on paper: ${block.example.problem} When you finish, compare your steps to the worked example line by line.`,
        },
      });
    }
  }

  return [...withTryPrompts, ...closingSections(topic)];
}
