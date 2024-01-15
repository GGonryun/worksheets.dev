/*
  Warnings:

  - You are about to alter the column `username` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(63)`.

*/
-- AlterTable
ALTER TABLE "GameSubmission" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::VARCHAR(63)[];

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "username" SET DATA TYPE VARCHAR(63);
