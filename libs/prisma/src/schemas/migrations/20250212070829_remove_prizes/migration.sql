/*
  Warnings:

  - You are about to drop the `Prize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prize" DROP CONSTRAINT "Prize_codeId_fkey";

-- DropForeignKey
ALTER TABLE "Prize" DROP CONSTRAINT "Prize_userId_fkey";

-- DropTable
DROP TABLE "Prize";

-- DropEnum
DROP TYPE "PrizeStatus";
