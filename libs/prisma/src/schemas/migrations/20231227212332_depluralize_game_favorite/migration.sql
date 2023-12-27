/*
  Warnings:

  - You are about to drop the `GameFavorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameFavorites" DROP CONSTRAINT "GameFavorites_userId_fkey";

-- DropTable
DROP TABLE "GameFavorites";

-- CreateTable
CREATE TABLE "GameFavorite" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameFavorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameFavorite" ADD CONSTRAINT "GameFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
