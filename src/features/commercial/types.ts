export const commercialPropertyTypes = [
  {
    value: "MULTIFAMILY",
    label: "Multi-Family & Apartments",
    description:
      "Multifamily properties and apartment communities across the region.",
  },
  {
    value: "OFFICE",
    label: "Executive & Medical Office",
    description:
      "Professional, medical, and executive office opportunities.",
  },
  {
    value: "INDUSTRIAL",
    label: "Industrial, Flex & Warehouse",
    description:
      "Industrial, distribution, warehouse, and flexible-use properties.",
  },
  {
    value: "RETAIL",
    label: "Prime Coastal Retail & Mixed-Use",
    description:
      "Retail and mixed-use properties in established commercial areas.",
  },
  {
    value: "LAND",
    label: "Commercial Land & Development",
    description:
      "Commercial sites and development opportunities in Southwest Florida.",
  },
  {
    value: "OTHER",
    label: "Other Commercial Assets",
    description:
      "Discuss a commercial property or asset that does not fit another category.",
  },
] as const;

export const commercialAreas = [
  {
    value: "sarasota",
    label: "Sarasota County",
    searchTerms: ["Sarasota"],
  },
  {
    value: "manatee",
    label: "Manatee County",
    searchTerms: ["Manatee", "Bradenton", "Palmetto"],
  },
  {
    value: "southwest-florida",
    label: "Southwest Florida",
    searchTerms: [],
  },
] as const;

export const commercialTransactions = [
  { value: "SALE", label: "For sale" },
  { value: "LEASE", label: "For lease" },
] as const;

export const commercialSizeRanges = [
  { value: "under-10000", label: "Under 10,000 sq ft" },
  { value: "10000-25000", label: "10,000–25,000 sq ft" },
  { value: "25000-50000", label: "25,000–50,000 sq ft" },
  { value: "over-50000", label: "Over 50,000 sq ft" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const commercialCapitalRanges = [
  { value: "under-1m", label: "Under $1 million" },
  { value: "1m-5m", label: "$1–5 million" },
  { value: "5m-10m", label: "$5–10 million" },
  { value: "over-10m", label: "Over $10 million" },
  { value: "not-sure", label: "Still evaluating" },
] as const;

export type CommercialPropertyType =
  (typeof commercialPropertyTypes)[number]["value"];
export type CommercialArea = (typeof commercialAreas)[number]["value"];
export type CommercialTransaction =
  (typeof commercialTransactions)[number]["value"];

export type CommercialFilters = {
  query: string;
  propertyType: CommercialPropertyType | "";
  area: CommercialArea | "";
  transaction: CommercialTransaction | "";
  minArea?: number;
  maxArea?: number;
  sort: "featured" | "newest" | "size-desc";
  page: number;
};

export type PublicCommercialProperty = {
  id: string;
  title: string;
  propertyType: CommercialPropertyType;
  county: string;
  summary: string;
  transactionType: CommercialTransaction;
  buildingAreaSqFt: number | null;
  illustrative: boolean;
};

export type CommercialInquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<string, string[]>>;
};
