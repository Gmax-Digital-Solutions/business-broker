export const CITY_COORDS = {
  Bradenton: { county: "Manatee", lat: 27.4989, lon: -82.5748 },
  Palmetto: { county: "Manatee", lat: 27.5214, lon: -82.5723 },
  "Lakewood Ranch": { county: "Manatee", lat: 27.39, lon: -82.41 },
  "Anna Maria": { county: "Manatee", lat: 27.5273, lon: -82.7343 },
  "Holmes Beach": { county: "Manatee", lat: 27.4953, lon: -82.7118 },
  "Longboat Key": { county: "Manatee", lat: 27.4122, lon: -82.658 },
  Parrish: { county: "Manatee", lat: 27.5876, lon: -82.4242 },
  Ellenton: { county: "Manatee", lat: 27.52, lon: -82.526 },
  "Bradenton Beach": { county: "Manatee", lat: 27.467, lon: -82.702 },
  Sarasota: { county: "Sarasota", lat: 27.3364, lon: -82.5307 },
  "Siesta Key": { county: "Sarasota", lat: 27.267, lon: -82.547 },
  Venice: { county: "Sarasota", lat: 27.0998, lon: -82.4543 },
  "North Port": { county: "Sarasota", lat: 27.0442, lon: -82.2359 },
  Osprey: { county: "Sarasota", lat: 27.193, lon: -82.483 },
  "Englewood": { county: "Sarasota", lat: 26.962, lon: -82.3526 },
} as const;

export const BUSINESS_INDUSTRIES = [
  {
    category: "Restaurant / Cafe / Bar",
    sdeMin: 70000,
    sdeMax: 320000,
    multipleMin: 1.5,
    multipleMax: 2.6,
    marginMin: 0.1,
    marginMax: 0.2,
    titles: [
      "Established Waterfront Restaurant",
      "Popular Neighborhood Cafe",
      "Coastal Craft Bar & Grill",
      "Turnkey Beachside Dining Concept",
      "Neighborhood Family Restaurant",
    ],
  },
  {
    category: "Retail / Boutique",
    sdeMin: 60000,
    sdeMax: 250000,
    multipleMin: 1.8,
    multipleMax: 2.8,
    marginMin: 0.12,
    marginMax: 0.25,
    titles: [
      "Turnkey Coastal Gift Boutique",
      "Well-Established Specialty Retail Shop",
      "Popular Lifestyle Boutique",
      "Scenic Home & Gift Store",
      "Neighborhood Fashion & Accessories Shop",
    ],
  },
  {
    category: "Marine",
    sdeMin: 90000,
    sdeMax: 400000,
    multipleMin: 2,
    multipleMax: 3.2,
    marginMin: 0.15,
    marginMax: 0.3,
    titles: [
      "Profitable Charter Fishing Operation",
      "Full-Service Marine Maintenance Business",
      "Premium Boat Rental & Tour Company",
      "Established Yacht Service Operation",
      "Turnkey Waterfront Watercraft Business",
    ],
  },
  {
    category: "Home Services",
    sdeMin: 100000,
    sdeMax: 500000,
    multipleMin: 2.2,
    multipleMax: 3.5,
    marginMin: 0.15,
    marginMax: 0.3,
    titles: [
      "Well-Established Pool Service Route",
      "Profitable HVAC Service Company",
      "Respected Landscaping & Maintenance Business",
      "Turnkey Cleaning & Property Care Company",
      "Established Residential Services Operation",
    ],
  },
  {
    category: "Health & Wellness",
    sdeMin: 120000,
    sdeMax: 450000,
    multipleMin: 2,
    multipleMax: 3.4,
    marginMin: 0.18,
    marginMax: 0.32,
    titles: [
      "Boutique Fitness Studio",
      "Growing Med Spa Practice",
      "Well-Located Salon & Wellness Studio",
      "Full-Service Spa & Beauty Business",
      "Premium Wellness & Recovery Center",
    ],
  },
  {
    category: "Professional Services",
    sdeMin: 120000,
    sdeMax: 550000,
    multipleMin: 2.4,
    multipleMax: 3.8,
    marginMin: 0.25,
    marginMax: 0.4,
    titles: [
      "Established Insurance Agency Book",
      "Growing Accounting & Advisory Practice",
      "Staffing Business with Recurring Clients",
      "Regional Business Consulting Practice",
      "Well-Positioned Professional Services Firm",
    ],
  },
  {
    category: "Automotive",
    sdeMin: 100000,
    sdeMax: 420000,
    multipleMin: 2,
    multipleMax: 3.2,
    marginMin: 0.15,
    marginMax: 0.28,
    titles: [
      "Full-Service Auto Repair Shop",
      "High-Traffic Detailing & Paint Business",
      "Profitable Car Wash Operation",
      "Well-Established Vehicle Service Center",
      "Neighborhood Auto Care Business",
    ],
  },
  {
    category: "E-commerce / Online",
    sdeMin: 80000,
    sdeMax: 600000,
    multipleMin: 2.5,
    multipleMax: 3.8,
    marginMin: 0.2,
    marginMax: 0.35,
    titles: [
      "Profitable Online Retail Brand",
      "Strong Direct-to-Consumer Ecommerce Business",
      "Healthy Digital Product Brand",
      "Established Online Home Goods Business",
      "Subscription-Driven Consumer Brand",
    ],
  },
  {
    category: "Education & Childcare",
    sdeMin: 90000,
    sdeMax: 350000,
    multipleMin: 2,
    multipleMax: 3,
    marginMin: 0.15,
    marginMax: 0.28,
    titles: [
      "Licensed Learning Center",
      "Trusted Childcare & Enrichment Business",
      "Well-Established Tutoring Studio",
      "Neighborhood Early Education Center",
      "Growing Youth Development Program",
    ],
  },
  {
    category: "Light Manufacturing / Distribution",
    sdeMin: 150000,
    sdeMax: 700000,
    multipleMin: 2.5,
    multipleMax: 4,
    marginMin: 0.12,
    marginMax: 0.25,
    titles: [
      "Regional Distribution Business",
      "Well-Positioned Light Manufacturing Company",
      "Turnkey Distribution & Fulfillment Operation",
      "Growing Industrial Supply Business",
      "Stable Logistics & Distribution Company",
    ],
  },
] as const;

export const NONCONFIDENTIAL_NEIGHBORHOODS = [
  "waterfront",
  "downtown",
  "plaza",
  "tourist corridor",
  "residential corridor",
  "commercial district",
];

export const REASONS_FOR_SELLING = [
  "retirement",
  "relocation",
  "other ventures",
  "family transition",
  "owner availability change",
  "strategic exit",
] as const;

export const GROWTH_OPPORTUNITY_TEMPLATES = [
  "expand digital marketing and local partnerships to deepen repeat demand",
  "add new service lines or upsell packages to increase average ticket size",
  "improve scheduling and employee retention to support faster growth",
  "extend operating hours and improve online booking to capture more demand",
  "build on recurring revenue and improve cross-selling across the current base",
  "expand into adjacent markets with a more targeted local sales strategy",
] as const;

export const TRAINING_SUPPORT_TEMPLATES = [
  "hands-on transition support from the current owner for several weeks",
  "training on customer relationships, vendor management, and day-to-day operations",
  "documented processes and staff onboarding guidance for a smooth handoff",
  "operational playbooks and a practical transition plan for the new owner",
  "continued advisory support during the first months of ownership",
  "owner involvement negotiated to fit the needs of the buyer and team",
] as const;

export const COMMERCIAL_PROPERTY_TYPES = [
  {
    type: "OFFICE",
    label: "Office",
    sqFtMin: 1200,
    sqFtMax: 18000,
    rateMin: 150,
    rateMax: 320,
    leaseMin: 22,
    leaseMax: 38,
  },
  {
    type: "INDUSTRIAL",
    label: "Warehouse / Flex",
    sqFtMin: 3000,
    sqFtMax: 45000,
    rateMin: 90,
    rateMax: 190,
    leaseMin: 9,
    leaseMax: 16,
  },
  {
    type: "RETAIL",
    label: "Retail",
    sqFtMin: 900,
    sqFtMax: 12000,
    rateMin: 180,
    rateMax: 420,
    leaseMin: 20,
    leaseMax: 48,
  },
  {
    type: "MULTIFAMILY",
    label: "Apartments",
    sqFtMin: 2500,
    sqFtMax: 50000,
    rateMin: 160,
    rateMax: 260,
    leaseMin: 18,
    leaseMax: 30,
  },
  {
    type: "LAND",
    label: "Land",
    sqFtMin: 10890,
    sqFtMax: 522720,
    rateMin: 20,
    rateMax: 90,
    leaseMin: 0,
    leaseMax: 0,
  },
  {
    type: "OTHER",
    label: "Mixed-use",
    sqFtMin: 1800,
    sqFtMax: 24000,
    rateMin: 150,
    rateMax: 260,
    leaseMin: 18,
    leaseMax: 32,
  },
] as const;

export const COMMERCIAL_ZONING = [
  "C-1",
  "C-2",
  "I-1",
  "PD-R",
  "MU",
  "GC",
  "R-3",
] as const;

export const FRANCHISE_CATEGORIES = [
  "fitness franchise",
  "sandwich shop",
  "home care",
  "tutoring",
  "cleaning",
  "quick-service restaurant",
] as const;

export const FRANCHISE_PATHWAYS = [
  "RESALE",
  "CONVERSION",
  "SINGLE_UNIT",
  "AREA_DEVELOPMENT",
] as const;

export const FRANCHISE_MARKETS = [
  "SARASOTA",
  "MANATEE",
  "SOUTHWEST_FLORIDA",
  "OTHER",
] as const;

export const COUNTY_BOUNDS = {
  Manatee: { minLat: 27.23, maxLat: 27.7, minLon: -82.8, maxLon: -82.18 },
  Sarasota: { minLat: 26.84, maxLat: 27.45, minLon: -82.8, maxLon: -82.08 },
} as const;

export const CITY_ORDER = Object.keys(CITY_COORDS) as (keyof typeof CITY_COORDS)[];
