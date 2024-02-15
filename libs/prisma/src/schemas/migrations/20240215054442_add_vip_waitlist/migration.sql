-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- CreateTable
CREATE TABLE "VipMembershipWaitlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VipMembershipWaitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VipMembershipWaitlist_userId_key" ON "VipMembershipWaitlist"("userId");

-- AddForeignKey
ALTER TABLE "VipMembershipWaitlist" ADD CONSTRAINT "VipMembershipWaitlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
