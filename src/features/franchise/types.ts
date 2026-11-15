export const franchisePathways = [
  {
    value: "CONSULTING",
    label: "Franchise consulting",
    description:
      "Explore franchise models that align with your experience and goals.",
    badge: "Advisory",
  },
  {
    value: "SINGLE_UNIT",
    label: "Single-unit franchise",
    description:
      "Consider operating a single franchise location or service territory.",
    badge: "Owner / operator",
  },
  {
    value: "MASTER_FRANCHISE",
    label: "Master franchise",
    description:
      "Explore regional development rights and the responsibilities they involve.",
    badge: "Regional development",
  },
  {
    value: "AREA_DEVELOPMENT",
    label: "Area development",
    description:
      "Evaluate an agreed plan for developing multiple locations over time.",
    badge: "Multi-unit",
  },
  {
    value: "RESALE",
    label: "Franchise resale",
    description:
      "Consider an existing franchise transfer, subject to diligence and franchisor approval.",
    badge: "Existing business",
  },
  {
    value: "CONVERSION",
    label: "Franchise conversion",
    description:
      "Discuss whether an independent business could pursue a franchise conversion.",
    badge: "Existing business",
  },
] as const;

export const franchiseSectors = [
  { value: "FOOD_BEVERAGE", label: "Food & beverage" },
  { value: "BUSINESS_SERVICES", label: "Business services" },
  { value: "HOME_SERVICES", label: "Home services" },
  { value: "HEALTH_WELLNESS", label: "Health & wellness" },
  { value: "AUTOMOTIVE", label: "Automotive" },
  { value: "OTHER", label: "Other / undecided" },
] as const;

export const franchiseMarkets = [
  { value: "SARASOTA", label: "Sarasota County" },
  { value: "MANATEE", label: "Manatee County" },
  { value: "SOUTHWEST_FLORIDA", label: "Southwest Florida" },
  { value: "OTHER", label: "Other / flexible" },
] as const;

export const franchiseCapitalBands = [
  { value: "UNDECIDED", label: "Still evaluating" },
  { value: "UNDER_150K", label: "Under $150,000" },
  { value: "FROM_150K_TO_350K", label: "$150,000–$350,000" },
  { value: "FROM_350K_TO_750K", label: "$350,000–$750,000" },
  { value: "OVER_750K", label: "Over $750,000" },
] as const;

export const franchiseTimeframes = [
  { value: "IMMEDIATE", label: "As soon as practical" },
  { value: "WITHIN_SIX_MONTHS", label: "Within 6 months" },
  { value: "WITHIN_TWELVE_MONTHS", label: "Within 12 months" },
  { value: "RESEARCHING", label: "Researching options" },
] as const;

export type FranchisePathway = (typeof franchisePathways)[number]["value"];
export type FranchiseMarket = (typeof franchiseMarkets)[number]["value"];
export type FranchiseCapitalBand =
  (typeof franchiseCapitalBands)[number]["value"];
export type FranchiseTimeframe = (typeof franchiseTimeframes)[number]["value"];

export type FranchiseFilters = {
  query: string;
  pathway: FranchisePathway | "";
  sector: (typeof franchiseSectors)[number]["value"] | "";
  market: FranchiseMarket | "";
  page: number;
};

export type PublicFranchiseOpportunity = {
  id: string;
  slug: string;
  title: string;
  pathway: FranchisePathway;
  sector: string;
  market: FranchiseMarket;
  summary: string;
  illustrative: boolean;
};

export type FranchiseActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<string, string[]>>;
};
