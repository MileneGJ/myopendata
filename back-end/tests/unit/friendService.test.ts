import * as friendsRepository from '../../src/repositories/friendsRepository'
import * as friendService from '../../src/services/friendServices'
import * as userService from '../../src/services/userServices'
import idFactory from "../factories/idFactory";

beforeEach(()=>{
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe('Testing addNewFriend function',()=>{

    it('Returns created link of friends when ids exist and are not linked yet',async()=>{
        const friendId = await idFactory()
        const userId = await idFactory()
        const createdFriendLink = {id:1,userId,friendId, createdAt:new Date}

        jest.spyOn(userService,'verifyIdExists').mockImplementation(():any=>true)
        jest.spyOn(friendsRepository,'insert').mockImplementation(():any=>createdFriendLink)

        jest.spyOn(friendsRepository,'findByUserIds').mockImplementationOnce(():any=>{})

        const result = friendService.addNewFriend(friendId, userId)

        await expect(result).resolves.toEqual(createdFriendLink)
        expect(friendsRepository.insert).toBeCalled()
    })

    it('Returns 409 when friend link already exists',async()=>{
        const friendId = await idFactory()
        const userId = await idFactory()
        const createdFriendLink = {id:1,userId,friendId, createdAt:new Date}
        const expectedError = {type: 'conflict', message: 'This user was already added as a friend'}

        jest.spyOn(friendsRepository,'findByUserIds').mockImplementationOnce(():any=>createdFriendLink)

        const result = friendService.addNewFriend(friendId, userId)

        await expect(result).rejects.toEqual(expectedError)
        expect(friendsRepository.insert).not.toBeCalled()
    })

})