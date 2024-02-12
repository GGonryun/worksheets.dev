/*
  Warnings:

  - The primary key for the `Prize` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Prize` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Raffle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Raffle` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ActivationCodeAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RaffleTicket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WinningTicket` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `prizeId` on the `ActivationCode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `status` to the `Raffle` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `prizeId` on the `Raffle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('PUBLISHED', 'UNPUBLISHED', 'DELETED');

-- CreateEnum
CREATE TYPE "RaffleStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETE', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "ActivationCode" DROP CONSTRAINT "ActivationCode_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "ActivationCodeAssignment" DROP CONSTRAINT "ActivationCodeAssignment_activationCodeId_fkey";

-- DropForeignKey
ALTER TABLE "ActivationCodeAssignment" DROP CONSTRAINT "ActivationCodeAssignment_raffleId_fkey";

-- DropForeignKey
ALTER TABLE "ActivationCodeAssignment" DROP CONSTRAINT "ActivationCodeAssignment_userId_fkey";

-- DropForeignKey
ALTER TABLE "ActivationCodeAssignment" DROP CONSTRAINT "ActivationCodeAssignment_winningTicketId_fkey";

-- DropForeignKey
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleTicket" DROP CONSTRAINT "RaffleTicket_raffleId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleTicket" DROP CONSTRAINT "RaffleTicket_userId_fkey";

-- DropForeignKey
ALTER TABLE "WinningTicket" DROP CONSTRAINT "WinningTicket_ticketId_fkey";

-- AlterTable
ALTER TABLE "ActivationCode" ADD COLUMN     "raffleId" INTEGER,
DROP COLUMN "prizeId",
ADD COLUMN     "prizeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'UNPUBLISHED';

-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "Prize" DROP CONSTRAINT "Prize_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Prize_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_pkey",
ADD COLUMN     "status" "RaffleStatus" NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "prizeId",
ADD COLUMN     "prizeId" INTEGER NOT NULL,
ADD CONSTRAINT "Raffle_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ActivationCodeAssignment";

-- DropTable
DROP TABLE "RaffleTicket";

-- DropTable
DROP TABLE "WinningTicket";

-- CreateTable
CREATE TABLE "RaffleParticipation" (
    "id" SERIAL NOT NULL,
    "numTickets" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "raffleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RaffleParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaffleWinner" (
    "id" TEXT NOT NULL,
    "raffleId" INTEGER NOT NULL,
    "prizeId" INTEGER NOT NULL,
    "participationId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "claimedAt" TIMESTAMP(3),

    CONSTRAINT "RaffleWinner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimAlert" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSentAt" TIMESTAMP(3),
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "winnerId" TEXT NOT NULL,

    CONSTRAINT "ClaimAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RaffleParticipation_userId_raffleId_key" ON "RaffleParticipation"("userId", "raffleId");

-- CreateIndex
CREATE UNIQUE INDEX "RaffleWinner_participationId_key" ON "RaffleWinner"("participationId");

-- CreateIndex
CREATE UNIQUE INDEX "RaffleWinner_codeId_key" ON "RaffleWinner"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimAlert_winnerId_key" ON "ClaimAlert"("winnerId");

-- AddForeignKey
ALTER TABLE "GameReport" ADD CONSTRAINT "GameReport_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleParticipation" ADD CONSTRAINT "RaffleParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleParticipation" ADD CONSTRAINT "RaffleParticipation_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCode" ADD CONSTRAINT "ActivationCode_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCode" ADD CONSTRAINT "ActivationCode_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleWinner" ADD CONSTRAINT "RaffleWinner_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleWinner" ADD CONSTRAINT "RaffleWinner_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleWinner" ADD CONSTRAINT "RaffleWinner_participationId_fkey" FOREIGN KEY ("participationId") REFERENCES "RaffleParticipation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleWinner" ADD CONSTRAINT "RaffleWinner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleWinner" ADD CONSTRAINT "RaffleWinner_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "ActivationCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimAlert" ADD CONSTRAINT "ClaimAlert_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "RaffleWinner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
