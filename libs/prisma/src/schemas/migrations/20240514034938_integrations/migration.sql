-- CreateEnum
CREATE TYPE "IntegrationProvider" AS ENUM ('TWITCH', 'TWITTER', 'DISCORD', 'STEAM');

-- CreateEnum
CREATE TYPE "IntegrationError" AS ENUM ('ACCESS_DENIED', 'INVALID_REFRESH_TOKEN', 'REDIRECT_MISMATCH', 'UNAUTHORIZED_CLIENT', 'UNSUPPORTED_RESPONSE_TYPE', 'INVALID_SCOPE', 'SERVER_ERROR', 'TEMPORARILY_UNAVAILABLE', 'INVALID_REQUEST', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "IntegrationStatus" AS ENUM ('PENDING', 'AUTHORIZED', 'ERROR');

-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('OAUTH', 'API_KEY');

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorizedAt" TIMESTAMP(3),
    "type" "IntegrationType" NOT NULL,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'PENDING',
    "error" "IntegrationError",
    "userId" TEXT NOT NULL,
    "provider" "IntegrationProvider" NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "challenge" TEXT,
    "expiresAt" TIMESTAMP(3),
    "scopes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "identity" JSONB,
    "data" JSONB,
    "tokenType" TEXT NOT NULL DEFAULT 'bearer',

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Integration_userId_provider_key" ON "Integration"("userId", "provider");

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
