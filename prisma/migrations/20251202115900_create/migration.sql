/*
  Warnings:

  - You are about to drop the column `case_id` on the `documents` table. All the data in the column will be lost.
  - Added the required column `case_num` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_case_id_fkey";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "case_id",
ADD COLUMN     "case_num" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_case_num_fkey" FOREIGN KEY ("case_num") REFERENCES "case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
