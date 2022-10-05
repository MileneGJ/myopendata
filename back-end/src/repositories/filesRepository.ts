import prisma from "../database/database";
import { IFileDB, TFileInsertDB } from "../types/fileTypes";
import { IKeywordReturnDB } from "../types/keywordTypes";

export async function insert(file: TFileInsertDB) {
    return await prisma.files.create({ data: file })
}

export async function findByLink(csvlink: string):Promise<IFileDB> {
    const files = await prisma.files.findFirst({ where: { csvlink } })
    return files as IFileDB
}

export async function findByUser(user: string):Promise<IFileDB[]> {
    return await prisma.files.findMany({
        where: {
            users: {
                is: {
                    name: {
                        contains: user
                    }
                }
            }
        },
        orderBy: {
            users: {
                name: 'asc'
            }
        }
    })
}

export async function findByKeyword(keyword: string):Promise<IKeywordReturnDB[]>  {
    return await prisma.keywords.findMany({
        where: {
            name: {
                contains: keyword
            }
        },
        select: {
            filesKeywords: {
                select: {
                    files: true
                }
            }
        },
        orderBy: {
            name: 'asc'
        }
    })
}

export async function findByTitle(title: string):Promise<IFileDB[]>  {
    return await prisma.files.findMany({
        where: {
            title: {
                contains: title
            }
        },
        orderBy:{
            title: 'asc'
        }
    })
}

export async function findAll():Promise<IFileDB[]>  {
    return await prisma.files.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    })
}

export async function findById(id:number):Promise<IFileDB>  {
    const file = await prisma.files.findFirst({where:{id}})
    return file as IFileDB
}