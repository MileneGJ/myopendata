/*
  Warnings:

  - You are about to drop the column `fileId` on the `FileData` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FileData" DROP CONSTRAINT "FileData_fileId_fkey";

-- AlterTable
ALTER TABLE "FileData" DROP COLUMN "fileId";

-- CreateTable
CREATE TABLE "FilesFileData" (
    "id" SERIAL NOT NULL,
    "fileId" INTEGER NOT NULL,
    "dataId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilesFileData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FilesFileData_dataId_key" ON "FilesFileData"("dataId");

-- AddForeignKey
ALTER TABLE "FilesFileData" ADD CONSTRAINT "FilesFileData_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilesFileData" ADD CONSTRAINT "FilesFileData_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "FileData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
