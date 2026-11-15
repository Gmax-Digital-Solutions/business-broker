/*
  Warnings:

  - You are about to drop the column `maximum_asking_price` on the `listing_search_alerts` table. All the data in the column will be lost.
  - You are about to drop the column `minimum_asking_price` on the `listing_search_alerts` table. All the data in the column will be lost.
  - You are about to drop the column `minimum_cash_flow` on the `listing_search_alerts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listing_search_alerts" DROP COLUMN "maximum_asking_price",
DROP COLUMN "minimum_asking_price",
DROP COLUMN "minimum_cash_flow",
ADD COLUMN     "maximumAskingPrice" INTEGER,
ADD COLUMN     "minimumAskingPrice" INTEGER,
ADD COLUMN     "minimumCashFlow" INTEGER;
