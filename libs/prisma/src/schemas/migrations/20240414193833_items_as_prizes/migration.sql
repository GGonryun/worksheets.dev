/*
  Warnings:

  - The values [ACTIVATED] on the enum `ItemType` will be removed. If these variants are still used in the database, this will fail.
  - The values [REASSIGN,WAITING] on the enum `RaffleStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `raffleId` on the `ActivationCode` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `prizeId` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `RedemptionCode` table. All the data in the column will be lost.
  - You are about to drop the column `prizeId` on the `RedemptionCode` table. All the data in the column will be lost.
  - You are about to drop the `ClaimAlert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GamePublishAlert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RafflePublishAlert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RaffleWinner` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemId` to the `ActivationCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Raffle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `RedemptionCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemType_new" AS ENUM ('CURRENCY', 'STEAM_KEY', 'CONSUMABLE', 'COMBAT', 'ETCETERA');
ALTER TABLE "Item" ALTER COLUMN "type" TYPE "ItemType_new" USING ("type"::text::"ItemType_new");
ALTER TYPE "ItemType" RENAME TO "ItemType_old";
ALTER TYPE "ItemType_new" RENAME TO "ItemType";
DROP TYPE "ItemType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.




-- AlterEnum
BEGIN;
CREATE TYPE "RaffleStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETE', 'CANCELLED');
ALTER TABLE "Raffle" ALTER COLUMN "status" TYPE "RaffleStatus_new" USING ("status"::text::"RaffleStatus_new");
ALTER TYPE "RaffleStatus" RENAME TO "RaffleStatus_old";
ALTER TYPE "RaffleStatus_new" RENAME TO "RaffleStatus";
DROP TYPE "RaffleStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ActivationCode" DROP CONSTRAINT "ActivationCode_raffleId_fkey";

-- DropForeignKey
ALTER TABLE "ClaimAlert" DROP CONSTRAINT "ClaimAlert_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "GamePublishAlert" DROP CONSTRAINT "GamePublishAlert_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "RafflePublishAlert" DROP CONSTRAINT "RafflePublishAlert_raffleId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleWinner" DROP CONSTRAINT "RaffleWinner_codeId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleWinner" DROP CONSTRAINT "RaffleWinner_participationId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleWinner" DROP CONSTRAINT "RaffleWinner_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleWinner" DROP CONSTRAINT "RaffleWinner_raffleId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleWinner" DROP CONSTRAINT "RaffleWinner_userId_fkey";

-- DropForeignKey
ALTER TABLE "RedemptionCode" DROP CONSTRAINT "RedemptionCode_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "RedemptionCode" DROP CONSTRAINT "RedemptionCode_prizeId_fkey";

-- DropIndex
DROP INDEX "Inventory_userId_itemId_key";

-- AlterTable
ALTER TABLE "ActivationCode" DROP COLUMN "raffleId",
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "iconUrl",
ADD COLUMN     "expiration" INTEGER;

-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "prizeId",
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RaffleParticipation" ADD COLUMN     "winner" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RedemptionCode" DROP COLUMN "ownerId",
DROP COLUMN "prizeId",
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "ClaimAlert";

-- DropTable
DROP TABLE "GamePublishAlert";

-- DropTable
DROP TABLE "Prize";

-- DropTable
DROP TABLE "RafflePublishAlert";

-- DropTable
DROP TABLE "RaffleWinner";

-- DropEnum
DROP TYPE "PrizeType";

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCode" ADD CONSTRAINT "ActivationCode_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCode" ADD CONSTRAINT "ActivationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedemptionCode" ADD CONSTRAINT "RedemptionCode_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedemptionCode" ADD CONSTRAINT "RedemptionCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
