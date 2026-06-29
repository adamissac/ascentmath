import { SITE_BRAND_NAME } from "./site-team";

export type AccordionItem = { q: string; a: string };

export function unitAccordion(unitTitle: string, gradeTitle: string): AccordionItem[] {
  return [
    {
      q: `What is this unit about?`,
      a: `${unitTitle} is part of ${gradeTitle} on ${SITE_BRAND_NAME}. Work through topics in order or jump to what your class is covering. Each topic has a lesson, video, practice, and quiz.`,
    },
    {
      q: "How should I use the study guide?",
      a: "Read the study guide on this page before topic 1. It lists habits that help: notebook work, pausing the video, and checking solutions only after you try.",
    },
    {
      q: "What are the learning objectives for?",
      a: "They describe what you should be able to do after the unit. Use them as a checklist before a test or when reviewing with a parent or tutor.",
    },
    {
      q: "What are the external practice links?",
      a: "Extra hand-picked resources (often Khan Academy or worksheet sites) when you want more reps beyond what's built into each topic.",
    },
  ];
}

export function topicAccordion(topicTitle: string): AccordionItem[] {
  return [
    {
      q: "What order should I follow on this page?",
      a: "Step 1: read the lesson. Step 2: watch the video. Step 3: practice on paper. Step 4: take the quiz. Don't skip the worked examples in the lesson.",
    },
    {
      q: "Can I retake the quiz?",
      a: "Yes, as many times as you want. Read the explanations after each attempt; they tell you what to fix before moving on.",
    },
    {
      q: "The video still confuses me. What now?",
      a: "Re-read the lesson's \"Let's solve one together\" section, try one practice problem slowly, or ask a tutor. A second video is included on some topics if you want another explanation.",
    },
    {
      q: `How do I know I'm ready to leave ${topicTitle}?`,
      a: "You can solve a similar problem without looking back, and you score at least 80% on the quiz. If not, redo practice for the skills you missed.",
    },
  ];
}
