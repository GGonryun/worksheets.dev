-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "trailer" TEXT;

-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];
