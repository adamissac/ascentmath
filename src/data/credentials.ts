import { ADAM_EMAIL, ALAN_EMAIL, SITE_BRAND_NAME } from "./site-team";

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
  titleMuted: `Co-founder of ${SITE_BRAND_NAME}.`,
  meta: "Adam Issac · Math + CS @ Georgia Tech · Taking new students",
  bio: `Math + CS @ Georgia Tech. I co-founded ${SITE_BRAND_NAME} with Alan. Together we tutor the high school AP and college math we've earned top marks in, plus K-5 and middle school, and we built the free Grades 6-8 study paths on this site.`,
  email: ADAM_EMAIL,
};

export const ALAN_INTRO: TutorIntro = {
  name: "Alan",
  title: "I'm Alan.",
  titleMuted: `Co-founder of ${SITE_BRAND_NAME}.`,
  meta: "Alan Mozhoor · Math + CS @ Georgia Tech · Taking new students",
  bio: `Math + CS @ Georgia Tech. I co-founded ${SITE_BRAND_NAME} with Adam. Together we tutor pre-algebra through AP Calculus, AP Statistics, linear algebra, multivariable calculus, and SAT/ACT prep, with the same patient, step-by-step approach we use in our own classes. We also built the free Grades 6-8 study paths on this site.`,
  email: ALAN_EMAIL,
};

export const MATH_CREDENTIALS: readonly MathCredential[] = [
  { label: "SAT Math", value: "800", detail: "Perfect score" },
  { label: "Algebra EOC", value: "100%", detail: "End-of-Course exam" },
  { label: "AP Pre-Calculus", value: "5", detail: "AP exam" },
  { label: "AP Calculus AB", value: "97%", detail: "Class grade, 5 on AP exam" },
  { label: "AP Calculus BC", value: "97%", detail: "Class grade, 5 on AP exam" },
  {
    label: "GT Multivariable Calc & Linear Algebra",
    value: "98%+",
    detail: "Georgia Tech courses",
  },
  {
    label: "GT CS 1331",
    value: "95%+",
    detail: "Intro to Object-Oriented Programming",
  },
] as const;

export const ALAN_CREDENTIALS: readonly MathCredential[] = [
  { label: "ACT Math", value: "36", detail: "Perfect score" },
  { label: "AP Calculus AB", value: "95%", detail: "Class grade, 5 on AP exam" },
  { label: "AP Calculus BC", value: "95%", detail: "Class grade, 5 on AP exam" },
  { label: "AP Statistics", value: "97%", detail: "Class grade" },
  {
    label: "GT Linear Algebra & Multivariable Calc",
    value: "95%",
    detail: "Georgia Tech courses",
  },
  { label: "GHP Math Major", value: "Selected", detail: "Governor's Honors Program" },
  {
    label: "MathWorks Math Modeling (M3)",
    value: "Honorable Mention",
    detail: "Top 30 of 770 nationally",
  },
] as const;
