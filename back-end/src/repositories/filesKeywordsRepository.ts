import prisma from "../database/database";

export async function findByIds (fileId:number, keywordId:number) {
    return await prisma.filesKeywords.findFirst({where:{fileId,keywordId}})
}

export async function insert (fileId:number, keywordId:number) {
    return await prisma.filesKeywords.create({data:{fileId,keywordId}})
}

export async function deleteFromFileFromUser(userId:number) {
    await prisma.filesKeywords.deleteMany({
        where:{
            files:{
                userId
            }
        }
    })    
}

export async function deleteFromFile(fileId:number) {
    await prisma.filesKeywords.deleteMany({where:{fileId}})
}