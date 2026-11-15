import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  LockKeyhole,
  MapPin,
} from "lucide-react";

import type { PublicListingSummary } from "@/src/features/listings/types";

export function ListingCard({ listing }: { listing: PublicListingSummary }) {
  return (
    <article className="border-border bg-card flex h-full flex-col overflow-hidden rounded-lg border">
      <div className="bg-gradient-to-br from-brand-navy via-brand-navy to-brand-slate text-primary-foreground relative flex min-h-36 items-center justify-between gap-4 p-5">
        <BriefcaseBusiness
          aria-hidden="true"
          className="text-brand-gold size-12 shrink-0"
          strokeWidth={1.4}
        />
        <span className="border-primary-foreground/30 bg-brand-navy/70 inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
          <LockKeyhole aria-hidden="true" className="size-3" />
          NDA required
        </span>
        <p className="text-brand-gold absolute right-4 bottom-3 left-4 truncate text-[0.65rem] font-bold tracking-[0.12em] uppercase">
          {listing.category}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-brand-slate flex items-center gap-1.5 text-sm">
          <MapPin
            aria-hidden="true"
            className="text-brand-bronze size-4 shrink-0"
          />
          {listing.location}
        </p>
        <h2 className="font-heading text-brand-navy mt-2 line-clamp-2 text-lg leading-snug font-semibold">
          {listing.title}
        </h2>
        <p className="text-brand-slate mt-2 min-h-10 text-sm leading-5">
          {listing.credentials ?? "Confidential business opportunity"}
        </p>
        <p className="border-border text-brand-slate mt-4 border-y py-3 text-xs leading-5">
          Financial and identifying details are shared after qualification and
          an executed NDA.
        </p>
        <Link
          className="bg-brand-bronze text-primary-foreground hover:bg-brand-bronze/90 focus-visible:outline-brand-navy mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          href={`/businesses/${encodeURIComponent(listing.slug)}`}
          prefetch={false}
        >
          Request NDA / CIM
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
