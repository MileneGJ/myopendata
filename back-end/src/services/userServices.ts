import * as userRepository from '../repositories/userRepository'
import * as fileService from '../services/fileServices'
import * as friendService from '../services/friendServices'
import { IUserDB } from '../types/userTypes'
import { notFoundError } from '../utils/errorUtils'

export async function verifyIdExists (id:number):Promise<IUserDB> {
    const foundUser = await userRepository.findById(id)
    if(!foundUser){
        throw notFoundError('No users were found with this id')
    }
    return foundUser
}

export async function getUserNameById (ParamUserId:number,TokenUserId:number) {
    if(ParamUserId){
        const user = await verifyIdExists(ParamUserId)
        return user.name
    } else {
        const user = await verifyIdExists(TokenUserId)
        return user.name
    }
}

export async function deleteUserById(userId:number) {
    await verifyIdExists(userId)
    await fileService.deleteFilesFromUserId(userId)
    await friendService.deleteFriendLinkFromUser(userId)
    await userRepository.deleteOne(userId)
}