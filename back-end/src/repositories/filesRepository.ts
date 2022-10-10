import prisma from "../database/database";
import { IFileDB, IFileReturnDB, TFileInsertDB } from "../types/fileTypes";

export async function insert(file: TFileInsertDB) {
    return await prisma.files.create({ data: file })
}

export async function deleteOne (id:number) {
    await prisma.files.delete({where:{id}})
}

export async function deleteFromUserId(userId:number) {
    await prisma.files.deleteMany({where:{userId}})
}

export async function findByTitleAndUser(title: string, userId:number): Promise<IFileDB> {
    const files = await prisma.files.findFirst({ 
        where: { 
            AND:[
                {title},
                {userId}
            ]
         }})
    return files as IFileDB
}

export async function findByUser(user: string): Promise<IFileReturnDB[]> {
    return await prisma.files.findMany({
        where: {
            users: {
                is: {
                    name: {
                        contains: user,
                        mode: 'insensitive'
                    }
                }
            }
        },
        select: {
            id: true,
            title: true,
            description: true,
            csvlink: {
                select:{
                    filedata:{
                        select:{
                            name:true,
                            url:true
                        }
                    }
                }
            },
            users: {
                select: {
                    name: true
                }
            },
            filesKeywords:{
                select:{
                    keywords:{
                        select:{
                            name:true
                        }
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

export async function findByKeyword(keyword: string): Promise<IFileReturnDB[]> {
    const keywordOutput = await prisma.keywords.findMany({
        where: {
            name: {
                contains: keyword,
                mode: 'insensitive'
            }
        },
        select: {
            filesKeywords: {
                select: {
                    files: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            csvlink: {
                                select:{
                                    filedata:{
                                        select:{
                                            name:true,
                                            url:true
                                        }
                                    }
                                }
                            },
                            users: {
                                select: {
                                    name: true
                                }
                            },
                            filesKeywords:{
                                select:{
                                    keywords:{
                                        select:{
                                            name:true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            name: 'asc'
        }
    })
    return keywordOutput?.map(k=>k?.filesKeywords[0].files)
}

export async function findByTitle(title: string): Promise<IFileReturnDB[]> {
    return await prisma.files.findMany({
        where: {
            title: {
                contains: title,
                mode: 'insensitive'
            }
        },
        select:{
            id:true,
            title:true,
            description:true,
            csvlink:{
                select:{
                    filedata:{
                        select:{
                            name:true,
                            url:true
                        }
                    }
                }
            },
            users:{
                select:{
                    name:true
                }
            },
            filesKeywords:{
                select:{
                    keywords:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        },
        orderBy: {
            title: 'asc'
        }
    })
}

export async function findAll(): Promise<IFileReturnDB[]> {
    return await prisma.files.findMany({
        select:{
            id:true,
            title:true,
            description:true,
            csvlink:{
                select:{
                    filedata:{
                        select:{
                            name:true,
                            url:true
                        }
                    }
                }
            },
            users:{
                select:{
                    name:true
                }
            },
            filesKeywords:{
                select:{
                    keywords:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function findById(id: number): Promise<IFileReturnDB> {
    const file = await prisma.files.findFirst({ 
        where: { id },
        select:{
            id:true,
            title:true,
            description:true,
            csvlink:{
                select:{
                    filedata:{
                        select:{
                            name:true,
                            url:true
                        }
                    }
                }
            },
            users:{
                select:{
                    name:true
                }
            },
            filesKeywords:{
                select:{
                    keywords:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })
    return file as IFileReturnDB
}

export async function findByIdAndUserId (id:number, userId:number) {
    return await prisma.files.findFirst({where:{AND:[{id},{userId}]}})
}