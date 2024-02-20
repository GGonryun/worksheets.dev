-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "NotificationPreferences" ADD COLUMN     "newsletter" BOOLEAN NOT NULL DEFAULT true;
