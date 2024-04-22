/*
  Warnings:

  - You are about to drop the `Gift` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gift" DROP CONSTRAINT "Gift_friendshipId_fkey";

-- DropTable
DROP TABLE "Gift";
