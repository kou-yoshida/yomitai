/*
  Warnings:

  - The values [COMPULETE] on the enum `ActionType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UpdatedLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `UpdatedLog` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActionType_new" AS ENUM ('CREATE', 'COMPLETE');
ALTER TABLE "UpdatedLog" ALTER COLUMN "actionType" TYPE "ActionType_new" USING ("actionType"::text::"ActionType_new");
ALTER TYPE "ActionType" RENAME TO "ActionType_old";
ALTER TYPE "ActionType_new" RENAME TO "ActionType";
DROP TYPE "ActionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UpdatedLog" DROP CONSTRAINT "UpdatedLog_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UpdatedLog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;
