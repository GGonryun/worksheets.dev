-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('BROKEN', 'DEFAMATORY', 'HARMFUL', 'LEGAL', 'FRAUD', 'INAPPROPRIATE', 'OTHER');

-- CreateTable
CREATE TABLE "GameReport" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT,
    "reason" "ReportReason" NOT NULL DEFAULT 'OTHER',
    "text" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameReport" ADD CONSTRAINT "GameReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
