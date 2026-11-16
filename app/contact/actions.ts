"use server";

import { z } from "zod";

import type { ContactActionState } from "@/src/features/contact/types";
import { getPrismaClient } from "@/src/lib/prisma";

const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name.").max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254)
    .pipe(z.email("Enter a valid email address.")),
  phone: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z
      .string()
      .trim()
      .max(40)
      .refine(
        (value) => /^\+?[\d ()-]{7,20}$/.test(value),
        "Enter a valid phone number.",
      )
      .optional(),
  ),
  topic: z.enum(
    [
      "BUSINESS_SALE",
      "BUSINESS_PURCHASE",
      "COMMERCIAL_PROPERTY",
      "FRANCHISE",
      "OTHER",
    ],
    { error: "Choose an inquiry topic." },
  ),
  message: z.string().trim().max(1200, "Keep your message under 1,200 characters."),
  consent: z.literal("on", {
    error: "Please confirm you agree to be contacted about this inquiry.",
  }),
});

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getFieldErrors(
  error: z.ZodError,
): ContactActionState["fieldErrors"] {
  return error.flatten().fieldErrors;
}

export async function submitContactInquiry(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const parsed = inquirySchema.safeParse({
    fullName: getFormValue(formData, "fullName"),
    email: getFormValue(formData, "email"),
    phone: getFormValue(formData, "phone"),
    topic: getFormValue(formData, "topic"),
    message: getFormValue(formData, "message"),
    consent: getFormValue(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted fields and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  try {
    await getPrismaClient().contactInquiry.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        topic: parsed.data.topic,
        message: parsed.data.message || null,
        contactConsent: true,
      },
    });
  } catch (error) {
    console.error("Could not save the contact inquiry.", error);
    return {
      status: "error",
      message: "We couldn't submit your inquiry. Please try again.",
    };
  }

  return {
    status: "success",
    message:
      "Your inquiry has been received. Please do not send confidential records or financial information through this form.",
  };
}
