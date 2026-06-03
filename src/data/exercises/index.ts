import type { PracticeExercise } from "../units";
import { TOPIC_EXERCISES_GRADE_6 } from "./grade6";
import { TOPIC_EXERCISES_GRADE_7 } from "./grade7";
import { TOPIC_EXERCISES_GRADE_8 } from "./grade8";

export const TOPIC_EXERCISES: Record<string, PracticeExercise[]> = {
  ...TOPIC_EXERCISES_GRADE_6,
  ...TOPIC_EXERCISES_GRADE_7,
  ...TOPIC_EXERCISES_GRADE_8,
};
