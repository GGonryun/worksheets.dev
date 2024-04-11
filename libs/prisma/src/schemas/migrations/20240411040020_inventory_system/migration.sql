/*
  Warnings:

  - The values [GIFT_CARD] on the enum `PrizeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `prizeId` on the `ActivationCode` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PrizeType_new" AS ENUM ('STEAM_KEY', 'LOOT');
ALTER TABLE "Prize" ALTER COLUMN "type" TYPE "PrizeType_new" USING ("type"::text::"PrizeType_new");
ALTER TYPE "PrizeType" RENAME TO "PrizeType_old";
ALTER TYPE "PrizeType_new" RENAME TO "PrizeType";
DROP TYPE "PrizeType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ActivationCode" DROP CONSTRAINT "ActivationCode_prizeId_fkey";

-- DropIndex
DROP INDEX "ActivationCode_content_key";

-- AlterTable
ALTER TABLE "ActivationCode" DROP COLUMN "prizeId",
ADD COLUMN     "accessedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedemptionCode" (
    "id" TEXT NOT NULL,
    "redeemedAt" TIMESTAMP(3),
    "prizeId" TEXT NOT NULL,
    "ownerId" TEXT,

    CONSTRAINT "RedemptionCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_userId_itemId_key" ON "Item"("userId", "itemId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedemptionCode" ADD CONSTRAINT "RedemptionCode_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedemptionCode" ADD CONSTRAINT "RedemptionCode_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
