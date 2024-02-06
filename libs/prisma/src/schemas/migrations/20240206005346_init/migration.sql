-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('BROKEN', 'DEFAMATORY', 'HARMFUL', 'LEGAL', 'FRAUD', 'INAPPROPRIATE', 'OTHER');

-- CreateEnum
CREATE TYPE "GameDevices" AS ENUM ('MOBILE', 'COMPUTER');

-- CreateEnum
CREATE TYPE "GameSubmissionStatus" AS ENUM ('DRAFT', 'REJECTED', 'PENDING', 'ACCEPTED', 'DELETED');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('HTML', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "ViewportType" AS ENUM ('FIXED', 'RESPONSIVE');

-- CreateEnum
CREATE TYPE "DeviceOrientations" AS ENUM ('PORTRAIT', 'LANDSCAPE');

-- CreateEnum
CREATE TYPE "PrizeType" AS ENUM ('STEAM_KEY', 'GIFT_CARD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "referredByUserId" TEXT,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "isPublisher" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSeen" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "refresh_token_expires_in" INTEGER,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "giftSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rewards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "availableGamePlayTokens" INTEGER NOT NULL,
    "availableReferralTokens" INTEGER NOT NULL,
    "giftBoxes" INTEGER NOT NULL,
    "sharableGiftBoxes" INTEGER NOT NULL,
    "claimedDailyReward" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ReferralCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameReport" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "reason" "ReportReason" NOT NULL DEFAULT 'OTHER',
    "text" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Viewport" (
    "id" TEXT NOT NULL,
    "type" "ViewportType" NOT NULL DEFAULT 'RESPONSIVE',
    "width" INTEGER,
    "height" INTEGER,
    "devices" "GameDevices"[] DEFAULT ARRAY['COMPUTER', 'MOBILE']::"GameDevices"[],
    "orientations" "DeviceOrientations"[] DEFAULT ARRAY['PORTRAIT', 'LANDSCAPE']::"DeviceOrientations"[],

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
CREATE TABLE "CategoriesOnGame" (
    "gameId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnGame_pkey" PRIMARY KEY ("gameId","categoryId")
);

-- CreateTable
CREATE TABLE "GameCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(4095) NOT NULL,
    "iconUrl" VARCHAR(255) NOT NULL,
    "relatedCategoryIds" VARCHAR(63)[],

    CONSTRAINT "GameCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(4095) NOT NULL,
    "logoUrl" VARCHAR(255) NOT NULL,
    "links" TEXT NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(127) NOT NULL,
    "description" VARCHAR(4095) NOT NULL,
    "plays" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "thumbnail" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fileId" TEXT NOT NULL,
    "viewportId" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
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
    "categories" VARCHAR(63)[] DEFAULT ARRAY[]::VARCHAR(63)[],
    "markets" TEXT,
    "gameFileId" VARCHAR(63),
    "thumbnailFileId" VARCHAR(63),
    "coverFileId" VARCHAR(63),
    "trailerUrl" VARCHAR(63),
    "status" "GameSubmissionStatus" NOT NULL DEFAULT 'DRAFT',
    "userId" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "PrizeSponsor" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(127) NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "PrizeSponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RafflePrize" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" VARCHAR(127) NOT NULL,
    "headline" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2047) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "costPerEntry" INTEGER NOT NULL,
    "monetaryValue" INTEGER NOT NULL,
    "type" "PrizeType" NOT NULL,
    "sourceUrl" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "numWinners" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sponsorId" VARCHAR(127) NOT NULL,
    "winnerIds" VARCHAR(63)[],

    CONSTRAINT "RafflePrize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaffleTicket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "raffleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "winner" BOOLEAN NOT NULL DEFAULT false,
    "claimedAt" TIMESTAMP(3),
    "claimBefore" TIMESTAMP(3),

    CONSTRAINT "RaffleTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Rewards_userId_key" ON "Rewards"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_code_key" ON "ReferralCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_userId_key" ON "ReferralCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GameCategory_name_key" ON "GameCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_name_key" ON "Developer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_fileId_key" ON "Game"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSubmission_gameFileId_key" ON "GameSubmission"("gameFileId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSubmission_thumbnailFileId_key" ON "GameSubmission"("thumbnailFileId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSubmission_coverFileId_key" ON "GameSubmission"("coverFileId");

-- CreateIndex
CREATE UNIQUE INDEX "RafflePrize_code_key" ON "RafflePrize"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredByUserId_fkey" FOREIGN KEY ("referredByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralCode" ADD CONSTRAINT "ReferralCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnGame" ADD CONSTRAINT "CategoriesOnGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnGame" ADD CONSTRAINT "CategoriesOnGame_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GameCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "GameFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_viewportId_fkey" FOREIGN KEY ("viewportId") REFERENCES "Viewport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmission" ADD CONSTRAINT "GameSubmission_gameFileId_fkey" FOREIGN KEY ("gameFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmission" ADD CONSTRAINT "GameSubmission_thumbnailFileId_fkey" FOREIGN KEY ("thumbnailFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmission" ADD CONSTRAINT "GameSubmission_coverFileId_fkey" FOREIGN KEY ("coverFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmission" ADD CONSTRAINT "GameSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSubmissionFeedback" ADD CONSTRAINT "GameSubmissionFeedback_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "GameSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RafflePrize" ADD CONSTRAINT "RafflePrize_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "PrizeSponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleTicket" ADD CONSTRAINT "RaffleTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleTicket" ADD CONSTRAINT "RaffleTicket_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "RafflePrize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
