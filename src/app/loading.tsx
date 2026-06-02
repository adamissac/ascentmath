/** Home route loading — matches hero background so the swap is not a gray skeleton flash. */
export default function Loading() {
  return (
    <section
      className="flex min-h-[min(100dvh,920px)] items-center justify-center bg-[#FBFAF7] px-4"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <div className="skeleton h-6 w-48 rounded-full" />
        <div className="skeleton h-14 w-full max-w-sm rounded-lg" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="mt-4 flex w-full max-w-xs flex-col gap-3 sm:flex-row">
          <div className="skeleton h-12 flex-1 rounded-full" />
          <div className="skeleton h-12 flex-1 rounded-full" />
        </div>
      </div>
    </section>
  );
}
