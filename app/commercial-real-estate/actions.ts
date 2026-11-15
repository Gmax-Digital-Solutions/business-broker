"use server";

import { z } from "zod";

import {
  commercialAreas,
  commercialCapitalRanges,
  commercialSizeRanges,
  type CommercialInquiryState,
} from "@/src/features/commercial/types";
import { getPrismaClient } from "@/src/lib/prisma";

const selection = (options: readonly { value: string }[], message: string) =>
  z.string().refine(
    (value) => options.some((option) => option.value === value),
    message,
  );

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address."));

const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name.").max(120),
  email: emailSchema,
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
  propertyType: z.enum(
    ["MULTIFAMILY", "OFFICE", "INDUSTRIAL", "RETAIL", "LAND", "OTHER"],
    { error: "Choose a property type." },
  ),
  area: selection(commercialAreas, "Choose a search area."),
  sizeRange: selection(
    [{ value: "" }, ...commercialSizeRanges],
    "Choose a property size range.",
  ),
  capitalRange: selection(
    [{ value: "" }, ...commercialCapitalRanges],
    "Choose a capital range.",
  ),
  message: z.string().trim().max(1000, "Keep your message under 1,000 characters."),
  consent: z.literal("on", {
    error: "Please confirm you agree to be contacted about this request.",
  }),
});

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getFieldErrors(
  error: z.ZodError,
): CommercialInquiryState["fieldErrors"] {
  return error.flatten().fieldErrors;
}

export async function submitCommercialInquiry(
  _previousState: CommercialInquiryState,
  formData: FormData,
): Promise<CommercialInquiryState> {
  const parsed = inquirySchema.safeParse({
    fullName: getFormValue(formData, "fullName"),
    email: getFormValue(formData, "email"),
    phone: getFormValue(formData, "phone"),
    propertyType: getFormValue(formData, "propertyType"),
    area: getFormValue(formData, "area"),
    sizeRange: getFormValue(formData, "sizeRange"),
    capitalRange: getFormValue(formData, "capitalRange"),
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
    await getPrismaClient().commercialPropertyInquiry.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        propertyType: parsed.data.propertyType,
        area: parsed.data.area,
        sizeRange: parsed.data.sizeRange || null,
        capitalRange: parsed.data.capitalRange || null,
        message: parsed.data.message || null,
        contactConsent: true,
      },
    });
  } catch (error) {
    console.error("Could not save the commercial property inquiry.", error);
    return {
      status: "error",
      message: "We couldn't submit your request. Please try again.",
    };
  }

  return {
    status: "success",
    message:
      "Your request has been received. An advisor can follow up about your commercial property search.",
  };
}
