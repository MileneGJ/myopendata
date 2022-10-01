import prisma from "../../src/database/database";
import userFactory from "./userFactory";
import { encryptPassword, generateToken } from "../../src/services/authServices";
import fileFactory from "./fileFactory";

export async function deleteAllData() {
    await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE;`
}

export async function disconnectPrisma() {
    await prisma.$disconnect();
}

export async function createScenarioSignUpOneUser() {
    const user = await userFactory()
    const password = await encryptPassword(user.password)
    const createdUser = await prisma.users.create({ data: { name: user.name, email: user.email, password } })
    return { ...createdUser, password: user.password }
}

export async function createScenarioSignInOneUser() {
    const user = await createScenarioSignUpOneUser()
    return generateToken(user.id)
}

export async function createScenarioSignInDeletedUser() {
    const user = await createScenarioSignUpOneUser()
    const token = generateToken(user.id)
    await prisma.users.delete({where:{id:user.id}})
    return token
}

export async function createScenarioOneUserOneFile() {
    const user = await createScenarioSignUpOneUser()
    const file = await fileFactory()
    await prisma.files.create({data:{
        title: file.title,
        description: file.description,
        csvlink: file.csvlink,
        userId: user.id
    }})
    return {token:generateToken(user.id),file}
}