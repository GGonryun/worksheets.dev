/*
  Warnings:

  - You are about to drop the `Friendship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameSubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameSubmissionFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduledEmail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VipMembershipWaitlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_friendId_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_userId_fkey";

-- DropForeignKey
ALTER TABLE "GameSubmission" DROP CONSTRAINT "GameSubmission_coverFileId_fkey";

-- DropForeignKey
ALTER TABLE "GameSubmission" DROP CONSTRAINT "GameSubmission_gameFileId_fkey";

-- DropForeignKey
ALTER TABLE "GameSubmission" DROP CONSTRAINT "GameSubmission_thumbnailFileId_fkey";

-- DropForeignKey
ALTER TABLE "GameSubmission" DROP CONSTRAINT "GameSubmission_userId_fkey";

-- DropForeignKey
ALTER TABLE "GameSubmissionFeedback" DROP CONSTRAINT "GameSubmissionFeedback_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "VipMembershipWaitlist" DROP CONSTRAINT "VipMembershipWaitlist_userId_fkey";

-- DropTable
DROP TABLE "Friendship";

-- DropTable
DROP TABLE "GameSubmission";

-- DropTable
DROP TABLE "GameSubmissionFeedback";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "ScheduledEmail";

-- DropTable
DROP TABLE "VipMembershipWaitlist";

-- DropEnum
DROP TYPE "GameSubmissionStatus";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "ScheduledEmailStatus";
