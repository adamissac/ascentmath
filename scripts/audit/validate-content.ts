#!/usr/bin/env npx tsx
/**
 * Assert content data integrity: minutes, counts, slugs, quiz lengths,
 * and intra-topic duplicate paragraphs.
 * Run: npm run audit:validate
 */
import {
  GRADES,
  VIDEOS_PER_TOPIC,
  countUnitVideos,
  countUnitWorksheets,
} from "../../src/data/units";

let errors = 0;

function fail(msg: string) {
  console.error(`FAIL: ${msg}`);
  errors++;
}

function normalizeParagraph(p: string) {
  return p.replace(/\s+/g, " ").trim().toLowerCase();
}

const slugs = new Set<string>();
const EXPECTED = {
  "grade-6": { units: 7, topics: 22 },
  "grade-7": { units: 6, topics: 17 },
  "grade-8": { units: 7, topics: 16 },
} as const;

for (const grade of GRADES) {
  const unitCount = grade.units.length;
  const topicCount = grade.units.reduce((n, u) => n + u.topics.length, 0);
  const expected = EXPECTED[grade.slug as keyof typeof EXPECTED];
  if (expected) {
    if (unitCount !== expected.units) {
      fail(`${grade.slug}: expected ${expected.units} units, got ${unitCount}`);
    }
    if (topicCount !== expected.topics) {
      fail(`${grade.slug}: expected ${expected.topics} topics, got ${topicCount}`);
    }
  }

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

    void countUnitVideos(unit);
    void countUnitWorksheets(unit);

    for (const topic of unit.topics) {
      if (slugs.has(topic.slug)) {
        fail(`duplicate topic slug: ${topic.slug}`);
      }
      slugs.add(topic.slug);

      if (topic.estimatedMinutes < 5 || topic.estimatedMinutes > 120) {
        fail(`${topic.id}: estimatedMinutes ${topic.estimatedMinutes} out of range`);
      }

      if (!topic.video?.videoId) {
        fail(`${topic.id}: missing video`);
      }
      if ((topic.videos?.length ?? 0) !== VIDEOS_PER_TOPIC) {
        fail(`${topic.id}: expected ${VIDEOS_PER_TOPIC} videos, got ${topic.videos?.length ?? 0}`);
      }
      const videoIds = topic.videos?.map((v) => v.videoId) ?? [];
      if (new Set(videoIds).size !== videoIds.length) {
        fail(`${topic.id}: duplicate video IDs in videos array`);
      }
      if ((topic.exercises?.length ?? 0) < 1) {
        fail(`${topic.id}: expected exercises`);
      }
      if ((topic.quiz?.length ?? 0) < 1) {
        fail(`${topic.id}: expected quiz questions`);
      }

      const paras: string[] = [];
      for (const block of topic.walkthrough) {
        for (const p of block.paragraphs ?? []) {
          const key = normalizeParagraph(p);
          if (key.length < 40) continue;
          if (paras.includes(key)) {
            fail(`${topic.id}: duplicate paragraph within topic: "${p.slice(0, 72)}…"`);
          }
          paras.push(key);
        }
      }
    }
  }
}

const totalUnits = GRADES.reduce((s, g) => s + g.units.length, 0);
const totalTopics = GRADES.reduce(
  (s, g) => s + g.units.reduce((n, u) => n + u.topics.length, 0),
  0
);

if (totalUnits !== 20) fail(`site-wide units: expected 20, got ${totalUnits}`);
if (totalTopics !== 55) fail(`site-wide topics: expected 55, got ${totalTopics}`);

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
