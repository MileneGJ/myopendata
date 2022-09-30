import prisma from "../../src/database/database";
import bcrypt from 'bcrypt'
import userFactory from "./userFactory";

export async function deleteAllData() {
    await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE;`
}
  
export async function disconnectPrisma() {
    await prisma.$disconnect();
  }

  export async function createScenarioSignUpOneUser() {
      const user = await userFactory()
      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
      const password = await bcrypt.hash(user.password,salt)
      const createdUser = await prisma.users.create({data:{name:user.name,email:user.email,password}})
      return {...createdUser,password:user.password}
  }