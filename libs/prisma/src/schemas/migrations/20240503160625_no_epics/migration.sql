/*
  Warnings:

  - The values [EPIC] on the enum `ItemRarity` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemRarity_new" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY', 'MYTHIC', 'PREMIUM');
ALTER TABLE "Item" ALTER COLUMN "rarity" DROP DEFAULT;
ALTER TABLE "Item" ALTER COLUMN "rarity" TYPE "ItemRarity_new" USING ("rarity"::text::"ItemRarity_new");
ALTER TYPE "ItemRarity" RENAME TO "ItemRarity_old";
ALTER TYPE "ItemRarity_new" RENAME TO "ItemRarity";
DROP TYPE "ItemRarity_old";
ALTER TABLE "Item" ALTER COLUMN "rarity" SET DEFAULT 'COMMON';
COMMIT;
