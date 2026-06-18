import type { ReactNode } from "react";
import VideoEmbed from "./VideoEmbed";
import WorksheetCard from "./WorksheetCard";
import ResourceLinkCard from "./ResourceLinkCard";
import Quiz from "./Quiz";
import TopicExercises from "./TopicExercises";
import Walkthrough from "./Walkthrough";
import type { Topic } from "../data/units";

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
    <section id={id} className="lesson-body-section scroll-mt-24">
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
        <Walkthrough blocks={t.walkthrough} topicTitle={t.title} />
      </BodySection>

      <BodySection title="Video walkthrough" id="watch">
        <div className={t.extraVideo ? "lesson-video-grid" : "lesson-video-single"}>
          <VideoEmbed
            size="compact"
            videoId={t.video.videoId}
            title={t.video.title}
            source={t.video.source}
            description={t.video.description}
            className="w-full"
          />
          {t.extraVideo && (
            <VideoEmbed
              size="compact"
              videoId={t.extraVideo.videoId}
              title={t.extraVideo.title}
              source={t.extraVideo.source}
              description={t.extraVideo.description}
              className="w-full"
            />
          )}
        </div>
      </BodySection>

      {hasPractice && (
      <BodySection title="Practice" id="practice">
        <p className="lesson-prose__p">
          For each problem: write your work in the box, type your answer, and check it. If you are
          stuck, reveal the solution one step at a time — do not skip straight to the final answer.
        </p>
          <div className="lesson-practice-stack">
            {hasExercises && t.exercises && (
              <TopicExercises title={t.title} exercises={t.exercises} />
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
