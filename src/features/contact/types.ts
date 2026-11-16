export const contactTopics = [
  { value: "BUSINESS_SALE", label: "Selling a business" },
  { value: "BUSINESS_PURCHASE", label: "Buying a business" },
  { value: "COMMERCIAL_PROPERTY", label: "Commercial real estate" },
  { value: "FRANCHISE", label: "Franchise opportunities" },
  { value: "OTHER", label: "Other inquiry" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["value"];

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<
    Record<"fullName" | "email" | "phone" | "topic" | "message" | "consent", string[]>
  >;
};
