import prisma from "../database/database";

export async function findByName (name:string) {
    return await prisma.keywords.findFirst({where:{name}})
}

export async function insert (name:string) {
    return await prisma.keywords.create({data:{name}})
}

export async function findOrphans () {
    return await prisma.keywords.findMany({
        where:{
            filesKeywords:{
                none:{}
            }
        },
        select:{
            id:true
        }
    })
}

export async function deleteByIds (idArray:number[]) {
    await prisma.keywords.deleteMany({
        where:{
            id:{
                in:idArray
            }
        }
    })
}