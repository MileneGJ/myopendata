import prisma from "../database/database";
import { TUserInsertDB } from "../types/userTypes";

export async function insert (user:TUserInsertDB) {
    const newUser = await prisma.users.create({data:user})
    return newUser
}

export async function findByEmail (email:string) {
    const foundUser = await prisma.users.findFirst({where:{email}})
    return foundUser
}

export async function findById (id:number) {
    const foundUser = await prisma.users.findFirst({where:{id}})
    return foundUser
}

export async function deleteOne (id:number) {
    await prisma.users.delete({where:{id}})
}