/*
  Warnings:

  - You are about to drop the column `category_id` on the `Caliber` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `model` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer_id` on the `model` table. All the data in the column will be lost.
  - You are about to drop the column `serial_number` on the `model` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_type_id,name]` on the table `Caliber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[model_name,product_category_id,product_type_id]` on the table `model` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_type_id` to the `Caliber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_category_id` to the `model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_type_id` to the `model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serial_number` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "enum_legal-form" ADD VALUE 'SELF_EMPLOYED';

-- DropForeignKey
ALTER TABLE "public"."Caliber" DROP CONSTRAINT "Caliber_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."model" DROP CONSTRAINT "fk_model_manufacturer";

-- DropIndex
DROP INDEX "public"."caliber_unique";

-- DropIndex
DROP INDEX "public"."model_model_name_serial_number_manufacturer_id_key";

-- AlterTable
ALTER TABLE "Caliber" DROP COLUMN "category_id",
ADD COLUMN     "product_type_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "case" ALTER COLUMN "contract_date" DROP NOT NULL,
ALTER COLUMN "contract_sum" DROP NOT NULL,
ALTER COLUMN "payment_num" DROP NOT NULL,
ALTER COLUMN "contract_payment_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "model" DROP COLUMN "count",
DROP COLUMN "manufacturer_id",
DROP COLUMN "serial_number",
ADD COLUMN     "product_category_id" TEXT NOT NULL,
ADD COLUMN     "product_type_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "caliber_id" TEXT,
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "serial_number" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "documents_count" (
    "id" TEXT NOT NULL,
    "case_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "documents_count_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "caliber_unique" ON "Caliber"("product_type_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "model_unique" ON "model"("model_name", "product_category_id", "product_type_id");

-- AddForeignKey
ALTER TABLE "Caliber" ADD CONSTRAINT "Caliber_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "model" ADD CONSTRAINT "fk_product_type" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "model" ADD CONSTRAINT "fk_product_category" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_caliber" FOREIGN KEY ("caliber_id") REFERENCES "Caliber"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
