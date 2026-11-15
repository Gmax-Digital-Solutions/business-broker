"use client";

import { useActionState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  commercialAreas,
  commercialCapitalRanges,
  commercialPropertyTypes,
  commercialSizeRanges,
  type CommercialInquiryState,
} from "@/src/features/commercial/types";
import { submitCommercialInquiry } from "./actions";

const initialState: CommercialInquiryState = {
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
  if (!errors?.[0]) {
    return null;
  }

  return (
    <p className="text-destructive mt-1 text-xs" id={`${id}-error`}>
      {errors[0]}
    </p>
  );
}

function InquiryField({
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

export function CommercialInquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitCommercialInquiry,
    initialState,
  );

  return (
    <section
      className="bg-brand-navy text-primary-foreground grid gap-8 rounded-xl p-5 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
      id="commercial-inquiry"
    >
      <div className="flex flex-col justify-center">
        <p className="text-brand-gold inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
          <ShieldCheck aria-hidden="true" className="size-4" />
          Commercial property inquiry
        </p>
        <h2 className="font-heading mt-3 text-3xl leading-tight font-semibold sm:text-4xl">
          Looking for a property that is not listed publicly?
        </h2>
        <p className="text-primary-foreground/80 mt-4 text-sm leading-6">
          Share your goals and an advisor can follow up about potential
          opportunities and the information available for review.
        </p>
        <p className="text-primary-foreground/75 mt-5 text-xs leading-5">
          Confidential property details are withheld until the appropriate
          qualification and disclosure steps are completed. A request does not
          guarantee access or availability.
        </p>
        <p className="text-brand-gold mt-3 text-xs leading-5">
          Any financing is subject to lender approval and underwriting.
        </p>
      </div>

      <form
        action={formAction}
        className="border-primary-foreground/20 bg-card space-y-4 rounded-lg border p-5 text-brand-navy sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <InquiryField
            errors={state.fieldErrors?.propertyType}
            id="commercial-property-type"
            label="Target asset class"
          >
            <select
              aria-describedby={
                state.fieldErrors?.propertyType
                  ? "commercial-property-type-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.propertyType)}
              className={fieldClassName}
              defaultValue=""
              id="commercial-property-type"
              name="propertyType"
              required
            >
              <option disabled value="">
                Select an asset class
              </option>
              {commercialPropertyTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.area}
            id="commercial-area-choice"
            label="County / submarket"
          >
            <select
              aria-describedby={
                state.fieldErrors?.area
                  ? "commercial-area-choice-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.area)}
              className={fieldClassName}
              defaultValue=""
              id="commercial-area-choice"
              name="area"
              required
            >
              <option disabled value="">
                Select a search area
              </option>
              {commercialAreas.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.sizeRange}
            id="commercial-size-range"
            label="Desired building size"
          >
            <select
              aria-describedby={
                state.fieldErrors?.sizeRange
                  ? "commercial-size-range-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.sizeRange)}
              className={fieldClassName}
              defaultValue=""
              id="commercial-size-range"
              name="sizeRange"
            >
              <option value="">Not specified</option>
              {commercialSizeRanges.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.capitalRange}
            id="commercial-capital-range"
            label="Available capital / budget"
          >
            <select
              aria-describedby={
                state.fieldErrors?.capitalRange
                  ? "commercial-capital-range-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.capitalRange)}
              className={fieldClassName}
              defaultValue=""
              id="commercial-capital-range"
              name="capitalRange"
            >
              <option value="">Not specified</option>
              {commercialCapitalRanges.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.fullName}
            id="commercial-full-name"
            label="Full name"
          >
            <Input
              aria-describedby={
                state.fieldErrors?.fullName
                  ? "commercial-full-name-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.fullName)}
              autoComplete="name"
              className="min-h-11"
              id="commercial-full-name"
              maxLength={120}
              name="fullName"
              required
            />
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.email}
            id="commercial-email"
            label="Business email"
          >
            <Input
              aria-describedby={
                state.fieldErrors?.email ? "commercial-email-error" : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.email)}
              autoComplete="email"
              className="min-h-11"
              id="commercial-email"
              maxLength={254}
              name="email"
              required
              type="email"
            />
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.phone}
            id="commercial-phone"
            label="Phone (optional)"
          >
            <Input
              aria-describedby={
                state.fieldErrors?.phone ? "commercial-phone-error" : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.phone)}
              autoComplete="tel"
              className="min-h-11"
              id="commercial-phone"
              maxLength={40}
              name="phone"
              type="tel"
            />
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.message}
            id="commercial-message"
            label="Property or area of interest (optional)"
          >
            <textarea
              aria-describedby={
                state.fieldErrors?.message
                  ? "commercial-message-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.message)}
              className={fieldClassName}
              id="commercial-message"
              maxLength={1000}
              name="message"
              rows={3}
            />
          </InquiryField>
        </div>

        <div>
          <div className="flex items-start gap-2">
            <input
              aria-describedby={
                state.fieldErrors?.consent
                  ? "commercial-consent-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.consent)}
              className="accent-brand-navy mt-1 size-4 shrink-0"
              id="commercial-consent"
              name="consent"
              required
              type="checkbox"
            />
            <label
              className="text-brand-slate text-xs leading-5"
              htmlFor="commercial-consent"
            >
              I agree to be contacted about this commercial property inquiry.
            </label>
          </div>
          <FieldError errors={state.fieldErrors?.consent} id="commercial-consent" />
        </div>

        <Button
          className="min-h-11 bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
          disabled={pending}
          type="submit"
        >
          {pending ? "Submitting…" : "Submit commercial inquiry"}
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
