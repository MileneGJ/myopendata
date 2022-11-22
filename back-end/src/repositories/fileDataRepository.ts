import prisma from "../database/database";
import { IFileDataInsertDB } from "../types/fileDataTypes";

export async function upload(file: IFileDataInsertDB) {
  return await prisma.fileData.create({ data: { ...file } });
}

export async function deleteOne(id: number) {
  await prisma.fileData.delete({ where: { id } });
}

export async function deleteByIds(idArray: number[]) {
  await prisma.fileData.deleteMany({
    where: {
      id: {
        in: idArray,
      },
    },
  });
}

export async function findOrphans() {
  return await prisma.fileData.findMany({
    where: {
      files: {
        none: {},
      },
    },
    select: {
      id: true,
    },
  });
}

export async function findOrphansByUserId(userId: number) {
  return await prisma.fileData.findMany({
    where: { userId },
    select: {
      id: true,
      url: true,
    },
  });
}

export async function findById(id: number) {
  return await prisma.fileData.findFirst({ where: { id } });
}

export async function findByUrl(url: string) {
  return await prisma.fileData.findFirst({ where: { url } });
}
