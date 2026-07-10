import type { Grade, Topic, Unit } from "./units";
import { buildTopicVideos } from "./build-topic-videos";
import { TOPIC_EXERCISES } from "./exercises";
import { TOPIC_QUIZ_EXTRA } from "./topic-quiz-extra";
import { expandWalkthrough } from "./topic-lesson-depth";
import { UNIT_SUPPLEMENTS } from "./unit-supplements";

function enrichTopic(topic: Topic): Topic {
  const exercises = TOPIC_EXERCISES[topic.id] ?? topic.exercises;
  const extraQuiz = TOPIC_QUIZ_EXTRA[topic.id] ?? [];
  const walkthrough = expandWalkthrough(topic);
  const skillChecks = topic.skillChecks ?? [];

  return {
    ...topic,
    videos: buildTopicVideos(topic),
    exercises: exercises?.length ? exercises : topic.exercises,
    walkthrough,
    quiz: [...topic.quiz, ...extraQuiz],
    skillChecks: skillChecks.length ? skillChecks : undefined,
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
