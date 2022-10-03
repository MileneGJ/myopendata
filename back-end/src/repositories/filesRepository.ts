import prisma from "../database/database";
import { TFileInsertDB } from "../types/fileTypes";

export async function insert(file: TFileInsertDB) {
    return await prisma.files.create({ data: file })
}

export async function findByLink(csvlink: string) {
    return await prisma.files.findFirst({ where: { csvlink } })
}

export async function findByUser(user: string) {
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

export async function findByKeyword(keyword: string) {
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

export async function findByTitle(title: string) {
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

export async function findAll() {
    return await prisma.files.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    })
}