/*
  Warnings:

  - A unique constraint covering the columns `[product_type_id]` on the table `product_category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."category_unique";

-- CreateIndex
CREATE UNIQUE INDEX "category_unique" ON "product_category"("product_type_id");
