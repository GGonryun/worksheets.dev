-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::VARCHAR(63)[];
