import userFactory from '../factories/userFactory';
import * as userService from '../../src/services/authServices'
import * as userRepository from '../../src/repositories/userRepository'
import invalidUserFactory from '../factories/invalidUserFactory';

beforeEach(()=>{
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe('Testing create function',()=>{


    it('Returns created user when email and password are valid',async()=>{
        const user = await userFactory()
        const createdUser = {...user,id:1,createdAt:new Date}
        jest.spyOn(userRepository, 'insert').mockImplementationOnce(():any=>createdUser)
        jest.spyOn(userRepository, 'findByEmail').mockImplementationOnce(():any=>{null})

        const result = userService.create(user)

        await expect(result).resolves.toEqual(createdUser)
        expect(userRepository.findByEmail).toBeCalled()
        expect(userRepository.insert).toBeCalled()
    })

    it('Returns status 409 when email already exists in database',async()=>{
        const user = await userFactory()
        const expectedError = { type: 'conflict', message: "Email already in use" }
        jest.spyOn(userRepository, 'insert').mockImplementationOnce(():any=>{null})
        jest.spyOn(userRepository, 'findByEmail').mockImplementationOnce(():any=>({...user,id:1,createdAt:new Date}))

        const result = userService.create(user)

        await expect(result).rejects.toEqual(expectedError)
        expect(userRepository.findByEmail).toBeCalled()
        expect(userRepository.insert).not.toBeCalled()
    })

    it('Returns status 422 when password is not valid',async()=>{
        const user = await invalidUserFactory()
        const expectedError = { type: 'wrong_schema', message: "Password must include numbers and letters in lower and upper case" }
        jest.spyOn(userRepository, 'insert').mockImplementationOnce(():any=>{null})
        jest.spyOn(userRepository, 'findByEmail').mockImplementationOnce(():any=>{null})

        const result = userService.create(user)

        await expect(result).rejects.toEqual(expectedError)
        expect(userRepository.findByEmail).not.toBeCalled()
        expect(userRepository.insert).not.toBeCalled()
    })
})