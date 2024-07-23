/*
  Warnings:

  - The `type` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('basicUser', 'merchantUser');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "type",
ADD COLUMN     "type" "accountType" NOT NULL DEFAULT 'basicUser';
