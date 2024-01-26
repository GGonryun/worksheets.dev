/*
  Warnings:

  - You are about to drop the column `dailyRewardMomentum` on the `Rewards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "Rewards" DROP COLUMN "dailyRewardMomentum";
