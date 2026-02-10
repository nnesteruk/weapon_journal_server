/*
  Warnings:

  - A unique constraint covering the columns `[manufacturer_id,product_category_id,serial_number]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "fk_caliber";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "fk_product_model";

-- DropIndex
DROP INDEX "public"."product_unique";

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "model_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_unique" ON "product"("manufacturer_id", "product_category_id", "serial_number");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_product_model" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_caliber" FOREIGN KEY ("caliber_id") REFERENCES "Caliber"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
