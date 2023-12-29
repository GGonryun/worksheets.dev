/*
  Warnings:

  - You are about to drop the column `userId` on the `GamePlay` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `GameReport` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `GameVote` table. All the data in the column will be lost.
  - You are about to drop the `GameFavorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameFavorite" DROP CONSTRAINT "GameFavorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "GamePlay" DROP CONSTRAINT "GamePlay_userId_fkey";

-- DropForeignKey
ALTER TABLE "GameReport" DROP CONSTRAINT "GameReport_userId_fkey";

-- DropForeignKey
ALTER TABLE "GameVote" DROP CONSTRAINT "GameVote_userId_fkey";

-- AlterTable
ALTER TABLE "GamePlay" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "GameReport" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "GameVote" DROP COLUMN "userId";

-- DropTable
DROP TABLE "GameFavorite";
