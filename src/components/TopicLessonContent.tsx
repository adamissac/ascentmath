import type { ReactNode } from "react";
import VideoEmbed from "./VideoEmbed";
import WorksheetCard from "./WorksheetCard";
import ResourceLinkCard from "./ResourceLinkCard";
import Quiz from "./Quiz";
import TopicExercises from "./TopicExercises";
import Walkthrough from "./Walkthrough";
import type { Topic } from "../data/units";
import { SCROLL_ANCHOR_CLASS } from "../lib/scroll-to-hash";

type Props = {
  topic: Topic;
};

function BodySection({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`lesson-body-section ${SCROLL_ANCHOR_CLASS}`}>
      <h2 className="lesson-body-section__title">{title}</h2>
      <div className="lesson-body-section__content">{children}</div>
    </section>
  );
}

export default function TopicLessonContent({ topic: t }: Props) {
  const hasExercises = (t.exercises?.length ?? 0) > 0;
  const hasPractice =
    hasExercises || Boolean(t.worksheet) || (t.practiceLinks?.length ?? 0) > 0;

  return (
    <article className="lesson-body-card">
      <BodySection title="The lesson" id="learn">
        <Walkthrough blocks={t.walkthrough} />
      </BodySection>

      <BodySection title="Video walkthroughs" id="watch">
        <div className="lesson-video-grid">
          {(t.videos ?? [t.video, ...(t.extraVideo ? [t.extraVideo] : [])]).map((video) => (
            <VideoEmbed
              key={video.videoId}
              size="compact"
              videoId={video.videoId}
              title={video.title}
              source={video.source}
              description={video.description}
              className="w-full"
            />
          ))}
        </div>
      </BodySection>

      {hasPractice && (
      <BodySection title="Practice" id="practice">
        <p className="lesson-prose__p">
          For each problem: write your work in the box, type your answer, and check it. If you are
          stuck, reveal the solution one step at a time. Do not skip straight to the final answer.
        </p>
          <div className="lesson-practice-stack">
            {hasExercises && t.exercises && (
              <TopicExercises exercises={t.exercises} />
            )}
            {t.worksheet && <WorksheetCard {...t.worksheet} />}
            {t.practiceLinks && t.practiceLinks.length > 0 && (
              <div className="lesson-practice-links">
                {t.practiceLinks.map((r) => (
                  <ResourceLinkCard
                    key={r.href}
                    href={r.href}
                    title={r.title}
                    description={r.description}
                    source={r.source}
                  />
                ))}
              </div>
            )}
          </div>
        </BodySection>
      )}

      {t.quiz.length > 0 && (
        <BodySection title="Quick check" id="quiz">
          <p className="lesson-prose__p">
            Answer all questions. Retake the quiz until you feel confident before moving on.
          </p>
          <Quiz title={t.title} questions={t.quiz} />
        </BodySection>
      )}
    </article>
  );
}
