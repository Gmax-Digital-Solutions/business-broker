"use client";

import { useActionState, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LeadActionState } from "@/src/features/listings/types";
import { listingAreas } from "@/src/features/listings/types";
import {
  annualCashFlowRanges,
  annualRevenueRanges,
  preferredContactMethods,
  saleTimelines,
  valuationIndustries,
} from "@/src/features/seller/valuation-options";
import { submitFullValuation, submitQuickValuation } from "./actions";

const initialState: LeadActionState = { status: "idle", message: "" };
const controlClassName =
  "border-input bg-card text-brand-navy focus-visible:border-brand-navy focus-visible:ring-brand-navy/20 min-h-11 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none";
const fullFormSteps = ["Contact", "Business", "Financials", "Review"];
const fullFormErrorSteps = [
  ["fullName", "email", "phone", "preferredContact"],
  ["industry", "location"],
  ["annualRevenueRange", "annualCashFlowRange", "saleTimeline"],
  ["consent"],
];

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.[0]) {
    return null;
  }

  return (
    <p className="text-destructive mt-1 text-xs" id={`${id}-error`}>
      {errors[0]}
    </p>
  );
}

function FormStatus({ state }: { state: LeadActionState }) {
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

function SelectField({
  id,
  label,
  name,
  options,
  errors,
}: {
  id: string;
  label: string;
  name: string;
  options: readonly { value: string; label: string }[];
  errors?: string[];
}) {
  return (
    <div className="min-w-0">
      <label
        className="text-brand-navy mb-1.5 block text-sm font-semibold"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        aria-describedby={errors?.[0] ? `${id}-error` : undefined}
        aria-invalid={Boolean(errors?.[0])}
        className={controlClassName}
        defaultValue=""
        id={id}
        name={name}
        required
      >
        <option disabled hidden value="">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError errors={errors} id={id} />
    </div>
  );
}

function ContactConsent({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div>
      <div className="flex items-start gap-2">
        <input
          aria-describedby={errors?.[0] ? `${id}-error` : undefined}
          aria-invalid={Boolean(errors?.[0])}
          className="border-input text-brand-navy mt-1 size-4 shrink-0 rounded-sm"
          id={id}
          name="consent"
          required
          type="checkbox"
        />
        <label className="text-brand-slate text-xs leading-5" htmlFor={id}>
          I agree to be contacted about this request. My information will not be
          sold.
        </label>
      </div>
      <FieldError errors={errors} id={id} />
    </div>
  );
}

export function QuickValuationForm() {
  const [state, formAction, pending] = useActionState(
    submitQuickValuation,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          errors={state.fieldErrors?.industry}
          id="quick-industry"
          label="Business industry"
          name="industry"
          options={valuationIndustries}
        />
        <SelectField
          errors={state.fieldErrors?.location}
          id="quick-location"
          label="Business location"
          name="location"
          options={listingAreas}
        />
        <SelectField
          errors={state.fieldErrors?.annualRevenueRange}
          id="quick-revenue"
          label="Annual revenue"
          name="annualRevenueRange"
          options={annualRevenueRanges}
        />
        <div className="min-w-0">
          <label
            className="text-brand-navy mb-1.5 block text-sm font-semibold"
            htmlFor="quick-email"
          >
            Email address
          </label>
          <Input
            aria-describedby={
              state.fieldErrors?.email ? "quick-email-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors?.email)}
            autoComplete="email"
            className={controlClassName}
            id="quick-email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
          <FieldError errors={state.fieldErrors?.email} id="quick-email" />
        </div>
      </div>
      <ContactConsent id="quick-consent" errors={state.fieldErrors?.consent} />
      <Button
        className="min-h-12 w-full bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
        disabled={pending}
        type="submit"
      >
        {pending ? "Submitting…" : "Request a valuation discussion"}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Button>
      <FormStatus state={state} />
    </form>
  );
}

function TextField({
  autoComplete,
  errors,
  id,
  label,
  name,
  type = "text",
}: {
  autoComplete?: string;
  errors?: string[];
  id: string;
  label: string;
  name: string;
  type?: "email" | "tel" | "text";
}) {
  return (
    <div className="min-w-0">
      <label
        className="text-brand-navy mb-1.5 block text-sm font-semibold"
        htmlFor={id}
      >
        {label}
      </label>
      <Input
        aria-describedby={errors?.[0] ? `${id}-error` : undefined}
        aria-invalid={Boolean(errors?.[0])}
        autoComplete={autoComplete}
        className={controlClassName}
        id={id}
        name={name}
        required
        type={type}
      />
      <FieldError errors={errors} id={id} />
    </div>
  );
}

export function FullValuationForm() {
  const [state, formAction, pending] = useActionState(
    submitFullValuation,
    initialState,
  );
  const errors = state.fieldErrors;
  const [selectedStep, setSelectedStep] = useState(1);
  const [acknowledgedErrors, setAcknowledgedErrors] =
    useState<LeadActionState["fieldErrors"]>();
  const formRef = useRef<HTMLFormElement>(null);
  const firstErrorStep =
    state.status === "error" && errors && errors !== acknowledgedErrors
      ? fullFormErrorSteps.findIndex((fields) =>
          fields.some((field) => Boolean(errors[field]?.length)),
        )
      : -1;
  const currentStep = firstErrorStep >= 0 ? firstErrorStep + 1 : selectedStep;

  function continueToNextStep() {
    const fieldset = formRef.current?.querySelector<HTMLFieldSetElement>(
      `fieldset[data-step="${currentStep}"]`,
    );
    if (!fieldset) {
      return;
    }

    const invalidControl = Array.from(
      fieldset.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
        "input, select",
      ),
    ).find((control) => !control.checkValidity());

    if (invalidControl) {
      invalidControl.reportValidity();
      return;
    }

    setAcknowledgedErrors(errors);
    setSelectedStep((step) => Math.min(step + 1, fullFormSteps.length));
  }

  return (
    <form action={formAction} className="space-y-8" ref={formRef}>
      <ol
        aria-label="Valuation request steps"
        className="grid grid-cols-4 gap-2"
      >
        {fullFormSteps.map((name, index) => {
          const step = index + 1;
          const isCurrent = currentStep === step;
          const isComplete = currentStep > step;
          return (
            <li
              aria-current={isCurrent ? "step" : undefined}
              className="flex min-w-0 flex-col items-center gap-2 text-center"
              key={name}
            >
              <span
                className={
                  isCurrent || isComplete
                    ? "bg-brand-navy text-primary-foreground flex size-8 items-center justify-center rounded-full text-sm font-bold"
                    : "border-border text-brand-slate flex size-8 items-center justify-center rounded-full border text-sm font-bold"
                }
              >
                {step}
              </span>
              <span
                className={
                  isCurrent
                    ? "text-brand-navy text-xs font-semibold"
                    : "text-brand-slate text-xs"
                }
              >
                {name}
              </span>
            </li>
          );
        })}
      </ol>

      <fieldset className="space-y-4" data-step="1" hidden={currentStep !== 1}>
        <legend className="font-heading text-brand-navy mb-4 text-xl font-semibold">
          Your contact details
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            autoComplete="name"
            errors={errors?.fullName}
            id="full-name"
            label="Full name"
            name="fullName"
          />
          <TextField
            autoComplete="email"
            errors={errors?.email}
            id="full-email"
            label="Email address"
            name="email"
            type="email"
          />
          <TextField
            autoComplete="tel"
            errors={errors?.phone}
            id="full-phone"
            label="Phone number"
            name="phone"
            type="tel"
          />
          <SelectField
            errors={errors?.preferredContact}
            id="preferred-contact"
            label="Preferred contact method"
            name="preferredContact"
            options={preferredContactMethods}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4" data-step="2" hidden={currentStep !== 2}>
        <legend className="font-heading text-brand-navy mb-4 text-xl font-semibold">
          About the business
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            errors={errors?.industry}
            id="full-industry"
            label="Business industry"
            name="industry"
            options={valuationIndustries}
          />
          <SelectField
            errors={errors?.location}
            id="full-location"
            label="Business location"
            name="location"
            options={listingAreas}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4" data-step="3" hidden={currentStep !== 3}>
        <legend className="font-heading text-brand-navy mb-4 text-xl font-semibold">
          Financial overview and timing
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            errors={errors?.annualRevenueRange}
            id="full-revenue"
            label="Annual revenue"
            name="annualRevenueRange"
            options={annualRevenueRanges}
          />
          <SelectField
            errors={errors?.annualCashFlowRange}
            id="cash-flow"
            label="Annual owner benefit / cash flow"
            name="annualCashFlowRange"
            options={annualCashFlowRanges}
          />
          <SelectField
            errors={errors?.saleTimeline}
            id="sale-timeline"
            label="Possible sale timeline"
            name="saleTimeline"
            options={saleTimelines}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-5" data-step="4" hidden={currentStep !== 4}>
        <legend className="font-heading text-brand-navy mb-4 text-xl font-semibold">
          Review your request
        </legend>
        <p className="text-brand-slate text-sm leading-6">
          We will use the details you provided to respond about a possible
          business sale. Do not include sensitive documents or account details.
        </p>
        <ContactConsent id="full-consent" errors={errors?.consent} />
        <p className="text-brand-slate text-xs leading-5">
          Any valuation discussion is preliminary, subject to review, and not a
          formal appraisal or a guarantee of sale price or outcome.
        </p>
      </fieldset>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {currentStep > 1 ? (
          <Button
            onClick={() => {
              setAcknowledgedErrors(errors);
              setSelectedStep((step) => step - 1);
            }}
            type="button"
            variant="outline"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back
          </Button>
        ) : (
          <span />
        )}
        {currentStep < fullFormSteps.length ? (
          <Button
            className="min-h-12 bg-brand-navy text-primary-foreground hover:bg-brand-navy/90"
            onClick={continueToNextStep}
            type="button"
          >
            Continue
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        ) : (
          <Button
            className="min-h-12 bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
            disabled={pending}
            type="submit"
          >
            {pending ? "Submitting…" : "Request a confidential discussion"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        )}
      </div>
      <FormStatus state={state} />
    </form>
  );
}
