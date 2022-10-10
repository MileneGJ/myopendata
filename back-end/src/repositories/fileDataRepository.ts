import prisma from "../database/database";
import { IFileDataInsertDB } from "../types/fileDataTypes";


export async function upload(file:IFileDataInsertDB) {
    return await prisma.fileData.create({data:{...file}})
}

export async function deleteOne(id:number) {
    await prisma.fileData.delete({where:{id}})
}

export async function deleteFromFile(fileId:number) {
    await prisma.fileData.deleteMany({where:{fileId}})
}

export async function deleteFromFileFromUser(userId:number) {
    await prisma.fileData.deleteMany({
        where:{
            files:{
                userId
            }
    }})
}

export async function findById(id:number) {
    return await prisma.fileData.findFirst({where:{id}})
}

export async function findByUrl(url:string) {
    return await prisma.fileData.findMany({where:{url}})
}