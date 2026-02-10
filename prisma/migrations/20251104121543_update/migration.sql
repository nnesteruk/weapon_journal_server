/*
  Warnings:

  - Made the column `products_type` on table `products_type` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products_type" ALTER COLUMN "products_type" SET NOT NULL;
