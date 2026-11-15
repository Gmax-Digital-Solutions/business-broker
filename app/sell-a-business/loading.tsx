export default function SellABusinessLoading() {
  return (
    <main
      aria-label="Loading seller advisory information"
      className="flex-1 animate-pulse bg-brand-offwhite"
    >
      <div className="bg-brand-navy px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="h-10 max-w-2xl rounded bg-primary-foreground/15" />
          <div className="mt-5 h-5 max-w-xl rounded bg-primary-foreground/10" />
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] space-y-5 px-5 py-16 sm:px-8 lg:px-10">
        <div className="h-8 max-w-md rounded bg-brand-navy/10" />
        <div className="h-40 rounded-lg bg-brand-navy/5" />
      </div>
    </main>
  );
}
