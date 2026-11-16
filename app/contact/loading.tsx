export default function LoadingContactPage() {
  return (
    <main
      aria-label="Loading contact information"
      className="bg-brand-offwhite min-h-[70vh] flex-1"
      role="status"
    >
      <div className="mx-auto max-w-[1440px] animate-pulse px-5 py-12 sm:px-8 lg:px-10">
        <div className="bg-secondary h-4 w-48 rounded" />
        <div className="bg-secondary mt-8 h-10 max-w-2xl rounded" />
        <div className="bg-secondary mt-3 h-5 max-w-xl rounded" />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            aria-hidden="true"
            className="border-border bg-card h-[38rem] rounded-lg border"
          />
          <div className="space-y-4">
            <div
              aria-hidden="true"
              className="border-border bg-card h-56 rounded-lg border"
            />
            <div
              aria-hidden="true"
              className="border-border bg-card h-40 rounded-lg border"
            />
          </div>
        </div>
        <span className="sr-only">Loading contact information.</span>
      </div>
    </main>
  );
}
