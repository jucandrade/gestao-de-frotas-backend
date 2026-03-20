/*
  Warnings:

  - You are about to drop the column `fax` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `logoType` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `reportPhones` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "fax",
DROP COLUMN "logo",
DROP COLUMN "logoType",
DROP COLUMN "reportPhones",
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "whatsapp" TEXT;
