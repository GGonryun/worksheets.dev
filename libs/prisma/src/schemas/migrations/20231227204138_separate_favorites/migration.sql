/*
  Warnings:

  - You are about to drop the column `favoriteGameIds` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoriteGameIds";

-- CreateTable
CREATE TABLE "GameFavorites" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameFavorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameFavorites" ADD CONSTRAINT "GameFavorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
