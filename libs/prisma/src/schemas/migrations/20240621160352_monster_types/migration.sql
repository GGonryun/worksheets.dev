-- CreateEnum
CREATE TYPE "MobType" AS ENUM ('BASIC', 'BOSS');

-- AlterTable
ALTER TABLE "Mob" ADD COLUMN     "type" "MobType" NOT NULL DEFAULT 'BASIC';
