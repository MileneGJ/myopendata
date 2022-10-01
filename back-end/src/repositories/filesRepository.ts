import prisma from "../database/database";
import { TFileInsertDB } from "../types/fileTypes";

export async function insert (file:TFileInsertDB) {
   return await prisma.files.create({data:file})
}

export async function findByLink (csvlink: string) {
    return await prisma.files.findFirst({where:{csvlink}})
}