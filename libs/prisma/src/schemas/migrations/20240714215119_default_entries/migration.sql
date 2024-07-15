-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "numWinners" SET DEFAULT 1;

-- Fix key
SELECT setval(pg_get_serial_sequence('"Raffle"', 'id'), coalesce(max(id)+1, 1), false) FROM "Raffle";
