-- CreateEnum
CREATE TYPE "PrizeDistribution" AS ENUM ('TOP_1', 'TOP_2', 'TOP_3', 'TOP_4', 'TOP_6', 'TOP_8', 'TOP_10');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "leaderboard" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "multiplier" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Loot" ADD COLUMN     "gameId" TEXT;

-- CreateTable
CREATE TABLE "GameScore" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameCompetition" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "gameId" TEXT NOT NULL,
    "base" INTEGER NOT NULL,
    "playerBonus" DOUBLE PRECISION NOT NULL,
    "submissionBonus" DOUBLE PRECISION NOT NULL,
    "distribution" "PrizeDistribution" NOT NULL,

    CONSTRAINT "GameCompetition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Loot" ADD CONSTRAINT "Loot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameScore" ADD CONSTRAINT "GameScore_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameScore" ADD CONSTRAINT "GameScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCompetition" ADD CONSTRAINT "GameCompetition_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
