import type {
  AdvisoryService,
  ClosingItem,
  FaqItem,
  FeaturedListing,
  PersonaItem,
  ProcessStep,
  StatItem,
  Testimonial,
} from "./types";

export const demoFeaturedListings = [
  {
    slug: "marine-service-yacht-rigging-sarasota",
    title: "Turnkey Marine Service & Yacht Rigging Facility",
    category: "Marine services",
    location: "Sarasota, FL",
    credentials: "BBA Certified · SBA Pre-Qualified",
    cashFlow: 420_000,
    revenue: 1_850_000,
    askingPrice: 1_250_000,
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "commercial-hvac-contractor-manatee",
    title: "Established Commercial HVAC & Mechanical Contractor",
    category: "Commercial services",
    location: "Bradenton / Manatee",
    credentials: "Proprietary Contracts · 20+ Techs",
    cashFlow: 680_000,
    revenue: 3_200_000,
    askingPrice: 2_100_000,
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "medical-wellness-center-lakewood-ranch",
    title: "Premier Gulf Coast Medical & Wellness Center",
    category: "Healthcare",
    location: "Lakewood Ranch, FL",
    credentials: "Real Estate Available · High Margin",
    cashFlow: 310_000,
    revenue: 1_150_000,
    askingPrice: 895_000,
    featured: true,
    sortOrder: 3,
  },
] satisfies (Omit<FeaturedListing, "id"> & {
  featured: boolean;
  sortOrder: number;
})[];

export const homepageStats: StatItem[] = [
  { value: "$125M+", label: "Closed transactions" },
  { value: "25+ Years", label: "Local market expertise" },
  { value: "450+", label: "Businesses sold" },
  { value: "100%", label: "Strict confidentiality" },
];

export const homepagePersonas: PersonaItem[] = [
  {
    eyebrow: "Sell-side mandate",
    title: "Ready to Exit or Sell?",
    description:
      "Get an accurate, market-driven valuation and connect with vetted, cash-ready buyers. Protect your operations with institutional confidentiality protocols.",
    href: "/sell-a-business",
    linkLabel: "Request a Confidential Valuation",
    icon: "sell",
  },
  {
    eyebrow: "Buy-side mandate",
    title: "Looking to Buy an Established Business?",
    description:
      "Skip the startup risk with profitable, cash-flowing businesses ready for transition. Access proprietary off-market targets and turnkey Gulf Coast enterprises.",
    href: "/businesses-for-sale",
    linkLabel: "View Available Opportunities",
    icon: "buy",
  },
];

export const sellerSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Confidential Consultation",
    description:
      "We assess your timeline and exit objectives, then establish non-disclosure parameters before reviewing business records.",
  },
  {
    number: "02",
    title: "Precision Valuation",
    description:
      "We review historical financial statements, including SDE and EBITDA, alongside relevant regional market context.",
  },
  {
    number: "03",
    title: "Blind Marketing & Vetting",
    description:
      "Targeted outreach uses blind profiles. Qualified buyers sign an NDA before receiving confidential information.",
  },
  {
    number: "04",
    title: "Negotiation & Closing",
    description:
      "We help coordinate letters of intent, due diligence, escrow, and closing through final funding.",
  },
];

export const buyerSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Goals Consultation",
    description:
      "Clarify target industry, earnings goals, geographic preferences, and available equity or financing.",
  },
  {
    number: "02",
    title: "Review Pre-Screened Deals",
    description:
      "Use an NDA to review standardized confidential information and relevant financial recasts.",
  },
  {
    number: "03",
    title: "Due Diligence & SBA",
    description:
      "Coordinate lender conversations, financial reviews, and verification of business assets and operations.",
  },
  {
    number: "04",
    title: "Acquisition & Handover",
    description:
      "Coordinate closing with qualified counsel and agree on a practical post-closing transition.",
  },
];

export const advisoryServices: AdvisoryService[] = [
  {
    title: "Commercial Real Estate",
    description:
      "Office, industrial, flex spaces, and investment properties across Manatee and Sarasota. Integrate business and property decisions.",
    icon: "real-estate",
    href: "/commercial-real-estate",
    linkLabel: "Explore CRE Inventory",
  },
  {
    title: "Funding & Capital Solutions",
    description:
      "Owner-financing advisory and coordination with SBA and retirement-plan professionals for transaction financing.",
    icon: "capital",
    href: "/contact",
    linkLabel: "Learn Capital Structures",
  },
  {
    title: "Franchise Resales & Development",
    description:
      "Explore established resales and multi-unit opportunities with a clear view of operating history and unit economics.",
    icon: "franchise",
    href: "/franchise-opportunities",
    linkLabel: "View Franchise Resales",
  },
  {
    title: "Cross-Border Investor Visas",
    description:
      "Review business opportunities with qualified immigration counsel when pursuing an investor or intracompany-transfer pathway.",
    icon: "visas",
    href: "/investor-visas",
    linkLabel: "Visa Acquisition Guidelines",
  },
];

export const fiduciaryPrinciples = [
  {
    title: "Former Business Owners On Your Side",
    description:
      "Our intermediaries understand the operational and personal complexity of planning a business transition.",
  },
  {
    title: "Multilingual Team, Global Buyer Reach",
    description:
      "Connect with domestic and international buyers while protecting confidential business information.",
  },
  {
    title: "Transaction Broker Mastery",
    description:
      "Balanced transaction coordination supports transparent buyer discovery and owner confidentiality.",
  },
];

export const recentClosings: ClosingItem[] = [
  {
    industry: "Marine Manufacturing Co.",
    location: "Sarasota, Florida",
    daysToClose: 78,
    result: "Full asking price",
  },
  {
    industry: "B2B Specialty Distribution",
    location: "Bradenton, Florida",
    daysToClose: 54,
    result: "SBA 7(a)",
  },
  {
    industry: "Multi-Unit Wellness Group",
    location: "Lakewood Ranch, Florida",
    daysToClose: 92,
    result: "Multi-offer",
  },
  {
    industry: "Precision CNC Fabrication",
    location: "Palmetto & Manatee County, Florida",
    daysToClose: 63,
    result: "Cash buyer",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Exceptional discretion throughout the marketing period. The sale closed near our target valuation without operational disruption.",
    name: "Founder & Principal",
    title: "Light Manufacturing",
    organization: "Sarasota",
  },
  {
    quote:
      "They helped us navigate financing, organize financial reviews, and keep the closing process moving.",
    name: "Strategic Acquirer",
    title: "Commercial Services Group",
    organization: "Florida",
  },
  {
    quote:
      "Their process focused attention on qualified buyers and made the confidential review more manageable.",
    name: "Operating Partner",
    title: "Hospitality",
    organization: "Bradenton",
  },
];

export const homepageFaqs: FaqItem[] = [
  {
    question:
      "How much is my business actually worth in today's Florida market?",
    answer:
      "A valuation may consider Seller’s Discretionary Earnings (SDE), adjusted EBITDA, owner-dependence, contracts, financial transparency, and relevant market comparisons. Multiples vary by business and are not a guarantee of value.",
  },
  {
    question:
      "How long does it typically take to sell a business in Sarasota or Bradenton?",
    answer:
      "Timing depends on preparation, pricing, buyer fit, financing, and diligence. A sale can take several months; no specific timeline or closing date can be guaranteed.",
  },
  {
    question:
      "Will my employees, suppliers, or competitors find out I am selling?",
    answer:
      "A confidential process can use a blind business profile and require prospective buyers to sign a non-disclosure agreement before receiving identifying information. Absolute confidentiality cannot be guaranteed.",
  },
  {
    question: "How do buyers finance acquisitions using SBA 7(a) lending?",
    answer:
      "Some qualifying business purchases use SBA 7(a) financing. Eligibility, down payment, loan amount, and terms depend on the buyer, business, lender, and current program requirements. Speak with an SBA-preferred lender.",
  },
  {
    question:
      "Can I utilize retirement funds (401k/IRA) to buy a business penalty-free?",
    answer:
      "Certain retirement-funding structures may be available, but they involve tax, legal, and plan-compliance considerations. Consult qualified tax, legal, and retirement-plan professionals before making a decision.",
  },
];
