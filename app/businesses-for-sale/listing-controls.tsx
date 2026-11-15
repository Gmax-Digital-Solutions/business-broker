"use client";

import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { listingAreas, listingCredentials, listingSorts } from "@/src/features/listings/types";
import type { ListingCategoryCount } from "@/src/features/listings/types";

const queryParsers = {
  q: parseAsString.withDefault(""),
  industry: parseAsString.withDefault(""),
  area: parseAsString.withDefault(""),
  credential: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("featured"),
  page: parseAsInteger.withDefault(1),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  minCashFlow: parseAsInteger,
  view: parseAsString.withDefault("grid"),
};

const queryOptions = { history: "push" as const, shallow: false, scroll: false };

function FilterPanel({ categories }: { categories: ListingCategoryCount[] }) {
  const [filters, setFilters] = useQueryStates(queryParsers, queryOptions);

  function update(
    values: Partial<typeof filters>,
  ) {
    void setFilters({ ...values, page: 1 });
  }

  function clearFilters() {
    void setFilters({
      q: "",
      industry: "",
      area: "",
      credential: "",
      sort: "featured",
      page: 1,
      minPrice: null,
      maxPrice: null,
      minCashFlow: null,
      view: "grid",
    });
  }

  function setMinimumPrice(value: string) {
    const minPrice = value ? Number(value) : null;
    update({
      minPrice,
      ...(minPrice !== null &&
      filters.maxPrice !== null &&
      filters.maxPrice !== undefined &&
      filters.maxPrice < minPrice
        ? { maxPrice: null }
        : {}),
    });
  }

  function setMaximumPrice(value: string) {
    const maxPrice = value ? Number(value) : null;
    update({
      maxPrice,
      ...(maxPrice !== null &&
      filters.minPrice !== null &&
      filters.minPrice !== undefined &&
      filters.minPrice > maxPrice
        ? { minPrice: null }
        : {}),
    });
  }

  const selectedIndustry = filters.industry;
  const selectedArea = filters.area;
  const selectedCredential = filters.credential;

  return (
    <div className="border-border bg-card space-y-6 rounded-lg border p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-brand-navy inline-flex items-center gap-2 text-lg font-semibold">
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          Filters
        </h2>
        <button
          className="text-brand-bronze focus-visible:outline-brand-navy min-h-11 px-2 text-xs font-semibold underline underline-offset-2 focus-visible:outline-2"
          onClick={clearFilters}
          type="button"
        >
          Clear all
        </button>
      </div>

      <fieldset className="border-border border-t pt-4">
        <legend className="text-brand-navy mb-3 text-xs font-bold tracking-[0.1em] uppercase">
          Industry sector
        </legend>
        <div className="flex flex-wrap gap-2">
          <button
            aria-pressed={!selectedIndustry}
            className={`min-h-9 rounded-sm border px-2.5 text-xs font-semibold ${!selectedIndustry ? "border-brand-navy bg-brand-navy text-primary-foreground" : "border-border bg-card text-brand-slate"}`}
            onClick={() => update({ industry: "" })}
            type="button"
          >
            All
          </button>
          {categories.map(({ category, count }) => (
            <button
              aria-pressed={selectedIndustry === category}
              className={`min-h-9 rounded-sm border px-2.5 text-xs font-semibold ${selectedIndustry === category ? "border-brand-navy bg-brand-navy text-primary-foreground" : "border-border bg-card text-brand-slate"}`}
              key={category}
              onClick={() =>
                update({ industry: selectedIndustry === category ? "" : category })
              }
              type="button"
            >
              {category} ({count})
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="border-border border-t pt-4">
        <legend className="text-brand-navy mb-2 text-xs font-bold tracking-[0.1em] uppercase">
          Asking price
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-brand-slate text-xs">
            Minimum
            <select
              className="border-input bg-card text-brand-navy mt-1 min-h-10 w-full rounded-md border px-2 text-xs"
              onChange={(event) => setMinimumPrice(event.target.value)}
              value={filters.minPrice ?? ""}
            >
              <option value="">Any</option>
              <option value="250000">$250,000+</option>
              <option value="500000">$500,000+</option>
              <option value="1000000">$1,000,000+</option>
              <option value="2500000">$2,500,000+</option>
            </select>
          </label>
          <label className="text-brand-slate text-xs">
            Maximum
            <select
              className="border-input bg-card text-brand-navy mt-1 min-h-10 w-full rounded-md border px-2 text-xs"
              onChange={(event) => setMaximumPrice(event.target.value)}
              value={filters.maxPrice ?? ""}
            >
              <option value="">Any</option>
              <option value="500000">Up to $500,000</option>
              <option value="1000000">Up to $1,000,000</option>
              <option value="2500000">Up to $2,500,000</option>
              <option value="5000000">Up to $5,000,000</option>
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="border-border border-t pt-4">
        <legend className="text-brand-navy mb-2 text-xs font-bold tracking-[0.1em] uppercase">
          Minimum annual cash flow
        </legend>
        <select
          aria-label="Minimum annual cash flow"
          className="border-input bg-card text-brand-navy min-h-10 w-full rounded-md border px-2 text-sm"
          onChange={(event) =>
            update({
              minCashFlow: event.target.value ? Number(event.target.value) : null,
            })
          }
          value={filters.minCashFlow ?? ""}
        >
          <option value="">Any</option>
          <option value="100000">$100,000+</option>
          <option value="200000">$200,000+</option>
          <option value="300000">$300,000+</option>
          <option value="500000">$500,000+</option>
          <option value="750000">$750,000+</option>
        </select>
        <p className="text-brand-slate mt-2 text-xs leading-5">
          Used to narrow results; confidential financial details remain hidden.
        </p>
      </fieldset>

      <fieldset className="border-border border-t pt-4">
        <legend className="text-brand-navy mb-2 text-xs font-bold tracking-[0.1em] uppercase">
          Sub-market / county
        </legend>
        <div className="space-y-1">
          {listingAreas.map((area) => (
            <label
              className="text-brand-slate flex min-h-10 items-center gap-2 text-sm"
              key={area.value}
            >
              <input
                checked={selectedArea === area.value}
                className="accent-brand-navy size-4"
                name="listing-area"
                onChange={() =>
                  update({
                    area: selectedArea === area.value ? "" : area.value,
                  })
                }
                type="checkbox"
              />
              {area.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="border-border border-t pt-4">
        <legend className="text-brand-navy mb-2 text-xs font-bold tracking-[0.1em] uppercase">
          Financing & attributes
        </legend>
        <div className="space-y-1">
          {listingCredentials.map((credential) => (
            <label
              className="text-brand-slate flex min-h-10 items-center gap-2 text-sm"
              key={credential.value}
            >
              <input
                checked={selectedCredential === credential.value}
                className="accent-brand-navy size-4"
                name="listing-credential"
                onChange={() =>
                  update({
                    credential:
                      selectedCredential === credential.value
                        ? ""
                        : credential.value,
                  })
                }
                type="checkbox"
              />
              {credential.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export function ListingToolbar({
  categories,
  total,
}: {
  categories: ListingCategoryCount[];
  total: number;
}) {
  const [filters, setFilters] = useQueryStates(queryParsers, queryOptions);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q");
    void setFilters({
      q: typeof query === "string" ? query.trim() : "",
      page: 1,
    });
  }

  return (
    <div className="border-border bg-background/95 sticky top-16 z-30 mb-6 border-y px-5 py-3 backdrop-blur sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-brand-navy text-sm font-semibold">
          Showing <span className="text-brand-bronze font-bold">{total}</span>{" "}
          active opportunities
          <span className="text-brand-slate ml-2 hidden text-xs font-normal sm:inline">
            · Confidentiality protocols apply
          </span>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row lg:items-center">
          <form className="flex min-w-0 flex-1 gap-2" onSubmit={submitSearch}>
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search listings by keyword</span>
              <Search
                aria-hidden="true"
                className="text-brand-slate absolute top-1/2 left-3 size-4 -translate-y-1/2"
              />
              <input
                className="border-input bg-card text-brand-navy focus-visible:border-brand-navy focus-visible:ring-brand-navy/20 min-h-11 w-full rounded-md border py-2 pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none"
                defaultValue={filters.q}
                key={filters.q}
                name="q"
                placeholder="Filter by keyword..."
              />
            </label>
            <Button
              aria-label="Apply keyword search"
              className="min-h-11"
              size="icon"
              type="submit"
            >
              <Search aria-hidden="true" className="size-4" />
            </Button>
          </form>
          <label className="sr-only" htmlFor="listing-sort">
            Sort listings
          </label>
          <select
            className="border-input bg-card text-brand-navy min-h-11 rounded-md border px-3 text-sm"
            id="listing-sort"
            onChange={(event) =>
              void setFilters({
                sort: event.target.value,
                page: 1,
              })
            }
            value={filters.sort}
          >
            {listingSorts.map((sort) => (
              <option key={sort.value} value={sort.value}>
                Sort: {sort.label}
              </option>
            ))}
          </select>
          <div aria-label="Listing layout" className="hidden items-center gap-1 sm:flex">
            <button
              aria-label="Grid view"
              aria-pressed={filters.view === "grid"}
              className="border-border text-brand-navy inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border aria-pressed:bg-secondary"
              onClick={() => void setFilters({ view: "grid" })}
              type="button"
            >
              <span aria-hidden="true">▦</span>
            </button>
            <button
              aria-label="List view"
              aria-pressed={filters.view === "list"}
              className="border-border text-brand-navy inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border aria-pressed:bg-secondary"
              onClick={() => void setFilters({ view: "list" })}
              type="button"
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
          <a
            className="border-brand-bronze text-brand-bronze focus-visible:outline-brand-navy inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
            href="#save-search"
          >
            Save Search
          </a>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  aria-label="Open listing filters"
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
                <FilterPanel categories={categories} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export function ListingFilterSidebar({
  categories,
}: {
  categories: ListingCategoryCount[];
}) {
  return (
    <aside aria-label="Listing filters" className="hidden lg:block">
      <FilterPanel categories={categories} />
    </aside>
  );
}

export function ListingPagination({
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
      aria-label="Listing pages"
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
