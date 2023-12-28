-- DropForeignKey
ALTER TABLE "GamePlay" DROP CONSTRAINT "GamePlay_userId_fkey";

-- AlterTable
ALTER TABLE "GamePlay" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GamePlay" ADD CONSTRAINT "GamePlay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
