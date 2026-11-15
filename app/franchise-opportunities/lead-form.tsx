"use client";

import { useActionState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  franchiseCapitalBands,
  franchiseMarkets,
  franchisePathways,
  franchiseSectors,
  franchiseTimeframes,
  type FranchiseActionState,
} from "@/src/features/franchise/types";
import { submitFranchiseStrategy } from "./actions";

const initialState: FranchiseActionState = {
  status: "idle",
  message: "",
};

const fieldClassName =
  "border-input bg-card text-brand-navy focus-visible:border-brand-navy focus-visible:ring-brand-navy/20 min-h-11 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none";

function FieldError({
  errors,
  id,
}: {
  errors?: string[];
  id: string;
}) {
  if (!errors?.[0]) return null;

  return (
    <p className="text-destructive mt-1 text-xs" id={`${id}-error`}>
      {errors[0]}
    </p>
  );
}

function StrategyField({
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
      <label
        className="text-brand-navy mb-1.5 block text-sm font-semibold"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
      <FieldError errors={errors} id={id} />
    </div>
  );
}

export function FranchiseStrategyForm() {
  const [state, formAction, pending] = useActionState(
    submitFranchiseStrategy,
    initialState,
  );
  const errorProps = (field: string, fieldId: string) => ({
    "aria-describedby": state.fieldErrors?.[field]
      ? `${fieldId}-error`
      : undefined,
    "aria-invalid": Boolean(state.fieldErrors?.[field]),
  });

  return (
    <section
      aria-labelledby="franchise-strategy-heading"
      className="bg-brand-navy text-primary-foreground grid gap-8 rounded-xl p-5 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
      id="franchise-strategy"
    >
      <div className="flex flex-col justify-center">
        <p className="text-brand-gold inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
          <ShieldCheck aria-hidden="true" className="size-4" />
          Franchise strategy request
        </p>
        <h2
          className="font-heading mt-3 text-3xl leading-tight font-semibold sm:text-4xl"
          id="franchise-strategy-heading"
        >
          Plan your next conversation
        </h2>
        <p className="text-primary-foreground/80 mt-4 text-sm leading-6">
          Share what you are exploring. An advisor can follow up to discuss
          potential next steps and the information available for review.
        </p>
        <p className="text-primary-foreground/75 mt-5 text-xs leading-5">
          Brand names and Franchise Disclosure Documents are shared only after
          appropriate review. An inquiry does not guarantee access, availability,
          franchisor approval, or a specific outcome.
        </p>
        <p className="text-brand-gold mt-3 text-xs leading-5">
          Financing is subject to lender approval and underwriting.
        </p>
      </div>

      <form
        action={formAction}
        className="border-primary-foreground/20 bg-card space-y-4 rounded-lg border p-5 text-brand-navy sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <StrategyField
            errors={state.fieldErrors?.fullName}
            id="franchise-full-name"
            label="Full name"
          >
            <Input
              {...errorProps("fullName", "franchise-full-name")}
              autoComplete="name"
              className="min-h-11"
              id="franchise-full-name"
              maxLength={120}
              name="fullName"
              required
            />
          </StrategyField>

          <StrategyField
            errors={state.fieldErrors?.email}
            id="franchise-email"
            label="Email address"
          >
            <Input
              {...errorProps("email", "franchise-email")}
              autoComplete="email"
              className="min-h-11"
              id="franchise-email"
              maxLength={254}
              name="email"
              required
              type="email"
            />
          </StrategyField>

          <StrategyField
            errors={state.fieldErrors?.phone}
            id="franchise-phone"
            label="Phone (optional)"
          >
            <Input
              {...errorProps("phone", "franchise-phone")}
              autoComplete="tel"
              className="min-h-11"
              id="franchise-phone"
              maxLength={40}
              name="phone"
              type="tel"
            />
          </StrategyField>

          <StrategyField
            errors={state.fieldErrors?.preferredPathway}
            id="franchise-preferred-pathway"
            label="Pathway of interest"
          >
            <select
              {...errorProps(
                "preferredPathway",
                "franchise-preferred-pathway",
              )}
              className={fieldClassName}
              defaultValue=""
              id="franchise-preferred-pathway"
              name="preferredPathway"
              required
            >
              <option disabled value="">
                Select a pathway
              </option>
              {franchisePathways.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </StrategyField>

          <StrategyField
            errors={state.fieldErrors?.market}
            id="franchise-market"
            label="Geographic focus"
          >
            <select
              {...errorProps("market", "franchise-market")}
              className={fieldClassName}
              defaultValue=""
              id="franchise-market"
              name="market"
              required
            >
              <option disabled value="">
                Select a region
              </option>
              {franchiseMarkets.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </StrategyField>

          <StrategyField
            errors={state.fieldErrors?.sector}
            id="franchise-sector"
            label="Industry sector"
          >
            <select
              {...errorProps("sector", "franchise-sector")}
              className={fieldClassName}
              defaultValue=""
              id="franchise-sector"
              name="sector"
              required
            >
              <option disabled value="">
                Select a sector
              </option>
              {franchiseSectors.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </StrategyField>

          <StrategyField
            errors={state.fieldErrors?.capitalBand}
            id="franchise-capital-band"
            label="Available capital range (self-reported)"
          >
            <select
              {...errorProps("capitalBand", "franchise-capital-band")}
              className={fieldClassName}
              defaultValue="UNDECIDED"
              id="franchise-capital-band"
              name="capitalBand"
              required
            >
              {franchiseCapitalBands.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </StrategyField>

          <StrategyField
            errors={state.fieldErrors?.timeframe}
            id="franchise-timeframe"
            label="Timeframe"
          >
            <select
              {...errorProps("timeframe", "franchise-timeframe")}
              className={fieldClassName}
              defaultValue=""
              id="franchise-timeframe"
              name="timeframe"
              required
            >
              <option disabled value="">
                Select a timeframe
              </option>
              {franchiseTimeframes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </StrategyField>
        </div>

        <div>
          <div className="flex items-start gap-2">
            <input
              {...errorProps("consent", "franchise-consent")}
              className="accent-brand-navy mt-1 size-4 shrink-0"
              id="franchise-consent"
              name="consent"
              required
              type="checkbox"
            />
            <label
              className="text-brand-slate text-xs leading-5"
              htmlFor="franchise-consent"
            >
              I agree to be contacted about this franchise strategy request.
            </label>
          </div>
          <FieldError
            errors={state.fieldErrors?.consent}
            id="franchise-consent"
          />
        </div>

        <Button
          className="min-h-11 bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
          disabled={pending}
          type="submit"
        >
          {pending ? "Submitting…" : "Request a strategy conversation"}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>

        {state.message ? (
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
        ) : null}
      </form>
    </section>
  );
}
