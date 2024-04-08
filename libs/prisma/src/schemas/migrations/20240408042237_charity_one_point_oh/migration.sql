/*
  Warnings:

  - You are about to drop the column `subscribed` on the `NewsletterSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `availableGamePlayTokens` on the `Rewards` table. All the data in the column will be lost.
  - You are about to drop the column `availableReferralTokens` on the `Rewards` table. All the data in the column will be lost.
  - You are about to drop the column `claimedDailyReward` on the `Rewards` table. All the data in the column will be lost.
  - You are about to drop the `NotificationPreferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NewsletterTopic" AS ENUM ('Transactional', 'NewRaffle', 'NewGame', 'NewAuction', 'WeeklyNewsletter', 'TipsAndTricks');

-- CreateEnum
CREATE TYPE "ScheduledEmailStatus" AS ENUM ('DRAFT', 'PENDING', 'SENT', 'SENDING', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QuestStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "CategoriesOnGame" DROP CONSTRAINT "CategoriesOnGame_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnGame" DROP CONSTRAINT "CategoriesOnGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "ClaimAlert" DROP CONSTRAINT "ClaimAlert_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "GameReport" DROP CONSTRAINT "GameReport_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Gift" DROP CONSTRAINT "Gift_friendshipId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationPreferences" DROP CONSTRAINT "NotificationPreferences_userId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleParticipation" DROP CONSTRAINT "RaffleParticipation_userId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleWinner" DROP CONSTRAINT "RaffleWinner_userId_fkey";

-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "NewsletterSubscription" DROP COLUMN "subscribed",
ADD COLUMN     "topics" "NewsletterTopic"[] DEFAULT ARRAY['Transactional', 'NewRaffle', 'NewGame', 'NewAuction', 'WeeklyNewsletter', 'TipsAndTricks']::"NewsletterTopic"[];

-- AlterTable
ALTER TABLE "Rewards" DROP COLUMN "availableGamePlayTokens",
DROP COLUMN "availableReferralTokens",
DROP COLUMN "claimedDailyReward";

-- DropTable
DROP TABLE "NotificationPreferences";

-- CreateTable
CREATE TABLE "ScheduledEmail" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priority" INTEGER NOT NULL,
    "sendAt" TIMESTAMP(3) NOT NULL,
    "status" "ScheduledEmailStatus" NOT NULL DEFAULT 'PENDING',
    "to" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cc" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bcc" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "subject" TEXT NOT NULL,
    "html" TEXT NOT NULL,

    CONSTRAINT "ScheduledEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestProgress" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "status" "QuestStatus" NOT NULL,
    "state" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "questId" TEXT NOT NULL,

    CONSTRAINT "QuestProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestProgress_userId_questId_key" ON "QuestProgress"("userId", "questId");

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_friendshipId_fkey" FOREIGN KEY ("friendshipId") REFERENCES "Friendship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameReport" ADD CONSTRAINT "GameReport_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnGame" ADD CONSTRAINT "CategoriesOnGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnGame" ADD CONSTRAINT "CategoriesOnGame_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GameCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleParticipation" ADD CONSTRAINT "RaffleParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleWinner" ADD CONSTRAINT "RaffleWinner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimAlert" ADD CONSTRAINT "ClaimAlert_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "RaffleWinner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestProgress" ADD CONSTRAINT "QuestProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
