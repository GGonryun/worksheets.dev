/*
  Warnings:

  - You are about to drop the column `isMvp` on the `BattleParticipation` table. All the data in the column will be lost.
  - You are about to drop the column `battleParticipationId` on the `Loot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Loot" DROP CONSTRAINT "Loot_battleParticipationId_fkey";

-- DropIndex
DROP INDEX "Loot_itemId_battleParticipationId_key";

-- AlterTable
ALTER TABLE "BattleParticipation" DROP COLUMN "isMvp";

-- AlterTable
ALTER TABLE "Loot" DROP COLUMN "battleParticipationId";

-- CreateTable
CREATE TABLE "BattleRecord" (
    "battleId" SERIAL NOT NULL,
    "mvpId" INTEGER NOT NULL,
    "mvpReason" "MvpReason" NOT NULL,
    "results" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BattleRecord_pkey" PRIMARY KEY ("battleId")
);

-- CreateTable
CREATE TABLE "BattleLogs" (
    "id" SERIAL NOT NULL,
    "battleId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BattleLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExperience" (
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserExperience_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "BattleRecord" ADD CONSTRAINT "BattleRecord_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleLogs" ADD CONSTRAINT "BattleLogs_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
