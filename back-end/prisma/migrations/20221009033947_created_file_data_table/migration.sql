/*
  Warnings:

  - You are about to drop the column `csvlink` on the `Files` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Files_csvlink_key";

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "csvlink";

-- CreateTable
CREATE TABLE "FileData" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileData_key_key" ON "FileData"("key");

-- CreateIndex
CREATE UNIQUE INDEX "FileData_url_key" ON "FileData"("url");

-- AddForeignKey
ALTER TABLE "FileData" ADD CONSTRAINT "FileData_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
