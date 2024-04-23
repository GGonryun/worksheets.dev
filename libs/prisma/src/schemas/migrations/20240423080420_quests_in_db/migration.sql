/*
  Warnings:

  - You are about to drop the column `questId` on the `QuestProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,questDefinitionId]` on the table `QuestProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questDefinitionId` to the `QuestProgress` table without a default value. This is not possible if the table is not empty.

*/
-- Drop Everything in QuestProgress
DELETE FROM "QuestProgress";

-- CreateEnum
CREATE TYPE "QuestType" AS ENUM ('PLAY_GAME', 'PLAY_MINUTES', 'REFERRAL_PLAY_MINUTES', 'FRIEND_PLAY_MINUTES', 'ADD_FRIEND', 'ADD_REFERRAL', 'RAFFLE_PARTICIPATION', 'VISIT_WEBSITE', 'FOLLOW_TWITTER', 'BASIC_ACTION');

-- CreateEnum
CREATE TYPE "QuestFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'INFINITE');

-- CreateEnum
CREATE TYPE "QuestCategory" AS ENUM ('GAMEPLAY', 'SOCIAL', 'TASK');

-- DropIndex
DROP INDEX "QuestProgress_userId_questId_key";

-- AlterTable
ALTER TABLE "Loot" ADD COLUMN     "questDefinitionId" TEXT;

-- AlterTable
ALTER TABLE "QuestProgress" DROP COLUMN "questId",
ADD COLUMN     "questDefinitionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "QuestDefinition" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "QuestType" NOT NULL,
    "category" "QuestCategory" NOT NULL,
    "frequency" "QuestFrequency" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "QuestDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestProgress_userId_questDefinitionId_key" ON "QuestProgress"("userId", "questDefinitionId");

-- AddForeignKey
ALTER TABLE "QuestProgress" ADD CONSTRAINT "QuestProgress_questDefinitionId_fkey" FOREIGN KEY ("questDefinitionId") REFERENCES "QuestDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loot" ADD CONSTRAINT "Loot_questDefinitionId_fkey" FOREIGN KEY ("questDefinitionId") REFERENCES "QuestDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

