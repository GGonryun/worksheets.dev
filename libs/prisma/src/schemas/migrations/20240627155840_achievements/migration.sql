-- AlterTable
ALTER TABLE "Loot" ADD COLUMN     "achievementId" TEXT;

-- CreateTable
CREATE TABLE "GameAchievement" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "secret" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GameAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerAchievement" (
    "id" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameAchievement_gameId_id_key" ON "GameAchievement"("gameId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerAchievement_achievementId_userId_key" ON "PlayerAchievement"("achievementId", "userId");

-- AddForeignKey
ALTER TABLE "Loot" ADD CONSTRAINT "Loot_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "GameAchievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameAchievement" ADD CONSTRAINT "GameAchievement_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAchievement" ADD CONSTRAINT "PlayerAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "GameAchievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAchievement" ADD CONSTRAINT "PlayerAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
