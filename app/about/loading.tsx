export default function LoadingAboutPage() {
  return (
    <main
      aria-label="Loading about information"
      className="bg-brand-offwhite min-h-[70vh] flex-1"
      role="status"
    >
      <div className="mx-auto max-w-[1440px] animate-pulse px-5 py-12 sm:px-8 lg:px-10">
        <div className="bg-secondary h-4 w-48 rounded" />
        <div className="bg-secondary mt-8 h-10 max-w-3xl rounded" />
        <div className="bg-secondary mt-3 h-5 max-w-2xl rounded" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              aria-hidden="true"
              className="border-border bg-card h-52 rounded-lg border"
              key={index}
            />
          ))}
        </div>
        <span className="sr-only">Loading about information.</span>
      </div>
    </main>
  );
}
