/*
  Warnings:

  - Added the required column `updated_at` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `documents_count` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "documents_count" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
