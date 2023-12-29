/*
  Warnings:

  - You are about to drop the column `up` on the `GameVoteSubmission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameVoteSubmission" DROP COLUMN "up",
ADD COLUMN     "vote" INTEGER NOT NULL DEFAULT 0;
