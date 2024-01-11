/*
  Warnings:

  - You are about to drop the column `banner` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `devices` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `file` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `down` on the `GameVote` table. All the data in the column will be lost.
  - You are about to drop the column `up` on the `GameVote` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `GameVoteSubmission` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fileId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cover` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewportId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Made the column `headline` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `GameVote` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "GameSubmissionStatus" AS ENUM ('DRAFT', 'REJECTED', 'PENDING', 'ACCEPTED', 'DELETED');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('HTML', 'PAGE');

-- CreateEnum
CREATE TYPE "ViewportType" AS ENUM ('FIXED', 'RESPONSIVE');

-- CreateEnum
CREATE TYPE "GameCategory" AS ENUM ('ACTION', 'ADVENTURE', 'ARCADE', 'BOARD', 'CARD', 'EDUCATIONAL', 'FIGHTING', 'IDLE', 'NOVEL', 'PLATFORMER', 'PUZZLE', 'RACING', 'RPG', 'RHYTHM', 'SHOOTER', 'SIMULATION', 'SPORTS', 'STRATEGY', 'SURVIVAL', 'OTHER', 'TRIVIA', 'WORD');

-- CreateEnum
CREATE TYPE "DeviceOrientations" AS ENUM ('PORTRAIT', 'LANDSCAPE');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "banner",
DROP COLUMN "devices",
DROP COLUMN "file",
DROP COLUMN "key",
DROP COLUMN "logo",
DROP COLUMN "name",
DROP COLUMN "status",
DROP COLUMN "teamId",
DROP COLUMN "video",
ADD COLUMN     "category" "GameCategory" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "cover" TEXT NOT NULL,
ADD COLUMN     "fileId" TEXT NOT NULL,
ADD COLUMN     "instructions" VARCHAR(2047) NOT NULL,
ADD COLUMN     "markets" TEXT,
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "slug" VARCHAR(63) NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "title" VARCHAR(127) NOT NULL,
ADD COLUMN     "trailer" TEXT,
ADD COLUMN     "viewportId" TEXT NOT NULL,
ALTER COLUMN "headline" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "GamePlay" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "GameVote" DROP COLUMN "down",
DROP COLUMN "up",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "vote" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "GameVoteSubmission";

-- DropEnum
DROP TYPE "GameStatus";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "isPublisher" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Viewport" (
    "id" TEXT NOT NULL,
    "type" "ViewportType" NOT NULL DEFAULT 'RESPONSIVE',
    "width" INTEGER,
    "height" INTEGER,
    "devices" "GameDevices"[] DEFAULT ARRAY['WEB']::"GameDevices"[],
    "orientations" "DeviceOrientations"[] DEFAULT ARRAY['PORTRAIT']::"DeviceOrientations"[],

    CONSTRAINT "Viewport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameFile" (
    "id" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL DEFAULT 'HTML',
    "url" VARCHAR(511) NOT NULL,

    CONSTRAINT "GameFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoredFile" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "path" VARCHAR(511) NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "type" VARCHAR(63) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoredFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSubmission" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(63),
    "title" VARCHAR(63),
    "headline" VARCHAR(255),
    "projectType" "ProjectType",
    "externalWebsiteUrl" VARCHAR(255),
    "viewport" "ViewportType" DEFAULT 'RESPONSIVE',
    "viewportWidth" INTEGER,
    "viewportHeight" INTEGER,
    "devices" "GameDevices"[],
    "orientations" "DeviceOrientations"[],
    "description" VARCHAR(1023),
    "instructions" VARCHAR(1023),
    "category" "GameCategory",
    "tags" VARCHAR(63)[] DEFAULT ARRAY[]::VARCHAR(63)[],
    "markets" TEXT,
    "gameFileId" VARCHAR(63),
    "thumbnailFileId" VARCHAR(63),
    "coverFileId" VARCHAR(63),
    "trailerUrl" VARCHAR(63),
    "status" "GameSubmissionStatus" NOT NULL DEFAULT 'DRAFT',
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSubmissionFeedback" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "text" VARCHAR(511) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSubmissionFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Purse_userId_key" ON "Purse"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSubmission_gameFileId_key" ON "GameSubmission"("gameFileId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSubmission_thumbnailFileId_key" ON "GameSubmission"("thumbnailFileId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSubmission_coverFileId_key" ON "GameSubmission"("coverFileId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_fileId_key" ON "Game"("fileId");

-- AddForeignKey
ALTER TABLE "GamePlay" ADD CONSTRAINT "GamePlay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameVote" ADD CONSTRAINT "GameVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purse" ADD CONSTRAINT "Purse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "GameFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_viewportId_fkey" FOREIGN KEY ("viewportId") REFERENCES "Viewport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmission" ADD CONSTRAINT "GameSubmission_gameFileId_fkey" FOREIGN KEY ("gameFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmission" ADD CONSTRAINT "GameSubmission_thumbnailFileId_fkey" FOREIGN KEY ("thumbnailFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmission" ADD CONSTRAINT "GameSubmission_coverFileId_fkey" FOREIGN KEY ("coverFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmission" ADD CONSTRAINT "GameSubmission_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmissionFeedback" ADD CONSTRAINT "GameSubmissionFeedback_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "GameSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
