/*
  Warnings:

  - You are about to drop the `case_record` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."case_record" DROP CONSTRAINT "case_record_applicant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."case_record" DROP CONSTRAINT "case_record_performer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."case_record" DROP CONSTRAINT "case_record_product_id_fkey";

-- DropTable
DROP TABLE "public"."case_record";

-- CreateTable
CREATE TABLE "case" (
    "id" TEXT NOT NULL,
    "case_num" INTEGER NOT NULL,
    "register_date" DATE NOT NULL,
    "applicant_id" TEXT NOT NULL,
    "legal_form" "enum_legal-form" NOT NULL DEFAULT 'INDIVIDUAL',
    "contract_num" VARCHAR(50) NOT NULL,
    "contract_date" DATE NOT NULL,
    "contract_sum" INTEGER NOT NULL,
    "payment_num" VARCHAR(50) NOT NULL,
    "contract_payment_date" DATE NOT NULL,
    "product_id" TEXT NOT NULL,
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
    "state_application" "enum_case-state" NOT NULL DEFAULT 'ACTIVE',
    "performer_id" TEXT,
    "payment_deadline" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "case_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "case" ADD CONSTRAINT "case_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case" ADD CONSTRAINT "case_performer_id_fkey" FOREIGN KEY ("performer_id") REFERENCES "performer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case" ADD CONSTRAINT "case_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
