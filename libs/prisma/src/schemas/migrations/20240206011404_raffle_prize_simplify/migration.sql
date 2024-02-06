/*
  Warnings:

  - You are about to drop the column `winnerIds` on the `RafflePrize` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "RafflePrize" DROP COLUMN "winnerIds";
