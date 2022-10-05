import prisma from "../../src/database/database";
import userFactory from "./userFactory";
import { encryptPassword, generateToken } from "../../src/services/authServices";
import fileFactory from "./fileFactory";
import wordFactory from "./wordFactory";

export async function deleteAllData() {
    await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Files" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Keywords" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "FilesKeywords" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Friends" RESTART IDENTITY CASCADE;`
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
    return {token:generateToken(user.id),userId:user.id}
}

export async function createScenarioSignInDeletedUser() {
    const user = await createScenarioSignUpOneUser()
    const token = generateToken(user.id)
    await prisma.users.delete({ where: { id: user.id } })
    return {token,userId:user.id}
}

export async function createScenarioOneUserOneFile() {
    const user = await createScenarioSignUpOneUser()
    const file = await fileFactory()
    await prisma.files.create({
        data: {
            title: file.title,
            description: file.description,
            csvlink: file.csvlink,
            userId: user.id
        }
    })
    return { token: generateToken(user.id), file }
}

export async function createScenarioTwoUsersFourFiles() {
    let id = 0
    let name = ''
    for (let i = 0; i < 2; i++) {
        const user = await createScenarioSignUpOneUser()
        name = user.name
        id = user.id
        for (let j = 0; j < 2; j++) {
            const file = await fileFactory()
            await prisma.files.create({
                data: {
                    title: file.title,
                    description: file.description,
                    csvlink: file.csvlink,
                    userId: user.id
                }
            })

        }
    }
    return { token: generateToken(id), name }
}

export async function createScenarioFourFiles(){
    const user = await createScenarioSignUpOneUser()
    let keyName = ''
    let title = ''
    for (let i=0; i<4; i++) {
        const file = await fileFactory()
        const createdFile = await prisma.files.create({
            data: {
                title: file.title,
                description: file.description,
                csvlink: file.csvlink,
                userId: user.id
            }
        })
        title = file.title
        const keyword = await wordFactory()
        keyName = keyword
        const createdKey = await prisma.keywords.create({data:{name:keyword}})
        await prisma.filesKeywords.create({data:{ fileId:createdFile.id, keywordId:createdKey.id}})
    }
    return { token: generateToken(user.id), keyName, title }
}

export async function createScenarioTwoUsers () {
    const friend = await createScenarioSignUpOneUser()
    const user = await createScenarioSignUpOneUser()
    return { token: generateToken(user.id), userId:user.id, friendId:friend.id}
}

export async function createScenarioTwoUsersOneDeleted () {
    const friend = await createScenarioSignUpOneUser()
    const user = await createScenarioSignUpOneUser()
    const token = generateToken(user.id)
    await prisma.users.delete({where:{id:user.id}})
    return { token, userId:user.id, friendId:friend.id}
}

export async function createScenarioOneFile(){
    const user = await createScenarioSignUpOneUser()
    const file = await fileFactory()
    const createdFile = await prisma.files.create({
        data: {
            title: file.title,
            description: file.description,
            csvlink: file.csvlink,
            userId: user.id
        }
    })
    return {token:generateToken(user.id),file:createdFile}
}

export async function createScenarioUserWithFileLinksAndFriends () {
    const user = await createScenarioSignUpOneUser()
    const file = await fileFactory()
    const createdFile = await prisma.files.create({
        data: {
            title: file.title,
            description: file.description,
            csvlink: file.csvlink,
            userId: user.id
        }
    })
    let keywordIds = []
    let linkKeywordIds = []
    
    for(let i=0; i<file.keywords.length; i++) {
        const createdKeyword = await prisma.keywords.create({
            data:{name:file.keywords[i]}
        })
        keywordIds.push(createdKeyword.id)
        const linkFileKey = await prisma.filesKeywords.create({
            data:{fileId:createdFile.id,keywordId:createdKeyword.id}
        })
        linkKeywordIds.push(linkFileKey.id)
    }

    const friend = await createScenarioSignUpOneUser()
    await prisma.friends.create({data:{user1Id:user.id,user2Id:friend.id}})

    return {
        token:generateToken(user.id),
        userId:user.id,
        fileId: createdFile.id,
        keywordIds,
        linkKeywordIds,
        friendId:friend.id
    }
}