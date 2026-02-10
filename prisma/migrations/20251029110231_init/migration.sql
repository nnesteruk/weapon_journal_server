-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caliber" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Caliber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case_record" (
    "id" TEXT NOT NULL,
    "case_num" INTEGER NOT NULL,
    "register_date" DATE NOT NULL,
    "applicant_id" TEXT NOT NULL,
    "ur_or_fiz" BOOLEAN NOT NULL,
    "contract_num" VARCHAR(50) NOT NULL,
    "contract_date" DATE NOT NULL,
    "contract_sum" INTEGER NOT NULL,
    "payment_num" VARCHAR(50) NOT NULL,
    "contract_payment_date" DATE NOT NULL,
    "products_id" TEXT NOT NULL,
    "answer" INTEGER NOT NULL DEFAULT 0,
    "identif" INTEGER NOT NULL DEFAULT 0,
    "act_identif" INTEGER NOT NULL DEFAULT 0,
    "act_selections" INTEGER NOT NULL DEFAULT 0,
    "ref_for_test" INTEGER NOT NULL DEFAULT 0,
    "decision" INTEGER NOT NULL DEFAULT 0,
    "act_complete_work" INTEGER NOT NULL DEFAULT 0,
    "program_asp_or_po" INTEGER NOT NULL DEFAULT 0,
    "notification" INTEGER NOT NULL DEFAULT 0,
    "refusal" INTEGER NOT NULL DEFAULT 0,
    "refusal_comment" VARCHAR(255),
    "sertif_num" VARCHAR(50),
    "state_application" VARCHAR(50) NOT NULL,
    "performer_id" TEXT,
    "payment_deadline" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "model_name" VARCHAR(255) NOT NULL,
    "serial_number" VARCHAR(100) NOT NULL,
    "manufacturer_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performer" (
    "id" TEXT NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Performer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "products_type_id" TEXT NOT NULL,
    "product_category_id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "manufacturer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products_category" (
    "id" TEXT NOT NULL,
    "products_type_id" TEXT NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products_type" (
    "id" TEXT NOT NULL,
    "products_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weapon_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "caliber_unique" ON "Caliber"("category_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturer_unique" ON "Manufacturer"("name", "country");

-- CreateIndex
CREATE UNIQUE INDEX "products_unique" ON "Products"("model_id", "manufacturer_id", "product_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_unique" ON "Products_category"("products_type_id", "category_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "Caliber" ADD CONSTRAINT "Caliber_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Products_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Case_record" ADD CONSTRAINT "Case_record_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case_record" ADD CONSTRAINT "Case_record_performer_id_fkey" FOREIGN KEY ("performer_id") REFERENCES "Performer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case_record" ADD CONSTRAINT "Case_record_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "fk_model_manufacturer" FOREIGN KEY ("manufacturer_id") REFERENCES "Manufacturer"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "fk_products_category" FOREIGN KEY ("product_category_id") REFERENCES "Products_category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "fk_products_manufacturer" FOREIGN KEY ("manufacturer_id") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "fk_products_model" FOREIGN KEY ("model_id") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "fk_products_type" FOREIGN KEY ("products_type_id") REFERENCES "Products_type"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products_category" ADD CONSTRAINT "fk_category_type" FOREIGN KEY ("products_type_id") REFERENCES "Products_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
