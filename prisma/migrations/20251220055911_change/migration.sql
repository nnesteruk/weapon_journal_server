/*
  Warnings:

  - You are about to drop the column `performer_id` on the `case` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."case" DROP CONSTRAINT "case_performer_id_fkey";

-- AlterTable
ALTER TABLE "case" DROP COLUMN "performer_id",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "case" ADD CONSTRAINT "case_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
