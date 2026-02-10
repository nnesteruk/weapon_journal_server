/*
  Warnings:

  - The `state_application` column on the `case_record` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "enum_case-state" AS ENUM ('ACTIVE', 'COMPLETED', 'REFUSED');

-- AlterTable
ALTER TABLE "case_record" DROP COLUMN "state_application",
ADD COLUMN     "state_application" "enum_case-state" NOT NULL DEFAULT 'ACTIVE';
