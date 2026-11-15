export default function LoadingBusinessListingDetail() {
  return (
    <main
      aria-label="Loading business listing"
      className="bg-brand-offwhite min-h-[70vh] flex-1"
      role="status"
    >
      <div className="mx-auto max-w-[1440px] animate-pulse px-5 py-10 sm:px-8 lg:px-10">
        <div className="bg-secondary h-4 w-56 rounded" />
        <div className="bg-secondary mt-8 h-10 max-w-3xl rounded" />
        <div className="bg-secondary mt-3 h-5 max-w-lg rounded" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(19rem,0.8fr)]">
          <div className="space-y-6">
            <div className="border-border bg-card h-80 rounded-lg border sm:h-[25rem]" />
            <div className="border-border bg-card h-64 rounded-lg border" />
          </div>
          <div className="border-border bg-card h-[38rem] rounded-lg border" />
        </div>
        <span className="sr-only">Loading confidential listing details.</span>
      </div>
    </main>
  );
}
