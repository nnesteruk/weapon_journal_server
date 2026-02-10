/*
  Warnings:

  - You are about to drop the column `act_complete_work` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `act_identif` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `act_selections` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `decision` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `identif` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `notification` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `program_asp_or_po` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `ref_for_test` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `refusal` on the `case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "case" DROP COLUMN "act_complete_work",
DROP COLUMN "act_identif",
DROP COLUMN "act_selections",
DROP COLUMN "answer",
DROP COLUMN "decision",
DROP COLUMN "identif",
DROP COLUMN "notification",
DROP COLUMN "program_asp_or_po",
DROP COLUMN "ref_for_test",
DROP COLUMN "refusal";
