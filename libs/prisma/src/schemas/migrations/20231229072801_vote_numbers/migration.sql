/*
  Warnings:

  - You are about to drop the column `liked` on the `GameVote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameVote" DROP COLUMN "liked",
ADD COLUMN     "down" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "up" INTEGER NOT NULL DEFAULT 0;
