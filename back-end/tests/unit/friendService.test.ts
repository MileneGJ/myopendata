import * as friendsRepository from '../../src/repositories/friendsRepository'
import * as friendService from '../../src/services/friendServices'
import * as userService from '../../src/services/authServices'
import idFactory from "../factories/idFactory";
import userFactory from '../factories/userFactory';

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

describe('Testing GetUserNameById function',()=>{

    it('Returns user name from query string id if it is provided',async()=>{
        const user = await userFactory()
        const createdUser = {...user,id:1,createdAt:new Date}
        const paramId = await idFactory()
        const userId = await idFactory()
        jest.spyOn(userService,'verifyIdExists').mockImplementationOnce(():any=>createdUser)

        const result = friendService.getUserNameById(paramId,userId)

        await expect(result).resolves.toEqual(user.name)
        expect(userService.verifyIdExists).toBeCalledTimes(1)
    })

    it('Returns user name from id of token session when no query string is provided',async()=>{
        const user = await userFactory()
        const createdUser = {...user,id:1,createdAt:new Date}
        const paramId = NaN
        const userId = await idFactory()
        jest.spyOn(userService,'verifyIdExists').mockImplementationOnce(():any=>createdUser)

        const result = friendService.getUserNameById(paramId,userId)

        await expect(result).resolves.toEqual(user.name)
        expect(userService.verifyIdExists).toBeCalledTimes(1)
    })

})