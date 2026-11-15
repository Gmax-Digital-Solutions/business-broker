import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BusinessListingNotFound() {
  return (
    <main className="bg-brand-offwhite flex min-h-[70vh] flex-1 items-center justify-center px-5 py-16">
      <div className="border-border bg-card w-full max-w-xl rounded-lg border p-8 text-center">
        <p className="text-brand-bronze text-xs font-bold tracking-[0.14em] uppercase">
          Business opportunity
        </p>
        <h1 className="font-heading text-brand-navy mt-3 text-2xl font-semibold">
          This listing is no longer available
        </h1>
        <p className="text-brand-slate mt-3 text-sm leading-6">
          It may have sold, been withdrawn, or the address may be incorrect.
          Browse active opportunities to see what is currently available.
        </p>
        <Link
          className="bg-brand-navy text-primary-foreground hover:bg-brand-navy/90 focus-visible:outline-brand-navy mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
          href="/businesses-for-sale"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Browse businesses for sale
        </Link>
      </div>
    </main>
  );
}
