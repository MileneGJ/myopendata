import * as friendsRepository from '../repositories/friendsRepository'
import * as userService from '../services/userServices'
import { conflictError } from '../utils/errorUtils'

export async function addNewFriend (friendId:number, userId:number) {
    await userService.verifyIdExists(userId)
    await userService.verifyIdExists(friendId)
    await verifyFriendLink(friendId,userId)
    return await friendsRepository.insert(userId, friendId)
}

async function verifyFriendLink (friendId:number, userId:number) {
    const friendLink = await friendsRepository.findByUserIds(userId,friendId)
    if(friendLink) {
        throw conflictError('This user was already added as a friend')
    }
}

export async function deleteFriendLinkFromUser(userId:number) {
    await friendsRepository.deleteAllFriendsFromUser(userId)
}