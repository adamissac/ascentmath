import {
  PRICING_FAQ_HOW_MUCH,
  PRICING_FAQ_TIERS,
  SELF_STUDY_FREE_NOTE,
} from "./pricing";

export type AccordionItem = { q: string; a: string };

export const HOME_ACCORDION: AccordionItem[] = [
  {
    q: "Are the Grades 6-8 study paths really free?",
    a: SELF_STUDY_FREE_NOTE,
  },
  {
    q: "Do I need an account to use the lessons?",
    a: "No account is required for the self-paced paths. Open a grade, pick a unit, and start a topic. Sign in only if you want to save progress on your dashboard.",
  },
  {
    q: "What if I need a real tutor, not just videos?",
    a: "Book a paid 1-on-1 session with Adam for K-6 through college math. Tiers are grouped by grade band; rates are confirmed when you book.",
  },
  {
    q: "How is each topic organized?",
    a: "Every topic follows the same four steps: read the lesson, watch a video, practice on paper, then take a short quiz. You can retake quizzes as many times as you want.",
  },
];

export const MATHEMATICS_HUB_ACCORDION: AccordionItem[] = [
  {
    q: "Which grade should I pick?",
    a: "Choose the grade you're in at school. If you're between grades or reviewing, start one grade below what feels hard, then move up.",
  },
  {
    q: "Can I skip around inside a grade?",
    a: "Yes. Units are ordered to build on each other, but you can jump to whatever matches your class this week.",
  },
  {
    q: "Are these aligned with Georgia standards?",
    a: "Yes. Paths follow Georgia DOE (GADOE) expectations for Grades 6-8. Official unit frameworks are linked from each unit when available.",
  },
  {
    q: "Not sure where to start?",
    a: "Use Find your start on this site. Answer a few questions and we'll suggest a unit and topic.",
  },
];

export function gradeAccordion(gradeTitle: string): AccordionItem[] {
  return [
    {
      q: `How long does ${gradeTitle} take to finish?`,
      a: "It depends how deep you go. Each topic lists an estimated time. Doing every video, practice set, and quiz for every unit is a full-year workload. Most students use this alongside class, one unit at a time.",
    },
    {
      q: "Should I do the units in order?",
      a: "Following unit order helps ideas stack cleanly. If your teacher is on Unit 4, start there. You can always backfill earlier units later.",
    },
    {
      q: "What counts as \"done\" on a topic?",
      a: "Read the lesson, watch the video, try practice without peeking at answers, then pass the quick quiz (aim for at least 80%). Mark topics complete on your dashboard if you're signed in.",
    },
    {
      q: "When should I book tutoring instead?",
      a: "Use these paths for steady practice. Book a session when you're stuck on homework, test prep, or a concept that still doesn't click after a full topic.",
    },
  ];
}

export function unitAccordion(unitTitle: string, gradeTitle: string): AccordionItem[] {
  return [
    {
      q: `What is this unit about?`,
      a: `${unitTitle} is part of ${gradeTitle} on Adam's Alphabet. Work through topics in order or jump to what your class is covering. Each topic has a lesson, video, practice, and quiz.`,
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

export const ABOUT_ACCORDION: AccordionItem[] = [
  {
    q: "Who is Adam's Alphabet for?",
    a: "Students who want clear math help: free self-paced paths for Grades 6-8, and paid tutoring from K-6 through high school, AP, and college courses.",
  },
  {
    q: "Why build free study paths?",
    a: "Not every family can pay for private tutoring every week. The site started at a kitchen table with two students and grew into full grade-level paths anyone can use.",
  },
  {
    q: "How is tutoring different from the site lessons?",
    a: "Lessons on the site are self-paced and general. Tutoring is live, 1-on-1, and tailored to your homework, pace, and goals.",
  },
  {
    q: "What's coming next on the site?",
    a: "More original walkthroughs, worksheets, and practice, based on what real students keep asking about across all three middle-school grades.",
  },
];

export const FIND_START_ACCORDION: AccordionItem[] = [
  {
    q: "How accurate is the suggestion?",
    a: "It's a starting point based on your grade and what you're studying, not a perfect match to every school. Adjust up or down a unit if it feels too easy or hard.",
  },
  {
    q: "I already know the exact topic name",
    a: "Skip the finder and browse study paths. Every unit lists its topics with summaries.",
  },
  {
    q: "Can parents use this for their student?",
    a: "Yes. Answer the questions with what the student is doing in class this month, then open the suggested topic together.",
  },
  {
    q: "Do I need to sign in?",
    a: "No. The finder sends you straight to a public lesson page. Sign in only if you want to track completion.",
  },
];

export const FRAMEWORKS_ACCORDION: AccordionItem[] = [
  {
    q: "What is a GADOE curriculum framework?",
    a: "An official Georgia Department of Education document that spells out what teachers teach in each unit, key vocabulary, and what mastery looks like on assessments.",
  },
  {
    q: "Do I have to read the whole PDF?",
    a: "No. Skim unit objectives and vocabulary before you start lessons on this site. Use sample tasks when you want to see exam-style questions.",
  },
  {
    q: "How does this connect to Adam's Alphabet units?",
    a: "Each unit on the site maps to the same big ideas as the frameworks. Links open the official PDF for your grade when one is available.",
  },
  {
    q: "I'm a student. Is this for me?",
    a: "It can help before a test or when you're confused about what your teacher expects. The lessons on this site are usually easier to follow than raw framework text.",
  },
];

export const DASHBOARD_ACCORDION: AccordionItem[] = [
  {
    q: "Does my progress save automatically?",
    a: "Yes. While you're signed in, completed topics on study paths are stored on your dashboard. Sign out and back in on the same account to see them again.",
  },
  {
    q: "Can I use the site without signing in?",
    a: "Yes. All Grades 6-8 lessons stay free without an account. Sign in only if you want a saved checklist of finished topics.",
  },
  {
    q: "How do I book tutoring from here?",
    a: "Use Book a session and pick your tier on the form. Adam follows up by call or email with times and pricing for your level.",
  },
  {
    q: "Something looks wrong on my progress",
    a: "Try refreshing the page while signed in. Progress is per topic on each unit page. Use the mark-complete control at the top of a lesson.",
  },
];

export const BOOK_PAGE_ACCORDION: AccordionItem[] = [
  {
    q: "How much does tutoring cost?",
    a: PRICING_FAQ_HOW_MUCH,
  },
  {
    q: "What are the three tiers?",
    a: PRICING_FAQ_TIERS,
  },
  {
    q: "What subjects do you tutor?",
    a: "K-6 foundations, pre-algebra through algebra II, geometry, SAT Math, AP Pre-Calc, AP Calc AB & BC, linear algebra, and multivariable calculus.",
  },
  {
    q: "How long is a session?",
    a: "Most sessions run 45-60 minutes. Shorter sessions work for a quick question.",
  },
  {
    q: "How quickly will Adam reply?",
    a: "Usually within a day. On busy school days, allow up to 48 hours.",
  },
];
