/*
  Warnings:

  - You are about to drop the column `products_id` on the `case_record` table. All the data in the column will be lost.
  - You are about to drop the `manufacturers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `models` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `performers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `case_record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Caliber" DROP CONSTRAINT "Caliber_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."case_record" DROP CONSTRAINT "case_record_performer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."case_record" DROP CONSTRAINT "case_record_products_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."models" DROP CONSTRAINT "fk_model_manufacturer";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "fk_products_category";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "fk_products_manufacturer";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "fk_products_model";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "fk_products_type";

-- DropForeignKey
ALTER TABLE "public"."products_category" DROP CONSTRAINT "fk_category_type";

-- AlterTable
ALTER TABLE "case_record" DROP COLUMN "products_id",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."manufacturers";

-- DropTable
DROP TABLE "public"."models";

-- DropTable
DROP TABLE "public"."performers";

-- DropTable
DROP TABLE "public"."products";

-- DropTable
DROP TABLE "public"."products_category";

-- DropTable
DROP TABLE "public"."products_type";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "manufacturer" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "model" (
    "id" TEXT NOT NULL,
    "model_name" VARCHAR(255) NOT NULL,
    "serial_number" VARCHAR(100) NOT NULL,
    "manufacturer_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performer" (
    "id" TEXT NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "performer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "product_type_id" TEXT NOT NULL,
    "product_category_id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "manufacturer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" TEXT NOT NULL,
    "product_type_id" TEXT NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_type" (
    "id" TEXT NOT NULL,
    "products_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weapon_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "enum_role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "manufacturer_unique" ON "manufacturer"("name", "country");

-- CreateIndex
CREATE UNIQUE INDEX "model_model_name_serial_number_manufacturer_id_key" ON "model"("model_name", "serial_number", "manufacturer_id");

-- CreateIndex
CREATE UNIQUE INDEX "performer_full_name_key" ON "performer"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_unique" ON "product"("model_id", "manufacturer_id", "product_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_unique" ON "product_category"("product_type_id", "category_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_type_products_type_key" ON "product_type"("products_type");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- AddForeignKey
ALTER TABLE "Caliber" ADD CONSTRAINT "Caliber_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "model" ADD CONSTRAINT "fk_model_manufacturer" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturer"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_product_category" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_product_manufacturer" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturer"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_product_model" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_product_type" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "fk_category_type" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "case_record" ADD CONSTRAINT "case_record_performer_id_fkey" FOREIGN KEY ("performer_id") REFERENCES "performer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_record" ADD CONSTRAINT "case_record_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
