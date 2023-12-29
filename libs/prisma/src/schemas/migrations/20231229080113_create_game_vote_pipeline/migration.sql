-- CreateTable
CREATE TABLE "GameVoteSubmission" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT NOT NULL,
    "up" BOOLEAN NOT NULL,

    CONSTRAINT "GameVoteSubmission_pkey" PRIMARY KEY ("id")
);
