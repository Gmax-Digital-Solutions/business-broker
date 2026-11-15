export type FeaturedListing = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  credentials: string | null;
  cashFlow: number;
  revenue: number;
  askingPrice: number;
};

export type StatItem = {
  value: string;
  label: string;
};

export type PersonaItem = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: "sell" | "buy";
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type AdvisoryService = {
  title: string;
  description: string;
  icon: "real-estate" | "capital" | "franchise" | "visas";
  href: string;
  linkLabel: string;
};

export type ClosingItem = {
  industry: string;
  location: string;
  daysToClose: number;
  result: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  organization: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
