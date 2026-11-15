import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Building,
  ChartNoAxesColumnIncreasing,
  Factory,
  Landmark,
  MapPin,
  ShieldCheck,
  Warehouse,
} from "lucide-react";

const reasons = [
  {
    icon: Landmark,
    title: "Regional connectivity",
    description:
      "Discuss how local transportation and logistics may relate to a property's intended use.",
  },
  {
    icon: Factory,
    title: "Property-specific diligence",
    description:
      "Evaluate zoning, access, condition, and transaction documents with qualified professionals.",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Measured decisions",
    description:
      "Base investment decisions on current, property-specific facts and independent advice.",
  },
];

export function CommercialMarketInsight() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.3fr_0.7fr] lg:px-10 lg:py-20">
      <div>
        <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
          Market intelligence
        </p>
        <h2 className="font-heading text-brand-navy mt-3 max-w-3xl text-3xl leading-tight font-semibold sm:text-4xl">
          Evaluate a commercial opportunity with care
        </h2>
        <p className="text-brand-slate mt-4 max-w-3xl text-sm leading-6">
          Property availability, financial performance, zoning, and market
  conditions change. Verify important details with current records and
  independent professional advisors before making a decision.
        </p>
        <ul className="mt-7 grid gap-4 sm:grid-cols-3">
          {reasons.map(({ description, icon: Icon, title }) => (
            <li
              className="border-border bg-brand-offwhite rounded-lg border p-4"
              key={title}
            >
              <span className="bg-brand-navy text-brand-gold inline-flex size-9 items-center justify-center rounded-sm">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <h3 className="font-heading text-brand-navy mt-4 font-semibold">
                {title}
              </h3>
              <p className="text-brand-slate mt-2 text-xs leading-5">
                {description}
              </p>
            </li>
          ))}
        </ul>
        <div className="border-border bg-secondary mt-5 flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-brand-slate text-xs leading-5">
            Commercial opportunities shown here are informational. Availability
            and transaction terms require confirmation.
          </p>
          <Link
            className="text-brand-bronze focus-visible:outline-brand-navy inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold focus-visible:outline-2"
            href="/contact"
            prefetch={false}
          >
            Discuss your search
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
      <aside className="border-border bg-card flex flex-col overflow-hidden rounded-xl border">
        <div className="relative min-h-56 flex-1">
          <Image
            alt="Southwest Florida waterfront skyline and marina"
            className="object-cover"
            fill
            sizes="(max-width: 1023px) 100vw, 35vw"
            src="/southwest-florida-waterfront.jpg"
          />
        </div>
        <div className="p-5">
          <p className="text-brand-bronze flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
            <MapPin aria-hidden="true" className="size-4" />
            Sarasota &amp; Manatee counties
          </p>
          <p className="text-brand-slate mt-3 text-sm leading-6">
            Regional context can inform a search, but does not represent a
            property appraisal, investment recommendation, or guarantee.
          </p>
          <p className="text-brand-slate mt-3 inline-flex items-center gap-2 text-xs">
            <ShieldCheck aria-hidden="true" className="text-brand-bronze size-4" />
            Property-specific due diligence is essential.
          </p>
        </div>
      </aside>
    </section>
  );
}

export function CommercialTrustStrip() {
  return (
    <div className="border-border bg-brand-offwhite mx-auto flex max-w-[1440px] flex-wrap gap-3 px-5 py-7 sm:px-8 lg:px-10">
      {[
        { icon: Building, label: "Commercial property advisory" },
        { icon: Warehouse, label: "Industrial, office & retail" },
        { icon: BadgeCheck, label: "Discretionary inquiry process" },
      ].map(({ icon: Icon, label }) => (
        <span
          className="border-border bg-card text-brand-slate inline-flex min-h-10 items-center gap-2 rounded-sm border px-3 text-xs font-semibold"
          key={label}
        >
          <Icon aria-hidden="true" className="text-brand-bronze size-4" />
          {label}
        </span>
      ))}
    </div>
  );
}
