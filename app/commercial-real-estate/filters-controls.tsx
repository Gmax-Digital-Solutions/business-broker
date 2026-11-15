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
import {
  commercialAreas,
  commercialPropertyTypes,
  commercialTransactions,
  type CommercialFilters,
} from "@/src/features/commercial/types";

const queryParsers = {
  q: parseAsString.withDefault(""),
  propertyType: parseAsString.withDefault(""),
  area: parseAsString.withDefault(""),
  transaction: parseAsString.withDefault(""),
  minArea: parseAsInteger,
  maxArea: parseAsInteger,
  sort: parseAsString.withDefault("featured"),
  page: parseAsInteger.withDefault(1),
};

const queryOptions = { history: "push" as const, shallow: false, scroll: false };

function FilterPanel() {
  const [filters, setFilters] = useQueryStates(queryParsers, queryOptions);

  function update(values: Partial<typeof filters>) {
    void setFilters({ ...values, page: 1 });
  }

  function clearFilters() {
    void setFilters({
      q: "",
      propertyType: "",
      area: "",
      transaction: "",
      minArea: null,
      maxArea: null,
      sort: "featured",
      page: 1,
    });
  }

  function setMinimumArea(value: string) {
    const minArea = value ? Number(value) : null;
    update({
      minArea,
      ...(minArea !== null &&
      filters.maxArea !== null &&
      filters.maxArea !== undefined &&
      filters.maxArea < minArea
        ? { maxArea: null }
        : {}),
    });
  }

  function setMaximumArea(value: string) {
    const maxArea = value ? Number(value) : null;
    update({
      maxArea,
      ...(maxArea !== null &&
      filters.minArea !== null &&
      filters.minArea !== undefined &&
      filters.minArea > maxArea
        ? { minArea: null }
        : {}),
    });
  }

  return (
    <div className="border-border bg-card space-y-6 rounded-lg border p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-brand-navy inline-flex items-center gap-2 text-lg font-semibold">
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          Refine properties
        </h2>
        <button
          className="text-brand-bronze focus-visible:outline-brand-navy min-h-11 px-2 text-xs font-semibold underline underline-offset-2 focus-visible:outline-2"
          onClick={clearFilters}
          type="button"
        >
          Clear all
        </button>
      </div>

      <label className="text-brand-slate block text-xs font-semibold" htmlFor="commercial-type">
        Property classification
        <select
          className="border-input bg-card text-brand-navy mt-1 min-h-11 w-full rounded-md border px-3 text-sm"
          id="commercial-type"
          onChange={(event) => update({ propertyType: event.target.value })}
          value={filters.propertyType}
        >
          <option value="">All property types</option>
          {commercialPropertyTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="text-brand-slate block text-xs font-semibold" htmlFor="commercial-area">
        Submarket / county
        <select
          className="border-input bg-card text-brand-navy mt-1 min-h-11 w-full rounded-md border px-3 text-sm"
          id="commercial-area"
          onChange={(event) => update({ area: event.target.value })}
          value={filters.area}
        >
          <option value="">All Southwest Florida</option>
          {commercialAreas.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="text-brand-slate block text-xs font-semibold" htmlFor="commercial-transaction">
        Transaction type
        <select
          className="border-input bg-card text-brand-navy mt-1 min-h-11 w-full rounded-md border px-3 text-sm"
          id="commercial-transaction"
          onChange={(event) => update({ transaction: event.target.value })}
          value={filters.transaction}
        >
          <option value="">Sale or lease</option>
          {commercialTransactions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="border-border border-t pt-4">
        <legend className="text-brand-slate mb-2 text-xs font-semibold">
          Building area
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-brand-slate text-xs" htmlFor="commercial-min-area">
            Minimum
            <select
              className="border-input bg-card text-brand-navy mt-1 min-h-10 w-full rounded-md border px-2 text-xs"
              id="commercial-min-area"
              onChange={(event) => setMinimumArea(event.target.value)}
              value={filters.minArea ?? ""}
            >
              <option value="">Any</option>
              <option value="10000">10,000+ sq ft</option>
              <option value="25000">25,000+ sq ft</option>
              <option value="50000">50,000+ sq ft</option>
            </select>
          </label>
          <label className="text-brand-slate text-xs" htmlFor="commercial-max-area">
            Maximum
            <select
              className="border-input bg-card text-brand-navy mt-1 min-h-10 w-full rounded-md border px-2 text-xs"
              id="commercial-max-area"
              onChange={(event) => setMaximumArea(event.target.value)}
              value={filters.maxArea ?? ""}
            >
              <option value="">Any</option>
              <option value="25000">25,000 sq ft</option>
              <option value="50000">50,000 sq ft</option>
              <option value="100000">100,000 sq ft</option>
            </select>
          </label>
        </div>
      </fieldset>
    </div>
  );
}

export function CommercialPropertyToolbar({
  filters,
  total,
}: {
  filters: CommercialFilters;
  total: number;
}) {
  const [queryState, setQueryState] = useQueryStates(
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
        {total} available commercial {total === 1 ? "property" : "properties"}
        <span className="text-brand-slate ml-2 hidden text-xs font-normal sm:inline">
          · Address and financial details are not shown
        </span>
      </p>
      <div className="flex flex-col gap-2 sm:flex-row lg:items-center">
        <form className="flex min-w-0 flex-1 gap-2" onSubmit={submitSearch}>
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search commercial properties</span>
            <Search
              aria-hidden="true"
              className="text-brand-slate absolute top-1/2 left-3 size-4 -translate-y-1/2"
            />
            <input
              className="border-input bg-card text-brand-navy focus-visible:border-brand-navy focus-visible:ring-brand-navy/20 min-h-11 w-full rounded-md border py-2 pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none"
              defaultValue={filters.query}
              key={filters.query}
              name="q"
              placeholder="Search by keyword..."
            />
          </label>
          <Button
            aria-label="Search commercial properties"
            className="min-h-11 min-w-11"
            size="icon"
            type="submit"
          >
            <Search aria-hidden="true" className="size-4" />
          </Button>
        </form>

        <label className="sr-only" htmlFor="commercial-sort">
          Sort commercial properties
        </label>
        <select
          className="border-input bg-card text-brand-navy min-h-11 rounded-md border px-3 text-sm"
          id="commercial-sort"
          onChange={(event) => {
            void setQueryState({ sort: event.target.value, page: 1 });
          }}
          value={queryState.sort}
        >
          <option value="featured">Sort: Featured</option>
          <option value="newest">Sort: Recently added</option>
          <option value="size-desc">Sort: Largest area</option>
        </select>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                aria-label="Open commercial property filters"
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
                Refine properties
              </SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <FilterPanel />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export function CommercialPropertyFilterSidebar() {
  return (
    <aside aria-label="Commercial property filters" className="hidden lg:block">
      <FilterPanel />
    </aside>
  );
}

export function CommercialPropertyPagination({
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
      aria-label="Commercial property pages"
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
