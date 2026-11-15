import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  LockKeyhole,
  MapPin,
} from "lucide-react";

import type { PublicCommercialProperty } from "@/src/features/commercial/types";
import {
  commercialPropertyTypes,
  commercialTransactions,
} from "@/src/features/commercial/types";

export function CommercialPropertyCard({
  featured = false,
  property,
}: {
  featured?: boolean;
  property: PublicCommercialProperty;
}) {
  const propertyType = commercialPropertyTypes.find(
    (option) => option.value === property.propertyType,
  );
  const transaction = commercialTransactions.find(
    (option) => option.value === property.transactionType,
  );

  return (
    <article className="border-border bg-card flex h-full flex-col overflow-hidden rounded-lg border">
      <div className="bg-gradient-to-br from-brand-navy via-brand-navy to-brand-slate text-primary-foreground relative flex min-h-40 items-center justify-between gap-4 p-5">
        <Building2
          aria-hidden="true"
          className="text-brand-gold size-12 shrink-0"
          strokeWidth={1.4}
        />
        <div className="flex flex-col items-end gap-2">
          {property.illustrative ? (
            <span className="bg-brand-offwhite text-brand-bronze rounded-sm px-2 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
              Illustrative preview
            </span>
          ) : null}
          {featured ? (
            <span className="border-primary-foreground/30 bg-brand-navy/70 rounded-sm border px-2 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
              Featured
            </span>
          ) : null}
        </div>
        <p className="text-brand-gold absolute right-4 bottom-3 left-4 truncate text-[0.65rem] font-bold tracking-[0.12em] uppercase">
          {propertyType?.label ?? "Commercial property"}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-brand-slate flex items-center gap-1.5 text-sm">
          <MapPin
            aria-hidden="true"
            className="text-brand-bronze size-4 shrink-0"
          />
          {property.county} County, Florida
        </p>
        <h3 className="font-heading text-brand-navy mt-2 text-lg leading-snug font-semibold">
          {property.title}
        </h3>
        <p className="text-brand-slate mt-2 text-sm leading-6">
          {property.summary}
        </p>
        <dl className="border-border text-brand-slate mt-4 grid grid-cols-2 gap-3 border-y py-3 text-xs">
          <div>
            <dt className="font-semibold">Transaction</dt>
            <dd className="text-brand-navy mt-1">
              {transaction?.label ?? "Commercial"}
            </dd>
          </div>
          {property.buildingAreaSqFt ? (
            <div>
              <dt className="font-semibold">Building area</dt>
              <dd className="text-brand-navy mt-1">
                {new Intl.NumberFormat("en-US").format(
                  property.buildingAreaSqFt,
                )}{" "}
                sq ft
              </dd>
            </div>
          ) : null}
        </dl>
        <p className="text-brand-slate mt-3 flex items-start gap-2 text-xs leading-5">
          <LockKeyhole
            aria-hidden="true"
            className="text-brand-bronze mt-0.5 size-3.5 shrink-0"
          />
          Property addresses and financial details are not shown. Requests do
          not guarantee access or availability.
        </p>
        <Link
          className="bg-brand-bronze text-primary-foreground hover:bg-brand-bronze/90 focus-visible:outline-brand-navy mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          href="#commercial-inquiry"
        >
          Request details
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
