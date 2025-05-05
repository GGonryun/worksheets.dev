/*
  Warnings:

  - Made the column `teamId` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "teamId" SET NOT NULL,
ALTER COLUMN "teamId" SET DEFAULT 'charity-games';

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
