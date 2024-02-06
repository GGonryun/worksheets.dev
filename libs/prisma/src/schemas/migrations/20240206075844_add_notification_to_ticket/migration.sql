-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "RaffleTicket" ADD COLUMN     "lastNotifiedAt" TIMESTAMP(3);
