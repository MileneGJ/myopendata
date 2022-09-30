import prisma from "../../src/database/database";

export async function deleteAllData() {
    await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE;`
}
  
export async function disconnectPrisma() {
    await prisma.$disconnect();
  }