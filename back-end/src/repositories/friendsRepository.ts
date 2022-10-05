import prisma from "../database/database";

export async function insert(user1Id: number, user2Id: number) {
    return await prisma.friends.create({ data: { user1Id, user2Id } })
}

export async function findByUserIds(user1Id: number, user2Id: number) {
    return await prisma.friends.findFirst({ where: { user1Id, user2Id } })
}

export async function deleteAllFriendsFromUser(user1Id: number) {
    await prisma.friends.deleteMany({
        where: {
            user1Id
        }
    })
}

export async function deleteOneFriendFromUser(user1Id: number, user2Id: number) {
    await prisma.friends.deleteMany({
        where: {
            AND: [
                { user1Id },
                { user2Id }
            ]
        }
    })
}