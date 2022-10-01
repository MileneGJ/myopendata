import prisma from "../database/database";

export async function findByName (name:string) {
    return await prisma.keywords.findFirst({where:{name}})
}

export async function insert (name:string) {
    return await prisma.keywords.create({data:{name}})
}