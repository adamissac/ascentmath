#!/usr/bin/env npx tsx
/**
 * Assert content data integrity: minutes, counts, slugs, quiz lengths.
 * Run: npm run audit:validate
 */
import {
  GRADES,
  countUnitVideos,
  countUnitWorksheets,
} from "../../src/data/units";

let errors = 0;

function fail(msg: string) {
  console.error(`FAIL: ${msg}`);
  errors++;
}

const slugs = new Set<string>();

for (const grade of GRADES) {
  for (const unit of grade.units) {
    const topicMinutesSum = unit.topics.reduce((s, t) => s + t.estimatedMinutes, 0);
    if (unit.estimatedMinutes !== topicMinutesSum) {
      fail(
        `${grade.slug}/${unit.slug}: unit minutes ${unit.estimatedMinutes} != sum of topic minutes ${topicMinutesSum}`
      );
    }

    if (unit.topics.length === 0) {
      fail(`${grade.slug}/${unit.slug}: no topics`);
    }

    const videoCount = countUnitVideos(unit);
    const worksheetCount = countUnitWorksheets(unit);
    void videoCount;
    void worksheetCount;

    for (const topic of unit.topics) {
      if (slugs.has(topic.slug)) {
        fail(`duplicate topic slug: ${topic.slug}`);
      }
      slugs.add(topic.slug);

      if (!topic.video?.videoId) {
        fail(`${topic.id}: missing video`);
      }
      if ((topic.exercises?.length ?? 0) < 1) {
        fail(`${topic.id}: expected exercises`);
      }
      if ((topic.quiz?.length ?? 0) < 1) {
        fail(`${topic.id}: expected quiz questions`);
      }
    }
  }
}

const totalUnits = GRADES.reduce((s, g) => s + g.units.length, 0);
const totalTopics = GRADES.reduce(
  (s, g) => s + g.units.reduce((n, u) => n + u.topics.length, 0),
  0
);

console.log(`Grades: ${GRADES.length}`);
console.log(`Units: ${totalUnits}`);
console.log(`Topics: ${totalTopics}`);
console.log(`Unique topic slugs: ${slugs.size}`);

if (errors === 0) {
  console.log("All content validation checks passed.");
  process.exit(0);
} else {
  console.error(`\n${errors} validation error(s).`);
  process.exit(1);
}
