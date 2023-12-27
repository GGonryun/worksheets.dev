/*
  Warnings:

  - You are about to drop the `GameComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameToFavorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameComment" DROP CONSTRAINT "GameComment_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameComment" DROP CONSTRAINT "GameComment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "GameComment" DROP CONSTRAINT "GameComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "GamePlay" DROP CONSTRAINT "GamePlay_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameVote" DROP CONSTRAINT "GameVote_gameId_fkey";

-- DropForeignKey
ALTER TABLE "_GameToFavorites" DROP CONSTRAINT "_GameToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToFavorites" DROP CONSTRAINT "_GameToFavorites_B_fkey";

-- DropTable
DROP TABLE "GameComment";

-- DropTable
DROP TABLE "_GameToFavorites";
