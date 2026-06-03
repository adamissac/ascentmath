export type MathCredential = {
  label: string;
  value: string;
  detail: string;
};

export const TUTOR_INTRO = {
  title: "I'm Adam.",
  titleMuted: "I built this for kids like me.",
  meta: "Adam Issac · Denmark High · Class of 2026 · Taking new students",
  bio: "Senior at Denmark High. I tutor the high school AP and college math I earned top marks in, plus K-6 and middle school, and built free Grades 6-8 study paths on this site.",
  email: "adamissac08@gmail.com",
} as const;

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
