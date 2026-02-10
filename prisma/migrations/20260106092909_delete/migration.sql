/*
  Warnings:

  - You are about to drop the column `product_id` on the `case` table. All the data in the column will be lost.
  - Added the required column `case_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."case" DROP CONSTRAINT "case_product_id_fkey";

-- AlterTable
ALTER TABLE "case" DROP COLUMN "product_id";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "case_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_case" FOREIGN KEY ("case_id") REFERENCES "case"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
