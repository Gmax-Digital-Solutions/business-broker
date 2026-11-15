export const listingAreas = [
  { value: "sarasota", label: "Sarasota County", searchTerms: ["Sarasota"] },
  {
    value: "manatee",
    label: "Manatee / Bradenton",
    searchTerms: ["Manatee", "Bradenton", "Palmetto"],
  },
  {
    value: "lakewood",
    label: "Lakewood Ranch",
    searchTerms: ["Lakewood Ranch"],
  },
  {
    value: "hillsborough",
    label: "Hillsborough / Tampa",
    searchTerms: ["Hillsborough", "Tampa"],
  },
  {
    value: "pinellas",
    label: "Pinellas / St. Pete",
    searchTerms: ["Pinellas", "St. Pete"],
  },
] as const;

export const listingCredentials = [
  { value: "sba", label: "SBA Pre-Qualified", searchTerm: "SBA" },
  {
    value: "owner-financing",
    label: "Owner Financing",
    searchTerm: "Owner Financing",
  },
  {
    value: "real-estate",
    label: "Real Estate Included",
    searchTerm: "Real Estate",
  },
  {
    value: "visa",
    label: "E-2 Visa Eligible",
    searchTerm: "E-2",
  },
  {
    value: "relocatable",
    label: "Relocatable Enterprise",
    searchTerm: "Relocatable",
  },
] as const;

export const listingSorts = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Asking price: low to high" },
  { value: "price-desc", label: "Asking price: high to low" },
  { value: "cash-flow-desc", label: "Cash flow: highest first" },
  { value: "newest", label: "Recently added" },
] as const;

export type ListingFilters = {
  query: string;
  industry: string;
  area: (typeof listingAreas)[number]["value"] | "";
  credential: (typeof listingCredentials)[number]["value"] | "";
  sort: (typeof listingSorts)[number]["value"];
  page: number;
  minPrice?: number;
  maxPrice?: number;
  minCashFlow?: number;
  view: "grid" | "list";
};

export type PublicListingSummary = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  credentials: string | null;
};

export type ListingCategoryCount = {
  category: string;
  count: number;
};

export type ListingOption = {
  slug: string;
  title: string;
};

export type LeadActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<string, string[]>>;
};
