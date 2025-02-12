/*
  Warnings:

  - You are about to drop the column `questId` on the `Loot` table. All the data in the column will be lost.
  - You are about to drop the column `questId` on the `TaskProgress` table. All the data in the column will be lost.
  - You are about to drop the `Integration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlatformQuest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Integration" DROP CONSTRAINT "Integration_userId_fkey";

-- DropForeignKey
ALTER TABLE "Loot" DROP CONSTRAINT "Loot_questId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformQuest" DROP CONSTRAINT "PlatformQuest_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskProgress" DROP CONSTRAINT "TaskProgress_questId_fkey";

-- DropIndex
DROP INDEX "TaskProgress_userId_questId_key";

-- AlterTable
ALTER TABLE "Loot" DROP COLUMN "questId";

-- AlterTable
ALTER TABLE "TaskProgress" DROP COLUMN "questId";

-- DropTable
DROP TABLE "Integration";

-- DropTable
DROP TABLE "PlatformQuest";

-- DropEnum
DROP TYPE "IntegrationProvider";
