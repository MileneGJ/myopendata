import prisma from "../database/database";
import { IFileDataInsertDB } from "../types/fileDataTypes";


export async function upload(file:IFileDataInsertDB) {
    return await prisma.fileData.create({data:{...file}})
}