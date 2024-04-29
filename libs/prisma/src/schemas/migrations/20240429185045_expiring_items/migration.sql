/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Inventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itemId,userId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "expiresAt";

-- CreateTable
CREATE TABLE "InventoryExpiration" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryExpiration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_itemId_userId_key" ON "Inventory"("itemId", "userId");

-- AddForeignKey
ALTER TABLE "InventoryExpiration" ADD CONSTRAINT "InventoryExpiration_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
