CREATE TYPE "commercial_property_type" AS ENUM (
    'MULTIFAMILY',
    'OFFICE',
    'INDUSTRIAL',
    'RETAIL',
    'LAND',
    'OTHER'
);

CREATE TYPE "commercial_transaction_type" AS ENUM ('SALE', 'LEASE');

CREATE TABLE "public"."commercial_properties" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "property_type" "commercial_property_type" NOT NULL,
    "county" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "transaction_type" "commercial_transaction_type" NOT NULL,
    "building_area_sq_ft" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "commercial_properties_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "commercial_properties_slug_key"
ON "public"."commercial_properties" ("slug");

CREATE INDEX "commercial_properties_status_featured_sort_order_idx"
ON "public"."commercial_properties" ("status", "featured", "sort_order");

CREATE INDEX "commercial_properties_status_property_type_sort_order_idx"
ON "public"."commercial_properties" ("status", "property_type", "sort_order");

CREATE INDEX "commercial_properties_status_county_sort_order_idx"
ON "public"."commercial_properties" ("status", "county", "sort_order");

CREATE INDEX "commercial_properties_status_transaction_type_sort_order_idx"
ON "public"."commercial_properties" ("status", "transaction_type", "sort_order");

CREATE INDEX "commercial_properties_status_building_area_sq_ft_idx"
ON "public"."commercial_properties" ("status", "building_area_sq_ft");

ALTER TABLE "public"."commercial_properties" ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."commercial_property_inquiries" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "property_type" "commercial_property_type" NOT NULL,
    "area" TEXT NOT NULL,
    "size_range" TEXT,
    "capital_range" TEXT,
    "message" TEXT,
    "contact_consent" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commercial_property_inquiries_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "commercial_property_inquiries_created_at_idx"
ON "public"."commercial_property_inquiries" ("created_at");

ALTER TABLE "public"."commercial_property_inquiries" ENABLE ROW LEVEL SECURITY;
