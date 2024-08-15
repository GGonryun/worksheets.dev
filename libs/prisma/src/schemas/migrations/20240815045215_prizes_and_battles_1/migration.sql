/*
  Warnings:

  - You are about to drop the `BattleRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserExperience` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ActivationCodeType" AS ENUM ('STEAM');

-- CreateEnum
CREATE TYPE "PrizeStatus" AS ENUM ('PENDING', 'ACTIVE', 'REDEEMED', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "ActivationCode" DROP CONSTRAINT "ActivationCode_itemId_fkey";

-- DropForeignKey
ALTER TABLE "BattleRecord" DROP CONSTRAINT "BattleRecord_battleId_fkey";

-- DropForeignKey
ALTER TABLE "UserExperience" DROP CONSTRAINT "UserExperience_userId_fkey";

-- AlterTable
ALTER TABLE "ActivationCode" ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "type" "ActivationCodeType" NOT NULL DEFAULT 'STEAM',
ALTER COLUMN "itemId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BattleParticipation" ADD COLUMN     "mvp" "MvpReason";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "BattleRecord";

-- DropTable
DROP TABLE "UserExperience";

-- CreateTable
CREATE TABLE "Prize" (
    "id" SERIAL NOT NULL,
    "status" "PrizeStatus" NOT NULL DEFAULT 'PENDING',
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "purchasedAt" TIMESTAMP(3),
    "userId" TEXT,
    "value" INTEGER NOT NULL,
    "codeId" TEXT NOT NULL,

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prize_codeId_key" ON "Prize"("codeId");

-- AddForeignKey
ALTER TABLE "ActivationCode" ADD CONSTRAINT "ActivationCode_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "ActivationCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
