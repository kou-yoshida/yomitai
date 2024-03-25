/*
  Warnings:

  - The values [TODO] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('SUSPENDED', 'COMPLETED');
ALTER TABLE "Todo" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- CreateTable
CREATE TABLE "TodoTag" (
    "todoId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TodoTag_pkey" PRIMARY KEY ("todoId","tagId")
);

-- CreateIndex
CREATE INDEX "TodoTag_todoId_idx" ON "TodoTag"("todoId");

-- CreateIndex
CREATE INDEX "TodoTag_tagId_idx" ON "TodoTag"("tagId");

-- AddForeignKey
ALTER TABLE "TodoTag" ADD CONSTRAINT "TodoTag_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoTag" ADD CONSTRAINT "TodoTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
