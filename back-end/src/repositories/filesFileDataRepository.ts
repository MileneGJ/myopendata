import prisma from "../database/database";


export async function createLink(dataId:number, fileId:number) {
    await prisma.filesFileData.create({data:{fileId,dataId}})
}

export async function findByDataId(dataId:number) {
    return await prisma.filesFileData.findFirst({where:{dataId}})
}

export async function findByFileId(fileId:number) {
    return await prisma.filesFileData.findMany({where:{fileId}})
}

export async function findByUserId(userId:number) {
    return await prisma.filesFileData.findMany({
        where:{
            files:{
                userId
            }
        }
    })
}

export async function deleteByDataId(dataId:number) {
    await prisma.filesFileData.delete({where:{dataId}})
}

export async function deleteByFileId(fileId:number) {
    await prisma.filesFileData.deleteMany({where:{fileId}})
}

export async function deleteByFileByUser(userId:number) {
    await prisma.filesFileData.deleteMany({
        where:{
            files:{
                userId
            }
        }
    })
}