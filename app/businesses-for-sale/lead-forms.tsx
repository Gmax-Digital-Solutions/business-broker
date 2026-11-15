"use client";

import { useActionState } from "react";
import { ArrowRight, BellRing, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveListingSearch, submitBuyerCriteria } from "./actions";
import type { ListingFilters, ListingOption, LeadActionState } from "@/src/features/listings/types";

const initialState: LeadActionState = {
  status: "idle",
  message: "",
};

function FieldError({ errors, name }: { errors?: string[]; name: string }) {
  if (!errors?.[0]) {
    return null;
  }

  return (
    <p className="text-destructive mt-1 text-xs" id={`${name}-error`}>
      {errors[0]}
    </p>
  );
}

function FormMessage({ state }: { state: LeadActionState }) {
  if (!state.message) {
    return null;
  }

  return (
    <p
      aria-live="polite"
      className={
        state.status === "success"
          ? "text-sm font-semibold text-emerald-800"
          : "text-destructive text-sm font-semibold"
      }
      role={state.status === "success" ? "status" : "alert"}
    >
      {state.message}
    </p>
  );
}

export function ListingSearchAlertForm({
  filters,
}: {
  filters: ListingFilters;
}) {
  const [state, formAction, pending] = useActionState(
    saveListingSearch,
    initialState,
  );

  return (
    <section
      className="bg-brand-navy text-primary-foreground rounded-lg p-6 sm:p-8"
      id="save-search"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-brand-gold inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
            <BellRing aria-hidden="true" className="size-4" />
            Buyer network
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold sm:text-3xl">
            Save your search criteria
          </h2>
          <p className="text-primary-foreground/80 mt-2 text-sm leading-6">
            Share an email address and our team can follow up about
            opportunities that match your search.
          </p>
        </div>
        <form action={formAction} className="w-full max-w-xl space-y-3">
          <input name="keyword" type="hidden" value={filters.query} />
          <input name="industry" type="hidden" value={filters.industry} />
          <input name="geography" type="hidden" value={filters.area} />
          <input
            name="minimumAskingPrice"
            type="hidden"
            value={filters.minPrice ?? ""}
          />
          <input
            name="maximumAskingPrice"
            type="hidden"
            value={filters.maxPrice ?? ""}
          />
          <input
            name="minimumCashFlow"
            type="hidden"
            value={filters.minCashFlow ?? ""}
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="min-w-0 flex-1">
              <label className="sr-only" htmlFor="listing-alert-email">
                Email address
              </label>
              <Input
                aria-describedby={
                  state.fieldErrors?.email ? "alert-email-error" : undefined
                }
                aria-invalid={Boolean(state.fieldErrors?.email)}
                autoComplete="email"
                className="bg-card text-brand-navy min-h-12"
                id="listing-alert-email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>
          </div>
          <FieldError
            errors={state.fieldErrors?.email}
            name="alert-email"
          />
          <div className="flex items-start gap-2">
            <input
              aria-describedby={
                state.fieldErrors?.consent ? "consent-error" : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.consent)}
              className="border-primary-foreground/60 text-brand-navy mt-1 size-4 shrink-0 rounded-sm"
              id="listing-alert-consent"
              name="consent"
              required
              type="checkbox"
            />
            <label
              className="text-primary-foreground/80 text-xs leading-5"
              htmlFor="listing-alert-consent"
            >
              I agree to be contacted about this search. My information will
              not be sold.
            </label>
          </div>
          <FieldError
            errors={state.fieldErrors?.consent}
            name="consent"
          />
          <Button
            className="min-h-12 bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
            disabled={pending}
            type="submit"
          >
            {pending ? "Saving…" : "Save Search"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <FormMessage state={state} />
        </form>
      </div>
    </section>
  );
}

const fieldClassName =
  "border-input bg-card text-brand-navy focus-visible:border-brand-navy focus-visible:ring-brand-navy/20 min-h-11 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none";

function CriteriaField({
  children,
  errors,
  id,
  label,
}: {
  children: React.ReactNode;
  errors?: string[];
  id: string;
  label: string;
}) {
  return (
    <div>
      <label className="text-brand-navy mb-1.5 block text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      {children}
      <FieldError errors={errors} name={id} />
    </div>
  );
}

export function BuyerCriteriaForm({
  compact = false,
  listings,
  target,
}: {
  compact?: boolean;
  listings: ListingOption[];
  target: ListingOption | null;
}) {
  const [state, formAction, pending] = useActionState(
    submitBuyerCriteria,
    initialState,
  );
  const targetIsListed =
    target !== null && listings.some((listing) => listing.slug === target.slug);

  return (
    <section
      className={`border-border bg-card grid gap-8 rounded-xl border ${compact ? "p-4 sm:p-5" : "p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12"}`}
      id="buyer-criteria"
    >
      <div className="flex flex-col justify-center">
        <p className="bg-brand-offwhite text-brand-bronze inline-flex w-fit items-center gap-2 rounded-sm px-3 py-2 text-xs font-bold tracking-[0.12em] uppercase">
          <ShieldCheck aria-hidden="true" className="size-4" />
          Confidential buyer mandate
        </p>
        <h2 className="font-heading text-brand-navy mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
          Tell us what you’re looking for.
        </h2>
        <p className="text-brand-slate mt-4 text-sm leading-6">
          Share your acquisition criteria and an advisor can discuss suitable
          opportunities and the qualification process.
        </p>
        <p className="text-brand-slate mt-5 text-xs leading-5">
          Financial and identifying information about a listing is not shown
          here. Access is considered individually after qualification and an
          executed NDA. A request does not guarantee access or availability.
        </p>
        <p className="text-brand-slate mt-3 text-xs leading-5">
          Any financing, including SBA 7(a), is subject to lender approval and
          underwriting.
        </p>
      </div>

      <form
        action={formAction}
        className="border-border bg-brand-offwhite space-y-4 rounded-lg border p-5 sm:p-6"
      >
        {targetIsListed ? (
          <div className="bg-card border-border rounded-md border p-3">
            <p className="text-brand-slate text-xs font-semibold">
              Selected confidential opportunity
            </p>
            <p className="text-brand-navy mt-1 text-sm font-semibold">
              {target.title}
            </p>
            <input
              name="targetListingSlug"
              type="hidden"
              value={target.slug}
            />
            <FieldError
              errors={state.fieldErrors?.targetListingSlug}
              name="target-listing"
            />
          </div>
        ) : null}
        <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
          <CriteriaField
            errors={state.fieldErrors?.targetIndustry}
            id="targetIndustry"
            label="Target sector / industry"
          >
            <select
              aria-describedby={
                state.fieldErrors?.targetIndustry
                  ? "targetIndustry-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.targetIndustry)}
              className={fieldClassName}
              defaultValue=""
              id="targetIndustry"
              name="targetIndustry"
              required
            >
              <option disabled value="">
                Select an industry
              </option>
              <option>Marine / Maritime Contracting</option>
              <option>Commercial Services</option>
              <option>Healthcare</option>
              <option>Hospitality</option>
              <option>Distribution</option>
              <option>Franchise</option>
              <option>Other</option>
            </select>
          </CriteriaField>
          <CriteriaField
            errors={state.fieldErrors?.minimumSde}
            id="minimumSde"
            label="Minimum SDE / cash flow target"
          >
            <select
              aria-describedby={
                state.fieldErrors?.minimumSde ? "minimumSde-error" : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.minimumSde)}
              className={fieldClassName}
              defaultValue=""
              id="minimumSde"
              name="minimumSde"
              required
            >
              <option disabled value="">
                Select a target
              </option>
              <option>$100,000–$200,000 / year</option>
              <option>$200,000–$400,000 / year</option>
              <option>$400,000–$750,000 / year</option>
              <option>$750,000+ / year</option>
            </select>
          </CriteriaField>
          <CriteriaField
            errors={state.fieldErrors?.liquidEquity}
            id="liquidEquity"
            label="Available liquid equity"
          >
            <select
              aria-describedby={
                state.fieldErrors?.liquidEquity
                  ? "liquidEquity-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.liquidEquity)}
              className={fieldClassName}
              defaultValue=""
              id="liquidEquity"
              name="liquidEquity"
              required
            >
              <option disabled value="">
                Select available equity
              </option>
              <option>Under $150,000</option>
              <option>$150,000–$350,000</option>
              <option>$350,000–$750,000</option>
              <option>$750,000+</option>
            </select>
          </CriteriaField>
          <CriteriaField
            errors={state.fieldErrors?.geographicFocus}
            id="geographicFocus"
            label="Geographic focus"
          >
            <select
              aria-describedby={
                state.fieldErrors?.geographicFocus
                  ? "geographicFocus-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.geographicFocus)}
              className={fieldClassName}
              defaultValue=""
              id="geographicFocus"
              name="geographicFocus"
              required
            >
              <option disabled value="">
                Select an area
              </option>
              <option>Sarasota County</option>
              <option>Manatee / Bradenton</option>
              <option>Southwest Florida (any)</option>
              <option>Open to all Florida</option>
            </select>
          </CriteriaField>
          <CriteriaField
            errors={state.fieldErrors?.fullName}
            id="fullName"
            label="Full legal name"
          >
            <Input
              aria-describedby={
                state.fieldErrors?.fullName ? "fullName-error" : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.fullName)}
              autoComplete="name"
              className="bg-card min-h-11"
              id="fullName"
              maxLength={120}
              name="fullName"
              required
            />
          </CriteriaField>
          <CriteriaField
            errors={state.fieldErrors?.contact}
            id="contact"
            label="Direct phone or email"
          >
            <Input
              aria-describedby={
                state.fieldErrors?.contact ? "contact-error" : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.contact)}
              autoComplete="email"
              className="bg-card min-h-11"
              id="contact"
              maxLength={254}
              name="contact"
              placeholder="you@example.com or +1 555 555 5555"
              required
            />
          </CriteriaField>
        </div>
        <div>
          <div className="flex items-start gap-2">
            <input
              aria-describedby={
                state.fieldErrors?.consent ? "criteria-consent-error" : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.consent)}
              className="accent-brand-navy mt-1 size-4 shrink-0"
              id="criteria-consent"
              name="consent"
              required
              type="checkbox"
            />
            <label
              className="text-brand-slate text-xs leading-5"
              htmlFor="criteria-consent"
            >
              I consent to being contacted about my buyer criteria.
            </label>
          </div>
          <FieldError
            errors={state.fieldErrors?.consent}
            name="criteria-consent"
          />
        </div>
        <Button
          className="bg-brand-bronze text-primary-foreground hover:bg-brand-bronze/90 min-h-12 w-full"
          disabled={pending}
          type="submit"
        >
          {pending ? "Submitting…" : "Submit confidential buyer criteria"}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
        <p className="text-brand-slate text-center text-xs">
          Your contact details are used to respond to this request.
        </p>
        <FormMessage state={state} />
      </form>
    </section>
  );
}
