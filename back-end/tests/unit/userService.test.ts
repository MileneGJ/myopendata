import userFactory from '../factories/userFactory';
import * as userService from '../../src/services/userServices'
import * as fileService from '../../src/services/fileServices'
import * as friendService from '../../src/services/friendServices'
import * as userRepository from '../../src/repositories/userRepository'
import idFactory from '../factories/idFactory';

beforeEach(()=>{
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe('Testing GetUserNameById function',()=>{

    it('Returns user name from query string id if it is provided',async()=>{
        const id = await idFactory()
        const user = await userFactory()
        const foundUser = {
            id,
            name:user.name,
            email:user.email,
            password:user.password
        }
        const paramId = await idFactory()
        const userId = await idFactory()
        jest.spyOn(userRepository,'findById').mockImplementationOnce(():any=>foundUser)

        const result = userService.getUserNameById(paramId,userId)

        await expect(result).resolves.toEqual(user.name)
        expect(userRepository.findById).toBeCalledTimes(1)
    })

    it('Returns user name from id of token session when no query string is provided',async()=>{
        const id = await idFactory()
        const user = await userFactory()
        const foundUser = {
            id,
            name:user.name,
            email:user.email,
            password:user.password
        }
        const paramId = NaN
        const userId = await idFactory()
        jest.spyOn(userRepository,'findById').mockImplementationOnce(():any=>foundUser)

        const result = userService.getUserNameById(paramId,userId)

        await expect(result).resolves.toEqual(user.name)
        expect(userRepository.findById).toBeCalledTimes(1)
    })

    it('Returns 404 when user id provided is not found',async()=>{
        const expectedError =  {type:'not_found', message: 'No users were found with this id'}
        const paramId = await idFactory()
        const userId = await idFactory()
        jest.spyOn(userRepository,'findById').mockImplementationOnce(():any=>{})

        const result = userService.getUserNameById(paramId,userId)

        await expect(result).rejects.toEqual(expectedError)
        expect(userRepository.findById).toBeCalledTimes(1)
    })

})

describe('Testing deleteUserById function',()=>{

    it('Deletes user successfully when id is found',async()=>{
        const id = await idFactory()

        jest.spyOn(fileService,'deleteFilesFromUserId').mockImplementation(():any=>{})
        jest.spyOn(friendService,'deleteFriendLinkFromUser').mockImplementation(():any=>{})
        jest.spyOn(userRepository,'deleteOne').mockImplementation(():any=>{})

        jest.spyOn(userRepository,'findById').mockImplementationOnce(():any=>true)

        const result = userService.deleteUserById(id)

        await expect(result).resolves.toBeFalsy()
        expect(userRepository.deleteOne).toBeCalled()
    })

    it('Returns 404 when user id is not found',async()=>{
        const id = await idFactory()
        const expectedError = {type:'not_found', message: 'No users were found with this id'}

        jest.spyOn(userRepository,'findById').mockImplementationOnce(():any=>false)

        const result = userService.deleteUserById(id)

        await expect(result).rejects.toEqual(expectedError)
        expect(userRepository.deleteOne).not.toBeCalled()
    })

})