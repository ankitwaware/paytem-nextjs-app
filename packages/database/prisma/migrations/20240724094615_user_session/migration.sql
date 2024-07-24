/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_token` on the `Account` table. All the data in the column will be lost.
  - The required column `acc_id` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "id_token",
ADD COLUMN     "acc_id" TEXT NOT NULL,
ALTER COLUMN "type" DROP DEFAULT,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("acc_id");

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expires" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("userId");
