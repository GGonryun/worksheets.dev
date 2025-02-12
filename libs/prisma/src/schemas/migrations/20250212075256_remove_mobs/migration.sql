/*
  Warnings:

  - You are about to drop the column `mobId` on the `Loot` table. All the data in the column will be lost.
  - You are about to drop the column `mvp` on the `Loot` table. All the data in the column will be lost.
  - You are about to drop the `Battle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BattleLogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BattleParticipation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Battle" DROP CONSTRAINT "Battle_mobId_fkey";

-- DropForeignKey
ALTER TABLE "BattleLogs" DROP CONSTRAINT "BattleLogs_battleId_fkey";

-- DropForeignKey
ALTER TABLE "BattleParticipation" DROP CONSTRAINT "BattleParticipation_battleId_fkey";

-- DropForeignKey
ALTER TABLE "BattleParticipation" DROP CONSTRAINT "BattleParticipation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Loot" DROP CONSTRAINT "Loot_mobId_fkey";

-- AlterTable
ALTER TABLE "Loot" DROP COLUMN "mobId",
DROP COLUMN "mvp";

-- DropTable
DROP TABLE "Battle";

-- DropTable
DROP TABLE "BattleLogs";

-- DropTable
DROP TABLE "BattleParticipation";

-- DropTable
DROP TABLE "Mob";

-- DropEnum
DROP TYPE "BattleStatus";

-- DropEnum
DROP TYPE "MobElement";

-- DropEnum
DROP TYPE "MobRace";

-- DropEnum
DROP TYPE "MobSize";

-- DropEnum
DROP TYPE "MobType";

-- DropEnum
DROP TYPE "MvpReason";
