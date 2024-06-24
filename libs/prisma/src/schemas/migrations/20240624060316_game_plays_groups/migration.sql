/*
  Warnings:

  - A unique constraint covering the columns `[gameId,userId]` on the table `GamePlayHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "GamePlayHistory" ADD COLUMN     "plays" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "GamePlayHistory_gameId_userId_key" ON "GamePlayHistory"("gameId", "userId");
