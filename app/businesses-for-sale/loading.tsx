export default function LoadingBusinessesForSale() {
  return (
    <main
      aria-label="Loading business listings"
      className="bg-brand-offwhite min-h-[70vh] flex-1"
      role="status"
    >
      <div className="mx-auto max-w-[1440px] animate-pulse px-5 py-12 sm:px-8 lg:px-10">
        <div className="bg-secondary h-4 w-48 rounded" />
        <div className="bg-secondary mt-8 h-10 max-w-xl rounded" />
        <div className="bg-secondary mt-3 h-5 max-w-2xl rounded" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <div className="border-border bg-card hidden h-[38rem] rounded-lg border lg:block" />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                aria-hidden="true"
                className="border-border bg-card h-[25rem] rounded-lg border"
                key={index}
              />
            ))}
          </div>
        </div>
        <span className="sr-only">Loading available opportunities.</span>
      </div>
    </main>
  );
}
