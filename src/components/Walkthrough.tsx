"use client";

import type { WalkthroughBlock } from "../data/units";

function isCalloutOnlyBlock(block: WalkthroughBlock) {
  return (
    Boolean(block.callout) &&
    !block.heading &&
    !(block.paragraphs?.length ?? 0) &&
    !(block.steps?.length ?? 0) &&
    !block.example
  );
}

type Props = {
  blocks: WalkthroughBlock[];
  topicTitle?: string;
};

export default function Walkthrough({ blocks, topicTitle }: Props) {
  const lessonBlocks = blocks.filter((b) => !isCalloutOnlyBlock(b));

  return (
    <div className="lesson-prose">
      {topicTitle && (
        <p className="lesson-prose__lede">
          This lesson teaches <strong>{topicTitle}</strong>. Read each section in order, work
          through every example on paper, then use the practice problems and quick check at the
          bottom.
        </p>
      )}

      {lessonBlocks.map((block, i) => (
        <LessonSection key={i} block={block} />
      ))}

      {blocks.filter(isCalloutOnlyBlock).map((b, i) =>
        b.callout ? <Note key={`c-${i}`} title={b.callout.label} text={b.callout.text} /> : null
      )}
    </div>
  );
}

function LessonSection({ block }: { block: WalkthroughBlock }) {
  const isKeyIdeas = block.heading?.toLowerCase().includes("key ideas");

  return (
    <section className="lesson-prose__section">
      {block.heading && (
        <h3 className={isKeyIdeas ? "lesson-prose__h3 lesson-prose__h3--sub" : "lesson-prose__h3"}>
          {block.heading}
        </h3>
      )}

      {block.paragraphs?.map((para, j) => (
        <p key={j} className="lesson-prose__p">
          {para}
        </p>
      ))}

      {block.steps && block.steps.length > 0 && (
        <ol className={isKeyIdeas ? "lesson-key-list" : "lesson-step-cards"}>
          {block.steps.map((step, k) => (
            <li key={k} className={isKeyIdeas ? "lesson-key-list__item" : "lesson-step-cards__item"}>
              {!isKeyIdeas && <span className="lesson-step-cards__num">{k + 1}</span>}
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}

      {block.example && <WorkedExample example={block.example} />}
      {block.callout && <Note title={block.callout.label} text={block.callout.text} />}
    </section>
  );
}

function WorkedExample({
  example,
}: {
  example: NonNullable<WalkthroughBlock["example"]>;
}) {
  return (
    <figure className="lesson-example">
      <figcaption className="lesson-example__label">Worked example</figcaption>
      <p className="lesson-example__problem">{example.problem}</p>
      <ol className="lesson-example__steps">
        {example.solution.map((line, m) => (
          <li key={m}>
            <span className="lesson-example__step-num">{m + 1}</span>
            <span>{line}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Note({ title, text }: { title: string; text: string }) {
  const tone = (() => {
    const t = title.toLowerCase();
    if (t.includes("mistake") || t.includes("watch") || t.includes("avoid")) return "warn";
    if (t.includes("key") || t.includes("remember") || t.includes("tip")) return "tip";
    if (t.includes("why")) return "accent";
    return "info";
  })();

  return (
    <aside className={`lesson-note lesson-note--${tone}`}>
      <p className="lesson-note__title">{title}</p>
      <p className="lesson-note__text">{text}</p>
    </aside>
  );
}
