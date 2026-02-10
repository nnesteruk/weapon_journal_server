-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_case_id_fkey";

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
