import Link from "next/link";
import { ArrowUpRight, LockKeyhole, MapPin } from "lucide-react";

import type { FeaturedListing } from "@/src/features/home/types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type ListingCardProps = {
  listing: FeaturedListing;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="border-border bg-card flex h-full flex-col rounded-lg border p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div>
        <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold">
          NDA Required
        </span>
      </div>
      <p className="text-brand-slate mt-5 flex items-center gap-1.5 text-sm">
        <MapPin
          aria-hidden="true"
          className="text-brand-bronze size-4 shrink-0"
        />
        {listing.location}
      </p>
      <h3 className="font-heading text-brand-navy mt-2 text-xl leading-snug font-semibold">
        {listing.title}
      </h3>
      {listing.credentials ? (
        <p className="text-brand-slate mt-2 min-h-10 text-sm leading-5">
          {listing.credentials}
        </p>
      ) : (
        <div className="min-h-10" />
      )}
      <dl className="border-border mt-6 grid grid-cols-3 gap-2 border-y py-4">
        <div>
          <dt className="text-brand-slate text-[0.68rem] font-semibold tracking-wide uppercase">
            Cash flow
          </dt>
          <dd className="text-brand-navy mt-1 text-sm font-bold">
            {currency.format(listing.cashFlow)}
          </dd>
        </div>
        <div>
          <dt className="text-brand-slate text-[0.68rem] font-semibold tracking-wide uppercase">
            Revenue
          </dt>
          <dd className="text-brand-navy mt-1 text-sm font-bold">
            {currency.format(listing.revenue)}
          </dd>
        </div>
        <div>
          <dt className="text-brand-slate text-[0.68rem] font-semibold tracking-wide uppercase">
            Asking
          </dt>
          <dd className="text-brand-navy mt-1 text-sm font-bold">
            {currency.format(listing.askingPrice)}
          </dd>
        </div>
      </dl>
      <Link
        className="text-brand-navy decoration-brand-gold hover:text-brand-bronze focus-visible:outline-brand-navy mt-auto inline-flex min-h-11 items-center justify-between gap-3 pt-4 font-semibold underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        href={`/contact?listing=${encodeURIComponent(listing.slug)}`}
        prefetch={false}
      >
        <span className="inline-flex items-center gap-2">
          <LockKeyhole aria-hidden="true" className="size-4" />
          Request NDA / CIM
        </span>
        <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
      </Link>
    </article>
  );
}
