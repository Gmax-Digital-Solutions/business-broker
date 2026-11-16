CREATE TYPE "contact_topic" AS ENUM (
    'BUSINESS_SALE',
    'BUSINESS_PURCHASE',
    'COMMERCIAL_PROPERTY',
    'FRANCHISE',
    'OTHER'
);

CREATE TABLE "public"."contact_inquiries" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "topic" "contact_topic" NOT NULL,
    "message" TEXT,
    "contact_consent" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_inquiries_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "contact_inquiries_created_at_idx"
ON "public"."contact_inquiries" ("created_at");

ALTER TABLE "public"."contact_inquiries" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "public"."contact_inquiries" FROM anon, authenticated;
