/*
  Warnings:

  - Added the required column `userId` to the `FileData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileData" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FileData" ADD CONSTRAINT "FileData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
