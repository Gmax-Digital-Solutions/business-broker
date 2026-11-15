"use client";

import { useActionState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  investorBusinessPlans,
  investorVisaPathwayOptions,
  type InvestorVisaActionState,
} from "@/src/features/investor-visas/types";
import { submitInvestorVisaConsultation } from "./actions";

const initialState: InvestorVisaActionState = {
  status: "idle",
  message: "",
};

const selectClassName =
  "border-input bg-card text-brand-navy focus-visible:border-brand-navy focus-visible:ring-brand-navy/20 min-h-11 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none";

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

function ConsultationField({
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

export function InvestorVisaConsultationForm() {
  const [state, formAction, pending] = useActionState(
    submitInvestorVisaConsultation,
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
      aria-labelledby="investor-consultation-heading"
      className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12"
      id="investor-consultation"
    >
      <div>
        <p className="text-brand-bronze inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
          <ShieldCheck aria-hidden="true" className="size-4" />
          Cross-border business inquiry
        </p>
        <h2
          className="font-heading text-brand-navy mt-3 text-3xl leading-tight font-semibold sm:text-4xl"
          id="investor-consultation-heading"
        >
          Start with your business goals
        </h2>
        <p className="text-brand-slate mt-4 text-sm leading-6">
          Share basic contact information and the business path you are
          considering. We can follow up about brokerage next steps, not visa
          eligibility or legal strategy.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            "No passport, nationality, or immigration records requested",
            "No attorney-client relationship is created",
            "A business inquiry does not guarantee a visa or financing",
          ].map((item) => (
            <li
              className="text-brand-slate flex items-start gap-2 text-sm leading-5"
              key={item}
            >
              <ShieldCheck
                aria-hidden="true"
                className="text-brand-bronze mt-0.5 size-4 shrink-0"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <form
        action={formAction}
        className="border-border bg-card space-y-4 rounded-lg border p-5 sm:p-7"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ConsultationField
            errors={state.fieldErrors?.fullName}
            id="investor-full-name"
            label="Full name"
          >
            <Input
              {...errorProps("fullName", "investor-full-name")}
              autoComplete="name"
              className="min-h-11"
              id="investor-full-name"
              maxLength={120}
              name="fullName"
              required
            />
          </ConsultationField>

          <ConsultationField
            errors={state.fieldErrors?.email}
            id="investor-email"
            label="Email address"
          >
            <Input
              {...errorProps("email", "investor-email")}
              autoComplete="email"
              className="min-h-11"
              id="investor-email"
              maxLength={254}
              name="email"
              required
              type="email"
            />
          </ConsultationField>

          <ConsultationField
            errors={state.fieldErrors?.phone}
            id="investor-phone"
            label="Phone (optional)"
          >
            <Input
              {...errorProps("phone", "investor-phone")}
              autoComplete="tel"
              className="min-h-11"
              id="investor-phone"
              maxLength={40}
              name="phone"
              type="tel"
            />
          </ConsultationField>

          <ConsultationField
            errors={state.fieldErrors?.pathway}
            id="investor-pathway"
            label="Area of interest"
          >
            <select
              {...errorProps("pathway", "investor-pathway")}
              className={selectClassName}
              defaultValue="UNDECIDED"
              id="investor-pathway"
              name="pathway"
              required
            >
              {investorVisaPathwayOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </ConsultationField>

          <ConsultationField
            errors={state.fieldErrors?.businessPlan}
            id="investor-business-plan"
            label="Business plan"
          >
            <select
              {...errorProps("businessPlan", "investor-business-plan")}
              className={selectClassName}
              defaultValue=""
              id="investor-business-plan"
              name="businessPlan"
              required
            >
              <option disabled value="">
                Select an option
              </option>
              {investorBusinessPlans.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </ConsultationField>
        </div>

        <div>
          <div className="flex items-start gap-2">
            <input
              {...errorProps("consent", "investor-consent")}
              className="accent-brand-navy mt-1 size-4 shrink-0"
              id="investor-consent"
              name="consent"
              required
              type="checkbox"
            />
            <label
              className="text-brand-slate text-xs leading-5"
              htmlFor="investor-consent"
            >
              I agree to be contacted about this business inquiry.
            </label>
          </div>
          <FieldError
            errors={state.fieldErrors?.consent}
            id="investor-consent"
          />
        </div>

        <p className="text-brand-slate text-xs leading-5">
          Do not include passport details, citizenship information, immigration
          documents, or other sensitive personal information.
        </p>

        <Button
          className="min-h-11 bg-brand-bronze text-primary-foreground hover:bg-brand-bronze/90"
          disabled={pending}
          type="submit"
        >
          {pending ? "Submitting…" : "Send business inquiry"}
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
