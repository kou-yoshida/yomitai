/*
  Warnings:

  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('FOLLOW', 'TODO');

-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'DELETED';

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "content" DROP NOT NULL;

-- DropTable
DROP TABLE "Follow";

-- CreateTable
CREATE TABLE "FollowFollowed" (
    "followUserId" TEXT NOT NULL,
    "followedUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowFollowed_pkey" PRIMARY KEY ("followedUserId","followUserId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),
    "type" "NotificationType" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FollowFollowed_followedUserId_idx" ON "FollowFollowed"("followedUserId");

-- CreateIndex
CREATE INDEX "FollowFollowed_followUserId_idx" ON "FollowFollowed"("followUserId");

-- AddForeignKey
ALTER TABLE "FollowFollowed" ADD CONSTRAINT "FollowFollowed_followUserId_fkey" FOREIGN KEY ("followUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowFollowed" ADD CONSTRAINT "FollowFollowed_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
