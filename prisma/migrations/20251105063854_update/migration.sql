-- DropForeignKey
ALTER TABLE "public"."case_record" DROP CONSTRAINT "case_record_applicant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."case_record" DROP CONSTRAINT "case_record_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "fk_product_category";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "fk_product_type";

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_product_category" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_product_type" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "case_record" ADD CONSTRAINT "case_record_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_record" ADD CONSTRAINT "case_record_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
