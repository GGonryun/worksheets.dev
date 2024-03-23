/*
  Warnings:

  - The values [DRAFT] on the enum `RaffleStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `giftSentAt` on the `Friendship` table. All the data in the column will be lost.
  - The primary key for the `Prize` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `monetaryValue` on the `Prize` table. All the data in the column will be lost.
  - You are about to drop the column `costPerEntry` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `numTickets` on the `RaffleParticipation` table. All the data in the column will be lost.
  - Added the required column `numEntries` to the `RaffleParticipation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RaffleStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'REASSIGN', 'WAITING', 'COMPLETE', 'CANCELLED');
ALTER TABLE "Raffle" ALTER COLUMN "status" TYPE "RaffleStatus_new" USING ("status"::text::"RaffleStatus_new");
ALTER TYPE "RaffleStatus" RENAME TO "RaffleStatus_old";
ALTER TYPE "RaffleStatus_new" RENAME TO "RaffleStatus";
DROP TYPE "RaffleStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ActivationCode" DROP CONSTRAINT "ActivationCode_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "RaffleWinner" DROP CONSTRAINT "RaffleWinner_prizeId_fkey";

-- AlterTable
ALTER TABLE "ActivationCode" ALTER COLUMN "prizeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "giftSentAt";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "GameCategory" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "Prize" DROP CONSTRAINT "Prize_pkey",
DROP COLUMN "monetaryValue",
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Prize_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Prize_id_seq";

-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "costPerEntry",
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "prizeId" SET DATA TYPE TEXT;
DROP SEQUENCE "Raffle_id_seq";

-- AlterTable
ALTER TABLE "RaffleParticipation" DROP COLUMN "numTickets",
ADD COLUMN     "numEntries" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RaffleWinner" ALTER COLUMN "prizeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN     "logo" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL,
    "friendshipId" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePublishAlert" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "triggerAt" TIMESTAMP(3) NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "GamePublishAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RafflePublishAlert" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "triggerAt" TIMESTAMP(3) NOT NULL,
    "raffleId" INTEGER NOT NULL,

    CONSTRAINT "RafflePublishAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gift_friendshipId_key" ON "Gift"("friendshipId");

-- CreateIndex
CREATE UNIQUE INDEX "GamePublishAlert_gameId_key" ON "GamePublishAlert"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "RafflePublishAlert_raffleId_key" ON "RafflePublishAlert"("raffleId");

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_friendshipId_fkey" FOREIGN KEY ("friendshipId") REFERENCES "Friendship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationCode" ADD CONSTRAINT "ActivationCode_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleWinner" ADD CONSTRAINT "RaffleWinner_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePublishAlert" ADD CONSTRAINT "GamePublishAlert_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RafflePublishAlert" ADD CONSTRAINT "RafflePublishAlert_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
