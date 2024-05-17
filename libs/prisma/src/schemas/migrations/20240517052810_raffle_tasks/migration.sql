/*
  Warnings:

  - You are about to drop the column `questDefinitionId` on the `Loot` table. All the data in the column will be lost.
  - You are about to drop the `QuestDefinition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('PLAY_GAME', 'PLAY_MINUTES', 'REFERRAL_PLAY_MINUTES', 'FRIEND_PLAY_MINUTES', 'ADD_FRIEND', 'ADD_REFERRAL', 'RAFFLE_PARTICIPATION', 'BATTLE_PARTICIPATION', 'VISIT_WEBSITE', 'FOLLOW_TWITTER', 'BASIC_ACTION', 'WATCH_AD', 'FOLLOW_TWITCH', 'WISHLIST_STEAM_GAME', 'JOIN_DISCORD_GUILD');

-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('GAMEPLAY', 'SOCIAL', 'TASK');

-- CreateEnum
CREATE TYPE "TaskFrequency" AS ENUM ('ONCE', 'DAILY', 'WEEKLY', 'MONTHLY', 'INFINITE');

-- DropForeignKey
ALTER TABLE "Loot" DROP CONSTRAINT "Loot_questDefinitionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestProgress" DROP CONSTRAINT "QuestProgress_questDefinitionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestProgress" DROP CONSTRAINT "QuestProgress_userId_fkey";

-- AlterTable
ALTER TABLE "Loot" DROP COLUMN "questDefinitionId",
ADD COLUMN     "questId" TEXT;

-- DropTable
DROP TABLE "QuestDefinition";

-- DropTable
DROP TABLE "QuestProgress";

-- DropEnum
DROP TYPE "QuestCategory";

-- DropEnum
DROP TYPE "QuestFrequency";

-- DropEnum
DROP TYPE "QuestStatus";

-- DropEnum
DROP TYPE "QuestType";

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "category" "TaskCategory" NOT NULL,
    "frequency" "TaskFrequency" NOT NULL,
    "requiredRepetitions" INTEGER NOT NULL,
    "maxRepetitions" INTEGER NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskProgress" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "status" "TaskStatus" NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "questId" TEXT,
    "actionId" TEXT,

    CONSTRAINT "TaskProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformQuest" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "PlatformQuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaffleAction" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "reward" INTEGER NOT NULL,
    "taskId" TEXT NOT NULL,
    "raffleId" INTEGER NOT NULL,

    CONSTRAINT "RaffleAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskProgress_userId_questId_key" ON "TaskProgress"("userId", "questId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskProgress_userId_actionId_key" ON "TaskProgress"("userId", "actionId");

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD CONSTRAINT "TaskProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD CONSTRAINT "TaskProgress_questId_fkey" FOREIGN KEY ("questId") REFERENCES "PlatformQuest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD CONSTRAINT "TaskProgress_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "RaffleAction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformQuest" ADD CONSTRAINT "PlatformQuest_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleAction" ADD CONSTRAINT "RaffleAction_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleAction" ADD CONSTRAINT "RaffleAction_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loot" ADD CONSTRAINT "Loot_questId_fkey" FOREIGN KEY ("questId") REFERENCES "PlatformQuest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
