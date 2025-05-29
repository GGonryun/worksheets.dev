/*
  Warnings:

  - Made the column `teamId` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ContestType" AS ENUM ('TOP_8_QUALIFY', 'TOP_8_TIERED');

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_teamId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "teamId" SET NOT NULL,
ALTER COLUMN "teamId" SET DEFAULT 'charity-games';

-- AlterTable
ALTER TABLE "Prize" ADD COLUMN     "contestId" INTEGER;

-- CreateTable
CREATE TABLE "Contest" (
    "id" SERIAL NOT NULL,
    "type" "ContestType" NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "sponsorId" VARCHAR(127) NOT NULL,
    "prizeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contest_prizeId_key" ON "Contest"("prizeId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
