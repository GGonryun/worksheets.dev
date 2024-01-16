/*
  Warnings:

  - You are about to drop the column `profileId` on the `GameSubmission` table. All the data in the column will be lost.
  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `GameSubmission` table without a default value. This is not possible if the table is not empty.
  - The required column `username` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "GameSubmission" DROP CONSTRAINT "GameSubmission_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Purse" DROP CONSTRAINT "Purse_userId_fkey";

-- AlterTable
ALTER TABLE "GameSubmission" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "isPublisher" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "referredByUserId" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Email";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Purse";

-- CreateTable
CREATE TABLE "Rewards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "availableGamePlayTokens" INTEGER NOT NULL,
    "availableReferralTokens" INTEGER NOT NULL,
    "giftBoxes" INTEGER NOT NULL,
    "dailyRewardMomentum" INTEGER NOT NULL,
    "claimedDailyReward" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredByUserId_fkey" FOREIGN KEY ("referredByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmission" ADD CONSTRAINT "GameSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
