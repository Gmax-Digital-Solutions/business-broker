export const valuationIndustries = [
  { value: "marine", label: "Marine & boating" },
  { value: "commercial-services", label: "Commercial services" },
  { value: "healthcare", label: "Healthcare & wellness" },
  { value: "hospitality", label: "Hospitality & food service" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "professional-services", label: "Professional services" },
  { value: "retail", label: "Retail & distribution" },
  { value: "other", label: "Other" },
] as const;

export const annualRevenueRanges = [
  { value: "under-500k", label: "Under $500,000" },
  { value: "500k-1m", label: "$500,000–$1 million" },
  { value: "1m-3m", label: "$1–3 million" },
  { value: "3m-10m", label: "$3–10 million" },
  { value: "over-10m", label: "Over $10 million" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const annualCashFlowRanges = [
  { value: "under-100k", label: "Under $100,000" },
  { value: "100k-250k", label: "$100,000–$250,000" },
  { value: "250k-500k", label: "$250,000–$500,000" },
  { value: "500k-1m", label: "$500,000–$1 million" },
  { value: "over-1m", label: "Over $1 million" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const saleTimelines = [
  { value: "under-6-months", label: "Within 6 months" },
  { value: "6-12-months", label: "6–12 months" },
  { value: "over-12-months", label: "More than 12 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const preferredContactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
] as const;
