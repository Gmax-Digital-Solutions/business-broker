import { faker } from "@faker-js/faker";

import {
  BUSINESS_INDUSTRIES,
  CITY_COORDS,
  CITY_ORDER,
  COMMERCIAL_PROPERTY_TYPES,
  COMMERCIAL_ZONING,
  COUNTY_BOUNDS,
  FRANCHISE_CATEGORIES,
  FRANCHISE_MARKETS,
  FRANCHISE_PATHWAYS,
  GROWTH_OPPORTUNITY_TEMPLATES,
  NONCONFIDENTIAL_NEIGHBORHOODS,
  REASONS_FOR_SELLING,
  TRAINING_SUPPORT_TEMPLATES,
} from "./data";

export type BusinessListingSeed = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  county: string;
  credentials: string | null;
  cashFlow: number;
  revenue: number;
  askingPrice: number;
  status: string;
  featured: boolean;
  sortOrder: number;
  city: string;
  lat: number;
  lon: number;
  sde: number;
  multiple: number;
};

export type CommercialPropertySeed = {
  id: string;
  slug: string;
  title: string;
  propertyType: "MULTIFAMILY" | "OFFICE" | "INDUSTRIAL" | "RETAIL" | "LAND" | "OTHER";
  county: string;
  summary: string;
  transactionType: "SALE" | "LEASE";
  buildingAreaSqFt: number;
  featured: boolean;
  sortOrder: number;
  status: string;
  city: string;
  lat: number;
  lon: number;
};

export type FranchiseSeed = {
  id: string;
  slug: string;
  title: string;
  pathway: "CONSULTING" | "SINGLE_UNIT" | "MASTER_FRANCHISE" | "AREA_DEVELOPMENT" | "RESALE" | "CONVERSION";
  sector: string;
  market: "SARASOTA" | "MANATEE" | "SOUTHWEST_FLORIDA" | "OTHER";
  county: string;
  summary: string;
  featured: boolean;
  status: string;
  sortOrder: number;
  city: string;
  lat: number;
  lon: number;
};

const BUSINESS_LISTING_IDS_START = 1001;
const COMMERCIAL_IDS_START = 2001;
const FRANCHISE_IDS_START = 3001;

export function roundToStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

export function jitterCoordinates(
  lat: number,
  lon: number,
  county?: string,
): { lat: number; lon: number } {
  const bounds = county ? COUNTY_BOUNDS[county as keyof typeof COUNTY_BOUNDS] : undefined;
  const latJitter = faker.number.float({ min: -0.012, max: 0.012, fractionDigits: 6 });
  const lonJitter = faker.number.float({ min: -0.012, max: 0.012, fractionDigits: 6 });
  const nextLat = bounds ? Math.min(Math.max(lat + latJitter, bounds.minLat), bounds.maxLat) : lat + latJitter;
  const nextLon = bounds ? Math.min(Math.max(lon + lonJitter, bounds.minLon), bounds.maxLon) : lon + lonJitter;

  return {
    lat: Number(nextLat.toFixed(6)),
    lon: Number(nextLon.toFixed(6)),
  };
}

export function isWithinCountyBounds(
  county: string,
  lat: number,
  lon: number,
): boolean {
  const key = county as keyof typeof COUNTY_BOUNDS;
  const bounds = COUNTY_BOUNDS[key];

  if (!bounds) {
    return false;
  }

  return (
    lat >= bounds.minLat &&
    lat <= bounds.maxLat &&
    lon >= bounds.minLon &&
    lon <= bounds.maxLon
  );
}

function selectCityForIndex(index: number): keyof typeof CITY_COORDS {
  const weightedCities = [
    "Bradenton",
    "Sarasota",
    "Lakewood Ranch",
    "Venice",
    ...CITY_ORDER.filter(
      (city) => !["Bradenton", "Sarasota", "Lakewood Ranch", "Venice"].includes(city),
    ),
  ];

  return weightedCities[index % weightedCities.length] as keyof typeof CITY_COORDS;
}

function chooseStatus(index: number): "ACTIVE" | "PENDING" | "SOLD" {
  const bucket = (index + 1) % 100;
  if (bucket < 78) return "ACTIVE";
  if (bucket < 88) return "PENDING";
  return "SOLD";
}

function buildOwnerFinancingFlag(): boolean {
  return faker.datatype.boolean(0.4);
}

function buildSbaPreQualified(askingPrice: number): boolean {
  return askingPrice < 1500000 && faker.datatype.boolean(0.55);
}

function buildRealEstateIncluded(category: string): boolean {
  return ["Restaurant / Cafe / Bar", "Retail / Boutique"].includes(category)
    ? faker.datatype.boolean(0.2)
    : false;
}

function buildCredentials(
  category: string,
  title: string,
  askingPrice: number,
  ownerFinancing: boolean,
): string | null {
  const segments = [] as string[];
  const hasSba = buildSbaPreQualified(askingPrice);
  if (ownerFinancing) segments.push("Owner financing available");
  if (hasSba) segments.push("SBA pre-qualified");
  if (buildRealEstateIncluded(category)) segments.push("Real estate included");
  if (title.toLowerCase().includes("service") || title.toLowerCase().includes("repair")) {
    segments.push("Certified technician support");
  }
  if (segments.length === 0) {
    return null;
  }
  return segments.join(" • ");
}

function buildBusinessDescription(
  category: string,
  city: string,
  yearsEstablished: number,
  employees: number,
  leaseTerms: string,
): string {
  const neighborhood = faker.helpers.arrayElement(NONCONFIDENTIAL_NEIGHBORHOODS);
  const reason = faker.helpers.arrayElement(REASONS_FOR_SELLING);
  const opportunity = faker.helpers.arrayElement(GROWTH_OPPORTUNITY_TEMPLATES);
  const support = faker.helpers.arrayElement(TRAINING_SUPPORT_TEMPLATES);

  const base = [
    `${category} serving the ${city} area for ${yearsEstablished} years`,
    `with a strong ${neighborhood} customer base and ${employees} team members in place`,
    `the operation has built a steady reputation through repeat demand, efficient day-to-day systems, and consistent service standards`,
    `current ownership is pursuing a transition due to ${reason}, while the business remains positioned for continued growth`,
    `Key opportunities include ${opportunity} and a roadmap to improve margins without sacrificing customer experience`,
    `Transition support includes ${support} and practical operating guidance for a smooth ownership change`,
    `Lease terms are ${leaseTerms}.`,
  ];

  return base.join(" ");
}

export function buildBusinessListingSeedRows(): BusinessListingSeed[] {
  const rows: BusinessListingSeed[] = [];

  for (let index = 0; index < 120; index += 1) {
    const cityName = selectCityForIndex(index);
    const city = CITY_COORDS[cityName];
    const industry = faker.helpers.arrayElement(BUSINESS_INDUSTRIES);
    const sde = faker.number.int({ min: industry.sdeMin, max: industry.sdeMax });
    const multiple = Number(
      faker.number.float({ min: industry.multipleMin, max: industry.multipleMax, fractionDigits: 2 }),
    );
    const revenue = roundToStep(sde / faker.number.float({ min: industry.marginMin, max: industry.marginMax, fractionDigits: 2 }), 1000);
    const askingPrice = roundToStep(sde * multiple, 5000);
    const status = chooseStatus(index);
    const title = faker.helpers.arrayElement(industry.titles);
    const ownerFinancing = buildOwnerFinancingFlag();
    const credentials = buildCredentials(industry.category, title, askingPrice, ownerFinancing);
    const yearsEstablished = faker.number.int({ min: 3, max: 35 });
    const employees = faker.number.int({ min: 2, max: 40 });
    const leaseYearsRemaining = faker.number.int({ min: 1, max: 12 });
    const monthlyRent = faker.number.int({ min: 2000, max: 14000 });
    const leaseTerms = `${leaseYearsRemaining} years remaining at approximately $${monthlyRent.toLocaleString()} per month`;
    const cityLabel = cityName === "Lakewood Ranch" ? "Lakewood Ranch, FL" : `${cityName}, FL`;
    const coordinates = jitterCoordinates(city.lat, city.lon, city.county);

    rows.push({
      id: `BBW-${BUSINESS_LISTING_IDS_START + index}`,
      slug: slugify(`${title} ${cityLabel} ${BUSINESS_LISTING_IDS_START + index}`),
      title,
      category: industry.category,
      location: cityLabel,
      county: city.county,
      credentials,
      cashFlow: sde,
      revenue,
      askingPrice,
      status,
      featured: index < 15,
      sortOrder: index + 1,
      city: cityName,
      lat: coordinates.lat,
      lon: coordinates.lon,
      sde,
      multiple,
    });

    const description = buildBusinessDescription(
      industry.category,
      cityName,
      yearsEstablished,
      employees,
      leaseTerms,
    );
    if (description.length < 90 || description.length > 160) {
      // Intentionally no-op; the schema does not store descriptions, but we keep the generated text for summary/logging.
    }
  }

  return rows;
}

export function buildCommercialPropertySeedRows(): CommercialPropertySeed[] {
  const rows: CommercialPropertySeed[] = [];

  for (let index = 0; index < 60; index += 1) {
    const cityName = selectCityForIndex(index + 20);
    const city = CITY_COORDS[cityName];
    const config = faker.helpers.arrayElement(COMMERCIAL_PROPERTY_TYPES);
    const transactionType: "SALE" | "LEASE" = index % 2 === 0 ? "SALE" : "LEASE";
    const propertyType = config.type;
    const sqFt =
      propertyType === "LAND"
        ? faker.number.int({ min: 10890, max: 522720 })
        : faker.number.int({ min: config.sqFtMin, max: config.sqFtMax });
    const status: "ACTIVE" | "PENDING" | "SOLD" = index % 9 === 0 ? "PENDING" : "ACTIVE";
    const title = `${config.label} ${faker.helpers.arrayElement(["Portfolio", "Center", "Campus", "Plaza", "Hub", "Suite"])} in ${cityName}`;
    const coordinates = jitterCoordinates(city.lat, city.lon, city.county);
    const summary = `${config.label} property in ${cityName} with ${transactionType.toLowerCase()} opportunities, convenient access, and a ${faker.helpers.arrayElement(["strong tenant profile", "functional layout", "flexible floorplan", "visible commercial frontage"]).toLowerCase()} for continued operations.`;

    rows.push({
      id: `BBW-${COMMERCIAL_IDS_START + index}`,
      slug: slugify(`${title} ${cityName} ${COMMERCIAL_IDS_START + index}`),
      title,
      propertyType,
      county: city.county,
      summary,
      transactionType,
      buildingAreaSqFt: sqFt,
      featured: index < 8,
      sortOrder: index + 1,
      status,
      city: cityName,
      lat: coordinates.lat,
      lon: coordinates.lon,
    });
  }

  return rows;
}

export function buildFranchiseSeedRows(): FranchiseSeed[] {
  const rows: FranchiseSeed[] = [];

  for (let index = 0; index < 12; index += 1) {
    const cityName = selectCityForIndex(index + 50);
    const city = CITY_COORDS[cityName];
    const sector = faker.helpers.arrayElement(FRANCHISE_CATEGORIES);
    const pathway = faker.helpers.arrayElement(FRANCHISE_PATHWAYS) as FranchiseSeed["pathway"];
    const market = faker.helpers.arrayElement(FRANCHISE_MARKETS) as FranchiseSeed["market"];
    const title = `${sector.charAt(0).toUpperCase() + sector.slice(1)} Opportunity`;
    const coordinates = jitterCoordinates(city.lat, city.lon, city.county);
    const summary = `${title} in ${cityName} offers an established operating base, a clear territory footprint, and a practical transition structure for a buyer who wants to build on local demand and recurring customer relationships.`;

    rows.push({
      id: `BBW-${FRANCHISE_IDS_START + index}`,
      slug: slugify(`${title} ${cityName} ${FRANCHISE_IDS_START + index}`),
      title,
      pathway,
      sector,
      market,
      county: city.county,
      summary,
      featured: index < 3,
      status: "ACTIVE",
      sortOrder: index + 1,
      city: cityName,
      lat: coordinates.lat,
      lon: coordinates.lon,
    });
  }

  return rows;
}

export function summarizeBusinessListings(rows: BusinessListingSeed[]) {
  const categoryCounts = new Map<string, number>();
  const cityCounts = new Map<string, number>();
  const statusCounts = new Map<string, number>();
  const askingPrices = rows.map((row) => row.askingPrice).sort((left, right) => left - right);

  for (const row of rows) {
    categoryCounts.set(row.category, (categoryCounts.get(row.category) ?? 0) + 1);
    cityCounts.set(row.location, (cityCounts.get(row.location) ?? 0) + 1);
    statusCounts.set(row.status, (statusCounts.get(row.status) ?? 0) + 1);
  }

  const median =
    askingPrices[Math.floor(askingPrices.length / 2)] ?? 0;

  return {
    categories: Object.fromEntries([...categoryCounts.entries()].sort(([left], [right]) => left.localeCompare(right))),
    cities: Object.fromEntries([...cityCounts.entries()].sort(([left], [right]) => left.localeCompare(right))),
    statuses: Object.fromEntries([...statusCounts.entries()].sort(([left], [right]) => left.localeCompare(right))),
    min: askingPrices[0] ?? 0,
    median,
    max: askingPrices[askingPrices.length - 1] ?? 0,
  };
}

export function buildSampleAssetPaths(): string[] {
  const assetKinds = [
    "restaurant",
    "retail",
    "marine",
    "services",
    "fitness",
    "commercial",
    "franchise",
  ] as const;

  const result: string[] = [];
  for (const kind of assetKinds) {
    for (const variant of [1, 2, 3]) {
      result.push(`/sample/${kind}-${variant}.svg`);
    }
  }

  return result;
}

export function getCountyByCity(cityName: string): string {
  const city = CITY_COORDS[cityName as keyof typeof CITY_COORDS];
  return city?.county ?? "Unknown";
}

export function getPropertyZoning(): string {
  return faker.helpers.arrayElement(COMMERCIAL_ZONING);
}

export function getCommercialPropertyTitle(label: string, cityName: string): string {
  return `${label} in ${cityName}`;
}

export function getBusinessListingDescriptionsForReview(rows: BusinessListingSeed[]) {
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    city: row.city,
    county: row.county,
    askingPrice: row.askingPrice,
    status: row.status,
  }));
}
