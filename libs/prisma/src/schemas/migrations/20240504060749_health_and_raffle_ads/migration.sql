/*
  Warnings:

  - You are about to drop the column `damage` on the `Battle` table. All the data in the column will be lost.
  - Added the required column `health` to the `Battle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Battle" DROP COLUMN "damage",
ADD COLUMN     "health" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RaffleParticipation" ADD COLUMN     "adsWatched" INTEGER NOT NULL DEFAULT 0;
