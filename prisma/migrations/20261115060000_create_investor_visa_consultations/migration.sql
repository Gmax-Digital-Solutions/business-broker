CREATE TYPE "investor_visa_pathway" AS ENUM (
    'E2',
    'EB5_DIRECT',
    'EB5_REGIONAL_CENTER',
    'L1A',
    'UNDECIDED'
);

CREATE TYPE "investor_business_plan" AS ENUM (
    'ACQUIRE_BUSINESS',
    'START_BUSINESS',
    'RESEARCHING'
);

CREATE TABLE "public"."investor_visa_consultation_requests" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "pathway" "investor_visa_pathway" NOT NULL,
    "business_plan" "investor_business_plan" NOT NULL,
    "contact_consent" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investor_visa_consultation_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "investor_visa_consultation_requests_created_at_idx"
ON "public"."investor_visa_consultation_requests" ("created_at");

ALTER TABLE "public"."investor_visa_consultation_requests" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "public"."investor_visa_consultation_requests" FROM anon, authenticated;
