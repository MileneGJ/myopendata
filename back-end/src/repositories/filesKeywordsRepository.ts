import prisma from "../database/database";

export async function findByIds (fileId:number, keywordId:number) {
    return await prisma.filesKeywords.findFirst({where:{fileId,keywordId}})
}

export async function insert (fileId:number, keywordId:number) {
    return await prisma.filesKeywords.create({data:{fileId,keywordId}})
}