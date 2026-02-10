/*
  Warnings:

  - You are about to drop the column `case_num` on the `documents` table. All the data in the column will be lost.
  - Added the required column `case_id` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_case_num_fkey";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "case_num",
ADD COLUMN     "case_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
