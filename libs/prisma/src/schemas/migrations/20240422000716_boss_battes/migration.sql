-- CreateEnum
CREATE TYPE "MobRace" AS ENUM ('FORMLESS', 'UNDEAD', 'BEAST', 'PLANT', 'INSECT', 'FISH', 'DEMON', 'MACHINE', 'HUMANOID', 'ANGEL', 'DRAGON');

-- CreateEnum
CREATE TYPE "MobElement" AS ENUM ('NEUTRAL_1', 'WATER_1', 'EARTH_1', 'FIRE_1', 'WIND_1', 'POISON_1', 'HOLY_1', 'SHADOW_1', 'GHOST_1', 'UNDEAD_1');

-- CreateEnum
CREATE TYPE "MobSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "BattleStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MvpReason" AS ENUM ('MOST_DAMAGE', 'MOST_STRIKES', 'LAST_HIT');

-- CreateTable
CREATE TABLE "Loot" (
    "id" SERIAL NOT NULL,
    "itemId" TEXT NOT NULL,
    "mobId" INTEGER,
    "quantity" INTEGER NOT NULL,
    "chance" DOUBLE PRECISION NOT NULL,
    "mvp" BOOLEAN NOT NULL DEFAULT false,
    "battleParticipationId" INTEGER,

    CONSTRAINT "Loot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mob" (
    "id" SERIAL NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxHp" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "race" "MobRace" NOT NULL,
    "element" "MobElement" NOT NULL,
    "size" "MobSize" NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "baseExp" INTEGER NOT NULL,
    "mvpExp" INTEGER NOT NULL,

    CONSTRAINT "Mob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" SERIAL NOT NULL,
    "status" "BattleStatus" NOT NULL,
    "mobId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "damage" INTEGER NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattleParticipation" (
    "id" SERIAL NOT NULL,
    "damage" INTEGER NOT NULL,
    "strikes" INTEGER NOT NULL,
    "battleId" INTEGER NOT NULL,
    "isMvp" "MvpReason",
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "struckAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BattleParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Loot_itemId_battleParticipationId_key" ON "Loot"("itemId", "battleParticipationId");

-- CreateIndex
CREATE UNIQUE INDEX "Loot_itemId_mobId_key" ON "Loot"("itemId", "mobId");

-- CreateIndex
CREATE UNIQUE INDEX "BattleParticipation_userId_battleId_key" ON "BattleParticipation"("userId", "battleId");

-- AddForeignKey
ALTER TABLE "Loot" ADD CONSTRAINT "Loot_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loot" ADD CONSTRAINT "Loot_mobId_fkey" FOREIGN KEY ("mobId") REFERENCES "Mob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loot" ADD CONSTRAINT "Loot_battleParticipationId_fkey" FOREIGN KEY ("battleParticipationId") REFERENCES "BattleParticipation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_mobId_fkey" FOREIGN KEY ("mobId") REFERENCES "Mob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleParticipation" ADD CONSTRAINT "BattleParticipation_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleParticipation" ADD CONSTRAINT "BattleParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
