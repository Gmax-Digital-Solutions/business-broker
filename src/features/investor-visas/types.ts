export const investorVisaPathways = [
  {
    value: "E2",
    label: "E-2 Treaty Investor",
    summary:
      "A nonimmigrant classification associated with treaty-country nationals investing substantial capital in a U.S. enterprise.",
    detail:
      "USCIS considers factors such as treaty nationality, the investment, and the applicant’s role. Individual eligibility must be assessed by immigration counsel.",
    url: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/e-2-treaty-investors",
  },
  {
    value: "EB5_DIRECT",
    label: "EB-5 Direct Investment",
    summary:
      "An immigrant investor program involving a qualifying investment and job creation or preservation.",
    detail:
      "Direct investment is one way to participate in the EB-5 program. Requirements and procedures can change; consult USCIS and independent counsel.",
    url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/eb-5-immigrant-investor-program",
  },
  {
    value: "EB5_REGIONAL_CENTER",
    label: "EB-5 Regional Center",
    summary:
      "A USCIS-administered regional center program pathway related to investment and job creation.",
    detail:
      "Project status, regional-center designation, investment structure, and immigration eligibility require independent review.",
    url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/eb-5-immigrant-investor-program",
  },
  {
    value: "L1A",
    label: "L-1A Intracompany Transferee",
    summary:
      "A nonimmigrant classification for certain executive or manager transfers within qualifying organizations.",
    detail:
      "A business purchase by itself does not establish L-1A eligibility. USCIS describes the qualifying employer and employee requirements.",
    url: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/l-1a-intracompany-transferee-executive-or-manager",
  },
] as const;

export const investorVisaPathwayOptions = [
  ...investorVisaPathways,
  { value: "UNDECIDED", label: "Still exploring" },
] as const;

export const investorBusinessPlans = [
  { value: "ACQUIRE_BUSINESS", label: "Acquire an existing business" },
  { value: "START_BUSINESS", label: "Explore starting a business" },
  { value: "RESEARCHING", label: "Still researching" },
] as const;

export type InvestorVisaPathway =
  (typeof investorVisaPathwayOptions)[number]["value"];
export type InvestorBusinessPlan =
  (typeof investorBusinessPlans)[number]["value"];

export type InvestorVisaActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<string, string[]>>;
};
