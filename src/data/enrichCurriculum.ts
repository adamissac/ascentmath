import type { Grade, Topic, Unit } from "./units";
import { TOPIC_EXERCISES } from "./exercises";
import { TOPIC_QUIZ_EXTRA } from "./topic-quiz-extra";
import { TOPIC_WALKTHROUGH_EXTRA, extraWalkthroughForTopic } from "./topic-walkthrough-extra";
import { UNIT_SUPPLEMENTS } from "./unit-supplements";

function enrichTopic(topic: Topic): Topic {
  const exercises = TOPIC_EXERCISES[topic.id] ?? topic.exercises;
  const extraQuiz = TOPIC_QUIZ_EXTRA[topic.id] ?? [];
  const extraWalk = [
    ...extraWalkthroughForTopic(topic.title),
    ...(TOPIC_WALKTHROUGH_EXTRA[topic.id] ?? []),
  ];
  const skillChecks = topic.skillChecks ?? [];

  return {
    ...topic,
    exercises: exercises?.length ? exercises : topic.exercises,
    walkthrough: [...topic.walkthrough, ...extraWalk],
    quiz: [...topic.quiz, ...extraQuiz],
    skillChecks: skillChecks.length ? skillChecks : undefined,
    estimatedMinutes:
      topic.estimatedMinutes +
      Math.round((exercises?.length ?? 0) * 3) +
      Math.round(extraQuiz.length * 1.5),
  };
}

function enrichUnit(unit: Unit): Unit {
  const supplement = UNIT_SUPPLEMENTS[unit.id];
  const topics = unit.topics.map(enrichTopic);
  return {
    ...unit,
    topics,
    studyGuide: supplement?.studyGuide ?? unit.studyGuide,
    masteryOutcomes: supplement?.masteryOutcomes ?? unit.masteryOutcomes,
    estimatedMinutes: topics.reduce((s, t) => s + t.estimatedMinutes, 0),
  };
}

export function enrichGrades(grades: Grade[]): Grade[] {
  return grades.map((grade) => ({
    ...grade,
    units: grade.units.map(enrichUnit),
  }));
}
