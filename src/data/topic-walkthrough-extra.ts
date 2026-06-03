import type { WalkthroughBlock } from "./units";

/** Extra blocks appended to every topic walkthrough during enrichment. */
export function extraWalkthroughForTopic(title: string): WalkthroughBlock[] {
  return [
    {
      heading: "How to study this topic on Adam's Alphabet",
      steps: [
        "Read every Part above. Don't skip \"Let's solve one together.\"",
        "Watch the video. Pause once and copy an example into your notebook.",
        "Try every practice problem on paper before you peek at the answers.",
        "Take the quiz. Miss one? Go back and redo the practice for that skill.",
      ],
    },
    {
      heading: "Try it on your own",
      paragraphs: [
        `See if you can do a brand-new ${title.toLowerCase()} problem without looking back. Pick one practice problem, set a 5-minute timer, and write every step.`,
      ],
    },
    {
      callout: {
        label: "In class",
        text: "Line this topic up with what your teacher is doing this week. When class and this page match, math feels way easier.",
      },
    },
  ];
}

/** Per-topic overrides can be added here later; default uses the function above. */
export const TOPIC_WALKTHROUGH_EXTRA: Record<string, WalkthroughBlock[]> = {};
