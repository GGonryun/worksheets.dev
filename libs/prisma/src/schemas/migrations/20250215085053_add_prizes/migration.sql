/*
  Warnings:

  - You are about to drop the column `itemId` on the `ActivationCode` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `headline` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `maxEntries` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `numWinners` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `premium` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `purchased` on the `RaffleParticipation` table. All the data in the column will be lost.
  - You are about to drop the `CapsuleOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameCompetition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryCapsule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryExpiration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Loot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsletterSubscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RedemptionCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoredFile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[prizeId]` on the table `Raffle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prizeId` to the `Raffle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PrizeType" AS ENUM ('RANDOM_STEAM_KEY', 'STEAM_KEY');

-- DropForeignKey
ALTER TABLE "ActivationCode" DROP CONSTRAINT "ActivationCode_itemId_fkey";

-- DropForeignKey
ALTER TABLE "CapsuleOption" DROP CONSTRAINT "CapsuleOption_capsuleId_fkey";

-- DropForeignKey
ALTER TABLE "CapsuleOption" DROP CONSTRAINT "CapsuleOption_itemId_fkey";

-- DropForeignKey
ALTER TABLE "GameCompetition" DROP CONSTRAINT "GameCompetition_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_userId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryCapsule" DROP CONSTRAINT "InventoryCapsule_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryExpiration" DROP CONSTRAINT "InventoryExpiration_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "Loot" DROP CONSTRAINT "Loot_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "Loot" DROP CONSTRAINT "Loot_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Loot" DROP CONSTRAINT "Loot_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_itemId_fkey";

-- DropForeignKey
ALTER TABLE "RedemptionCode" DROP CONSTRAINT "RedemptionCode_itemId_fkey";

-- DropForeignKey
ALTER TABLE "RedemptionCode" DROP CONSTRAINT "RedemptionCode_userId_fkey";

-- AlterTable
ALTER TABLE "ActivationCode" DROP COLUMN "itemId";

-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "description",
DROP COLUMN "headline",
DROP COLUMN "imageUrl",
DROP COLUMN "itemId",
DROP COLUMN "maxEntries",
DROP COLUMN "name",
DROP COLUMN "numWinners",
DROP COLUMN "premium",
DROP COLUMN "version",
ADD COLUMN     "prizeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RaffleParticipation" DROP COLUMN "purchased";

-- DropTable
DROP TABLE "CapsuleOption";

-- DropTable
DROP TABLE "GameCompetition";

-- DropTable
DROP TABLE "Inventory";

-- DropTable
DROP TABLE "InventoryCapsule";

-- DropTable
DROP TABLE "InventoryExpiration";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Loot";

-- DropTable
DROP TABLE "NewsletterSubscription";

-- DropTable
DROP TABLE "RedemptionCode";

-- DropTable
DROP TABLE "StoredFile";

-- DropEnum
DROP TYPE "IntegrationError";

-- DropEnum
DROP TYPE "IntegrationStatus";

-- DropEnum
DROP TYPE "IntegrationType";

-- DropEnum
DROP TYPE "ItemRarity";

-- DropEnum
DROP TYPE "ItemType";

-- DropEnum
DROP TYPE "NewsletterTopic";

-- DropEnum
DROP TYPE "PrizeDistribution";

-- CreateTable
CREATE TABLE "Prize" (
    "id" SERIAL NOT NULL,
    "type" "PrizeType" NOT NULL,
    "name" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "codeId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expiration" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activationCodeId" TEXT NOT NULL,

    CONSTRAINT "Expiration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prize_codeId_key" ON "Prize"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "Expiration_activationCodeId_key" ON "Expiration"("activationCodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Raffle_prizeId_key" ON "Raffle"("prizeId");

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "ActivationCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expiration" ADD CONSTRAINT "Expiration_activationCodeId_fkey" FOREIGN KEY ("activationCodeId") REFERENCES "ActivationCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
