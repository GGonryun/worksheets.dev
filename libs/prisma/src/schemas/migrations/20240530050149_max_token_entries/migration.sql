-- AlterTable
ALTER TABLE "Raffle" ADD COLUMN     "maxEntries" INTEGER;

-- AlterTable
ALTER TABLE "RaffleParticipation" ADD COLUMN     "purchased" INTEGER NOT NULL DEFAULT 0;
