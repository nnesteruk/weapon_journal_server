/*
  Warnings:

  - A unique constraint covering the columns `[manufacturer_id,product_category_id,serial_number,product_type_id]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."product_unique";

-- CreateIndex
CREATE UNIQUE INDEX "product_unique" ON "product"("manufacturer_id", "product_category_id", "serial_number", "product_type_id");
