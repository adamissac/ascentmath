import { ADAM_EMAIL, ALAN_EMAIL } from "./site-team";

export type MathCredential = {
  label: string;
  value: string;
  detail: string;
};

export type TutorIntro = {
  name: string;
  title: string;
  titleMuted: string;
  meta: string;
  bio: string;
  email: string;
  storyHref?: string;
};

export const TUTOR_INTRO: TutorIntro = {
  name: "Adam",
  title: "I'm Adam.",
  titleMuted: "Co-founder of Adam's Alphabet.",
  meta: "Adam Issac · Denmark High · Class of 2026 · Taking new students",
  bio: "Senior at Denmark High. I co-founded Adam's Alphabet with Alan to tutor the high school AP and college math I earned top marks in, plus K-5 and middle school — and built free Grades 6-8 study paths on this site.",
  email: ADAM_EMAIL,
  storyHref: "/about",
};

export const ALAN_INTRO: TutorIntro = {
  name: "Alan",
  title: "I'm Alan.",
  titleMuted: "Co-founder of Adam's Alphabet.",
  meta: "Alan Mozhoor · Taking new students",
  bio: "Bio details coming soon. Alan co-founded Adam's Alphabet with Adam to offer clear, patient 1-on-1 math help from elementary through college.",
  email: ALAN_EMAIL,
  storyHref: "/about",
};

export const MATH_CREDENTIALS: readonly MathCredential[] = [
  { label: "SAT Math", value: "800", detail: "Perfect score" },
  { label: "Algebra EOC", value: "100%", detail: "EOC" },
  { label: "AP Pre-Calculus", value: "5", detail: "AP exam" },
  { label: "AP Calculus AB", value: "97%", detail: "Class grade · 5 on AP exam" },
  { label: "AP Calculus BC", value: "97%", detail: "Class grade · 5 on AP exam" },
  {
    label: "GT Multivariable Calc & Linear Algebra",
    value: "98%+",
    detail: "Georgia Tech courses",
  },
] as const;

export const ALAN_CREDENTIALS: readonly MathCredential[] = [
  { label: "Credential 1", value: "TBD", detail: "Coming soon" },
  { label: "Credential 2", value: "TBD", detail: "Coming soon" },
  { label: "Credential 3", value: "TBD", detail: "Coming soon" },
  { label: "Credential 4", value: "TBD", detail: "Coming soon" },
  { label: "Credential 5", value: "TBD", detail: "Coming soon" },
  { label: "Credential 6", value: "TBD", detail: "Coming soon" },
] as const;
