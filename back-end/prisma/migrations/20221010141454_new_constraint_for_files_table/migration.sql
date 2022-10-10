/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Files` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Files_userId_title_key" ON "Files"("userId", "title");
