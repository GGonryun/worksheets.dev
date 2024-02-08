/*
  Warnings:

  - You are about to drop the column `claimBefore` on the `RaffleTicket` table. All the data in the column will be lost.
  - You are about to drop the column `claimedAt` on the `RaffleTicket` table. All the data in the column will be lost.
  - You are about to drop the column `isWinner` on the `RaffleTicket` table. All the data in the column will be lost.
  - You are about to drop the column `lastNotifiedAt` on the `RaffleTicket` table. All the data in the column will be lost.
  - You are about to drop the column `prizeId` on the `RaffleTicket` table. All the data in the column will be lost.
  - You are about to drop the `PrizeSponsor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RafflePrize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `raffleId` to the `RaffleTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RaffleTicket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- DropForeignKey
ALTER TABLE "RafflePrize" DROP CONSTRAINT "RafflePrize_sponsorId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleTicket" DROP CONSTRAINT "RaffleTicket_prizeId_fkey";

-- AlterTable
ALTER TABLE "GameCategory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "RaffleTicket" DROP COLUMN "claimBefore",
DROP COLUMN "claimedAt",
DROP COLUMN "isWinner",
DROP COLUMN "lastNotifiedAt",
DROP COLUMN "prizeId",
ADD COLUMN     "raffleId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "PrizeSponsor";

-- DropTable
DROP TABLE "RafflePrize";

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(127) NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prize" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(127) NOT NULL,
    "headline" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2047) NOT NULL,
    "monetaryValue" INTEGER NOT NULL,
    "sourceUrl" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "type" "PrizeType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raffle" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "costPerEntry" INTEGER NOT NULL,
    "numWinners" INTEGER NOT NULL,
    "sponsorId" VARCHAR(127) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prizeId" TEXT NOT NULL,

    CONSTRAINT "Raffle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WinningTicket" (
    "id" TEXT NOT NULL,
    "lastNotifiedAt" TIMESTAMP(3),
    "claimedAt" TIMESTAMP(3),
    "claimBefore" TIMESTAMP(3) NOT NULL,
    "ticketId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WinningTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivationCode" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "prizeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivationCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivationCodeAssignment" (
    "id" TEXT NOT NULL,
    "activationCodeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "raffleId" TEXT,
    "winningTicketId" TEXT,
    "userId" TEXT,

    CONSTRAINT "ActivationCodeAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WinningTicket_ticketId_key" ON "WinningTicket"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivationCode_content_key" ON "ActivationCode"("content");

-- CreateIndex
CREATE UNIQUE INDEX "ActivationCodeAssignment_activationCodeId_key" ON "ActivationCodeAssignment"("activationCodeId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivationCodeAssignment_winningTicketId_key" ON "ActivationCodeAssignment"("winningTicketId");

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleTicket" ADD CONSTRAINT "RaffleTicket_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WinningTicket" ADD CONSTRAINT "WinningTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "RaffleTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCode" ADD CONSTRAINT "ActivationCode_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCodeAssignment" ADD CONSTRAINT "ActivationCodeAssignment_activationCodeId_fkey" FOREIGN KEY ("activationCodeId") REFERENCES "ActivationCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCodeAssignment" ADD CONSTRAINT "ActivationCodeAssignment_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCodeAssignment" ADD CONSTRAINT "ActivationCodeAssignment_winningTicketId_fkey" FOREIGN KEY ("winningTicketId") REFERENCES "WinningTicket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCodeAssignment" ADD CONSTRAINT "ActivationCodeAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
