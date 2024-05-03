-- CreateEnum
CREATE TYPE "ItemRarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY', 'EPIC', 'MYTHIC', 'PREMIUM');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "buy" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rarity" "ItemRarity" NOT NULL DEFAULT 'COMMON';

-- CreateTable
CREATE TABLE "InventoryCapsule" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "unlocks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryCapsule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapsuleOption" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "capsuleId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "unlocked" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CapsuleOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryCapsule_inventoryId_key" ON "InventoryCapsule"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CapsuleOption_capsuleId_position_key" ON "CapsuleOption"("capsuleId", "position");

-- AddForeignKey
ALTER TABLE "InventoryCapsule" ADD CONSTRAINT "InventoryCapsule_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapsuleOption" ADD CONSTRAINT "CapsuleOption_capsuleId_fkey" FOREIGN KEY ("capsuleId") REFERENCES "InventoryCapsule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapsuleOption" ADD CONSTRAINT "CapsuleOption_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
