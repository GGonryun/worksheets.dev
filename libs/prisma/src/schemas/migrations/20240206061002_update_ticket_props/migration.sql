/*
  Warnings:

  - You are about to drop the column `raffleId` on the `RaffleTicket` table. All the data in the column will be lost.
  - You are about to drop the column `winner` on the `RaffleTicket` table. All the data in the column will be lost.
  - Added the required column `prizeId` to the `RaffleTicket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RaffleTicket" DROP CONSTRAINT "RaffleTicket_raffleId_fkey";

-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "RaffleTicket" DROP COLUMN "raffleId",
DROP COLUMN "winner",
ADD COLUMN     "isWinner" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prizeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RaffleTicket" ADD CONSTRAINT "RaffleTicket_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "RafflePrize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
