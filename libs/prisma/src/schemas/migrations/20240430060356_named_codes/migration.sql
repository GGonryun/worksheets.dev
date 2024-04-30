/*
  Warnings:

  - Added the required column `name` to the `ActivationCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceUrl` to the `ActivationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivationCode" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sourceUrl" TEXT NOT NULL;
