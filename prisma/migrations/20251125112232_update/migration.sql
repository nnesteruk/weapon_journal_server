/*
  Warnings:

  - You are about to drop the column `ur_or_fiz` on the `case_record` table. All the data in the column will be lost.
  - Added the required column `legal_form` to the `case_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "case_record" DROP COLUMN "ur_or_fiz",
ADD COLUMN     "legal_form" TEXT NOT NULL;
