"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  franchiseMarkets,
  franchisePathways,
  franchiseSectors,
  type FranchiseFilters,
} from "@/src/features/franchise/types";

const queryParsers = {
  q: parseAsString.withDefault(""),
  pathway: parseAsString.withDefault(""),
  sector: parseAsString.withDefault(""),
  market: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

const queryOptions = { history: "push" as const, shallow: false, scroll: false };
const fieldClassName =
  "border-input bg-card text-brand-navy focus-visible:border-brand-navy focus-visible:ring-brand-navy/20 mt-1 min-h-11 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none";

function FilterPanel({ idPrefix }: { idPrefix: string }) {
  const [filters, setFilters] = useQueryStates(queryParsers, queryOptions);
  const pathwayId = `${idPrefix}-pathway`;
  const sectorId = `${idPrefix}-sector`;
  const marketId = `${idPrefix}-market`;

  function update(values: Partial<typeof filters>) {
    void setFilters({ ...values, page: 1 });
  }

  function clearFilters() {
    void setFilters({
      q: "",
      pathway: "",
      sector: "",
      market: "",
      page: 1,
    });
  }

  return (
    <div className="border-border bg-card space-y-5 rounded-lg border p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-brand-navy inline-flex items-center gap-2 text-lg font-semibold">
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          Refine opportunities
        </h2>
        <button
          className="text-brand-bronze focus-visible:outline-brand-navy min-h-11 px-2 text-xs font-semibold underline underline-offset-2 focus-visible:outline-2"
          onClick={clearFilters}
          type="button"
        >
          Clear all
        </button>
      </div>

      <label
        className="text-brand-slate block text-xs font-semibold"
        htmlFor={pathwayId}
      >
        Franchise pathway
        <select
          className={fieldClassName}
          id={pathwayId}
          onChange={(event) => update({ pathway: event.target.value })}
          value={filters.pathway}
        >
          <option value="">All pathways</option>
          {franchisePathways.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label
        className="text-brand-slate block text-xs font-semibold"
        htmlFor={sectorId}
      >
        Industry sector
        <select
          className={fieldClassName}
          id={sectorId}
          onChange={(event) => update({ sector: event.target.value })}
          value={filters.sector}
        >
          <option value="">All sectors</option>
          {franchiseSectors.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label
        className="text-brand-slate block text-xs font-semibold"
        htmlFor={marketId}
      >
        Geographic focus
        <select
          className={fieldClassName}
          id={marketId}
          onChange={(event) => update({ market: event.target.value })}
          value={filters.market}
        >
          <option value="">All markets</option>
          {franchiseMarkets.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function FranchiseOpportunityToolbar({
  filters,
  total,
}: {
  filters: FranchiseFilters;
  total: number;
}) {
  const [, setQueryState] = useQueryStates(
    queryParsers,
    queryOptions,
  );

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q");
    void setQueryState({
      q: typeof query === "string" ? query.trim() : "",
      page: 1,
    });
  }

  return (
    <div className="border-border bg-background/95 mb-6 flex flex-col gap-3 border-y px-5 py-3 backdrop-blur sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
      <p className="text-brand-navy text-sm font-semibold">
        {total} public {total === 1 ? "opportunity" : "opportunities"}
        <span className="text-brand-slate ml-2 hidden text-xs font-normal sm:inline">
          · Confidential brand and financial details are not shown
        </span>
      </p>
      <div className="flex flex-col gap-2 sm:flex-row lg:items-center">
        <form className="flex min-w-0 flex-1 gap-2" onSubmit={submitSearch}>
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search franchise opportunities</span>
            <Search
              aria-hidden="true"
              className="text-brand-slate absolute top-1/2 left-3 size-4 -translate-y-1/2"
            />
            <input
              className="border-input bg-card text-brand-navy focus-visible:border-brand-navy focus-visible:ring-brand-navy/20 min-h-11 w-full rounded-md border py-2 pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none"
              defaultValue={filters.query}
              key={filters.query}
              maxLength={100}
              name="q"
              placeholder="Search opportunities..."
            />
          </label>
          <Button
            aria-label="Search franchise opportunities"
            className="min-h-11 min-w-11"
            size="icon"
            type="submit"
          >
            <Search aria-hidden="true" className="size-4" />
          </Button>
        </form>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                aria-label="Open franchise opportunity filters"
                className="min-h-11 lg:hidden"
                variant="outline"
              />
            }
          >
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            Filters
          </SheetTrigger>
          <SheetContent
            aria-describedby={undefined}
            className="gap-0 overflow-y-auto p-0 sm:max-w-md"
            side="right"
          >
            <SheetHeader className="border-border border-b px-5 py-4">
              <SheetTitle className="font-heading text-brand-navy">
                Refine opportunities
              </SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <FilterPanel idPrefix="franchise-mobile" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export function FranchiseOpportunityFilterSidebar() {
  return (
    <aside
      aria-label="Franchise opportunity filters"
      className="hidden lg:block"
    >
      <FilterPanel idPrefix="franchise-desktop" />
    </aside>
  );
}

export function FranchiseOpportunityPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const [, setFilters] = useQueryStates(queryParsers, queryOptions);

  if (totalPages < 2) {
    return null;
  }

  return (
    <nav
      aria-label="Franchise opportunity pages"
      className="border-border bg-card mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
    >
      <p className="text-brand-slate text-sm">
        Page <strong className="text-brand-navy">{page}</strong> of{" "}
        <strong className="text-brand-navy">{totalPages}</strong>
      </p>
      <div className="flex items-center gap-2">
        <Button
          disabled={page <= 1}
          onClick={() => void setFilters({ page: page - 1 })}
          type="button"
          variant="outline"
        >
          Previous
        </Button>
        <Button
          disabled={page >= totalPages}
          onClick={() => void setFilters({ page: page + 1 })}
          type="button"
          variant="outline"
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
