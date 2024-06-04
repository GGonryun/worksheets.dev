-- CreateTable
CREATE TABLE "ReferralAction" (
    "id" SERIAL NOT NULL,
    "raffleId" INTEGER NOT NULL,
    "referredId" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,

    CONSTRAINT "ReferralAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralAction_raffleId_referredId_key" ON "ReferralAction"("raffleId", "referredId");

-- AddForeignKey
ALTER TABLE "ReferralAction" ADD CONSTRAINT "ReferralAction_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralAction" ADD CONSTRAINT "ReferralAction_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralAction" ADD CONSTRAINT "ReferralAction_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
