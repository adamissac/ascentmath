import type { Unit } from "../data/units";
import WorksheetCard from "./WorksheetCard";

type Props = {
  unit: Unit;
};

/** Renders Adam worksheets attached to topics in this unit (free study-path resource). */
export default function UnitWorksheetsSection({ unit }: Props) {
  const worksheets = unit.topics
    .filter((t) => t.worksheet)
    .map((t) => ({
      topicTitle: t.title,
      ...t.worksheet!,
    }));

  if (worksheets.length === 0) return null;

  return (
    <section id="worksheets" className="scroll-mt-24" aria-labelledby="unit-worksheets-heading">
      <h2 id="unit-worksheets-heading" className="h3">
        Worksheets
      </h2>
      <p className="small mt-2 text-[var(--color-ink-muted)]">
        Printable practice for this unit. Open in Google Drive or download — always free.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {worksheets.map((ws) => (
          <WorksheetCard
            key={ws.driveFileId}
            driveFileId={ws.driveFileId}
            title={ws.title}
            description={ws.description ?? `From topic: ${ws.topicTitle}`}
          />
        ))}
      </div>
    </section>
  );
}
