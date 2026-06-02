type Props = {
  driveFileId: string;
  title: string;
  description?: string;
};

export default function WorksheetCard({ driveFileId, title, description }: Props) {
  const thumb = `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w640`;
  const view = `https://drive.google.com/file/d/${driveFileId}/view`;
  const download = `https://drive.google.com/uc?export=download&id=${driveFileId}`;

  return (
    <article className="card card-interactive overflow-hidden flex flex-col">
      {/* Compact preview - a thumbnail of the first page, not the full document */}
      <a
        href={view}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-44 bg-[var(--color-surface-2)] overflow-hidden"
        aria-label={`Preview ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/95 text-[var(--color-brand-700)] caption font-semibold shadow-sm">
          <DocIcon />
          Worksheet
        </span>
      </a>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display font-semibold text-base leading-snug">{title}</h3>
        {description && <p className="small text-[var(--color-ink-muted)] flex-1">{description}</p>}
        <div className="mt-1 flex gap-2 flex-wrap btn-stack-mobile">
          <a
            href={view}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Open in Drive
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </a>
          <a
            href={download}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
          >
            Download
          </a>
        </div>
      </div>
    </article>
  );
}

function DocIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}
