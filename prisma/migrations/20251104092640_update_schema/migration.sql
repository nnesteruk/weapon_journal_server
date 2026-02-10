/*
  Warnings:

  - You are about to drop the `Manufacturer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Performer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "enum_role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "public"."Caliber" DROP CONSTRAINT "Caliber_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Case_record" DROP CONSTRAINT "Case_record_performer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Case_record" DROP CONSTRAINT "Case_record_products_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Model" DROP CONSTRAINT "fk_model_manufacturer";

-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "fk_products_category";

-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "fk_products_manufacturer";

-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "fk_products_model";

-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "fk_products_type";

-- DropForeignKey
ALTER TABLE "public"."Products_category" DROP CONSTRAINT "fk_category_type";

-- DropTable
DROP TABLE "public"."Manufacturer";

-- DropTable
DROP TABLE "public"."Model";

-- DropTable
DROP TABLE "public"."Performer";

-- DropTable
DROP TABLE "public"."Products";

-- DropTable
DROP TABLE "public"."Products_category";

-- DropTable
DROP TABLE "public"."Products_type";

-- DropTable
DROP TABLE "public"."User";

-- DropEnum
DROP TYPE "public"."Role";

-- CreateTable
CREATE TABLE "manufacturers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manufacturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" TEXT NOT NULL,
    "model_name" VARCHAR(255) NOT NULL,
    "serial_number" VARCHAR(100) NOT NULL,
    "manufacturer_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performers" (
    "id" TEXT NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "performers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "products_type_id" TEXT NOT NULL,
    "product_category_id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "manufacturer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_category" (
    "id" TEXT NOT NULL,
    "products_type_id" TEXT NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_type" (
    "id" TEXT NOT NULL,
    "products_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weapon_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "enum_role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "manufacturer_unique" ON "manufacturers"("name", "country");

-- CreateIndex
CREATE UNIQUE INDEX "products_unique" ON "products"("model_id", "manufacturer_id", "product_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_unique" ON "products_category"("products_type_id", "category_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- AddForeignKey
ALTER TABLE "Caliber" ADD CONSTRAINT "Caliber_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "products_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "fk_model_manufacturer" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_products_category" FOREIGN KEY ("product_category_id") REFERENCES "products_category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_products_manufacturer" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_products_model" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_products_type" FOREIGN KEY ("products_type_id") REFERENCES "products_type"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products_category" ADD CONSTRAINT "fk_category_type" FOREIGN KEY ("products_type_id") REFERENCES "products_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Case_record" ADD CONSTRAINT "Case_record_performer_id_fkey" FOREIGN KEY ("performer_id") REFERENCES "performers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case_record" ADD CONSTRAINT "Case_record_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
