"use client";

import { useActionState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  contactTopics,
  type ContactActionState,
} from "@/src/features/contact/types";
import { submitContactInquiry } from "./actions";

const initialState: ContactActionState = {
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

export function ContactInquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitContactInquiry,
    initialState,
  );
  const errorProps = (field: keyof NonNullable<ContactActionState["fieldErrors"]>, id: string) => ({
    "aria-describedby": state.fieldErrors?.[field] ? `${id}-error` : undefined,
    "aria-invalid": Boolean(state.fieldErrors?.[field]),
  });

  return (
    <section
      aria-labelledby="contact-inquiry-heading"
      className="border-border bg-card rounded-lg border p-5 sm:p-7"
      id="contact-inquiry"
    >
      <div className="border-border border-b pb-5">
        <p className="text-brand-bronze inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
          <ShieldCheck aria-hidden="true" className="size-4" />
          Contact inquiry
        </p>
        <h2
          className="font-heading text-brand-navy mt-3 text-2xl font-semibold sm:text-3xl"
          id="contact-inquiry-heading"
        >
          Tell us what you are exploring
        </h2>
        <p className="text-brand-slate mt-2 text-sm leading-6">
          Share basic contact information and a brief, non-confidential message.
        </p>
      </div>

      <form action={formAction} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <InquiryField
            errors={state.fieldErrors?.fullName}
            id="contact-full-name"
            label="Full name"
          >
            <Input
              {...errorProps("fullName", "contact-full-name")}
              autoComplete="name"
              className="min-h-11"
              id="contact-full-name"
              maxLength={120}
              name="fullName"
              required
            />
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.email}
            id="contact-email"
            label="Email address"
          >
            <Input
              {...errorProps("email", "contact-email")}
              autoComplete="email"
              className="min-h-11"
              id="contact-email"
              maxLength={254}
              name="email"
              required
              type="email"
            />
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.phone}
            id="contact-phone"
            label="Phone (optional)"
          >
            <Input
              {...errorProps("phone", "contact-phone")}
              autoComplete="tel"
              className="min-h-11"
              id="contact-phone"
              maxLength={40}
              name="phone"
              type="tel"
            />
          </InquiryField>

          <InquiryField
            errors={state.fieldErrors?.topic}
            id="contact-topic"
            label="What would you like to discuss?"
          >
            <select
              {...errorProps("topic", "contact-topic")}
              className={fieldClassName}
              defaultValue=""
              id="contact-topic"
              name="topic"
              required
            >
              <option disabled value="">
                Select a topic
              </option>
              {contactTopics.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
          </InquiryField>
        </div>

        <InquiryField
          errors={state.fieldErrors?.message}
          id="contact-message"
          label="Message (optional)"
        >
          <textarea
            {...errorProps("message", "contact-message")}
            className={fieldClassName}
            id="contact-message"
            maxLength={1200}
            name="message"
            placeholder="Briefly describe what you would like to discuss. Do not include confidential or financial details."
            rows={5}
          />
        </InquiryField>

        <div>
          <div className="flex items-start gap-2">
            <input
              {...errorProps("consent", "contact-consent")}
              className="accent-brand-navy mt-1 size-4 shrink-0"
              id="contact-consent"
              name="consent"
              required
              type="checkbox"
            />
            <label
              className="text-brand-slate text-xs leading-5"
              htmlFor="contact-consent"
            >
              I agree to be contacted about this inquiry.
            </label>
          </div>
          <FieldError
            errors={state.fieldErrors?.consent}
            id="contact-consent"
          />
        </div>

        <p className="text-brand-slate text-xs leading-5">
          This public form is not for confidential records or financial account
          information. Submitting it does not guarantee confidentiality or
          create an advisory or attorney-client relationship.
        </p>

        <Button
          className="min-h-11 bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
          disabled={pending}
          type="submit"
        >
          {pending ? "Submitting…" : "Send inquiry"}
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
