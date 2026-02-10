/*
  Warnings:

  - The `legal_form` column on the `case_record` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "enum_legal-form" AS ENUM ('LEGAL', 'INDIVIDUAL');

-- AlterTable
ALTER TABLE "case_record" DROP COLUMN "legal_form",
ADD COLUMN     "legal_form" "enum_legal-form" NOT NULL DEFAULT 'INDIVIDUAL';
