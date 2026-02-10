/*
  Warnings:

  - You are about to drop the `Case_record` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[full_name]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[model_name,serial_number,manufacturer_id]` on the table `models` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[full_name]` on the table `performers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[products_type]` on the table `products_type` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Case_record" DROP CONSTRAINT "Case_record_applicant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Case_record" DROP CONSTRAINT "Case_record_performer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Case_record" DROP CONSTRAINT "Case_record_products_id_fkey";

-- DropTable
DROP TABLE "public"."Case_record";

-- CreateTable
CREATE TABLE "case_record" (
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

    CONSTRAINT "case_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_full_name_key" ON "Applicant"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "models_model_name_serial_number_manufacturer_id_key" ON "models"("model_name", "serial_number", "manufacturer_id");

-- CreateIndex
CREATE UNIQUE INDEX "performers_full_name_key" ON "performers"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "products_type_products_type_key" ON "products_type"("products_type");

-- AddForeignKey
ALTER TABLE "case_record" ADD CONSTRAINT "case_record_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_record" ADD CONSTRAINT "case_record_performer_id_fkey" FOREIGN KEY ("performer_id") REFERENCES "performers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_record" ADD CONSTRAINT "case_record_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
