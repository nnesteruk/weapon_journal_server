/*
  Warnings:

  - You are about to drop the column `count` on the `documents` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[case_id,category]` on the table `documents_count` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "count";

-- CreateIndex
CREATE UNIQUE INDEX "documents_count_unique" ON "documents_count"("case_id", "category");

-- AddForeignKey
ALTER TABLE "documents_count" ADD CONSTRAINT "documents_count_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
