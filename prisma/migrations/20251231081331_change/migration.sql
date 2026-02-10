/*
  Warnings:

  - A unique constraint covering the columns `[model_id,manufacturer_id,product_category_id,serial_number]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."product_unique";

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "serial_number" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_unique" ON "product"("model_id", "manufacturer_id", "product_category_id", "serial_number");
