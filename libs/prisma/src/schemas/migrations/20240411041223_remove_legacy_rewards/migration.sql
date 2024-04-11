/*
  Warnings:

  - You are about to drop the `Rewards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rewards" DROP CONSTRAINT "Rewards_userId_fkey";

-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- DropTable
DROP TABLE "Rewards";
