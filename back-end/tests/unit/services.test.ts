import userFactory from '../factories/userFactory';
import * as userService from '../../src/services/authServices'
import * as userRepository from '../../src/repositories/userRepository'
import invalidUserFactory from '../factories/invalidUserFactory';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

beforeEach(()=>{
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe('Testing create function',()=>{


    it('Returns created user when email and password are valid',async()=>{
        //for all the it's
        jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => 'SALT')
        jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'HASHED_PASSWORD')

        const user = await userFactory()
        const createdUser = {...user,id:1,createdAt:new Date, password:'HASHED_PASSWORD'}
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

describe('Testing authenticate function', ()=>{

    it('Returns token when email and password are correct',async()=>{
        //for all it's
        const token = 'USER_SPECIFIC_TOKEN'
        jest.spyOn(jwt,'sign').mockImplementation(()=>token)

        const user = await userFactory()
        jest.spyOn(bcrypt,'compare').mockImplementationOnce(()=>true)
        jest.spyOn(userRepository,'findByEmail').mockImplementationOnce(():any=>user)

        const result = userService.authenticate({email:user.email,password:user.password})

        await expect(result).resolves.toEqual(token)
        expect(jwt.sign).toBeCalled()
    })

    it('Returns 401 when user is not found',async()=>{
        const user = await userFactory()
        const expectedError = { type: 'unauthorized', message: 'Incorrect email or password' }
        jest.spyOn(bcrypt,'compare').mockImplementationOnce(()=>false)
        jest.spyOn(userRepository,'findByEmail').mockImplementationOnce(():any=>{})

        const result = userService.authenticate({email:user.email,password:user.password})

        await expect(result).rejects.toEqual(expectedError)
        expect(jwt.sign).not.toBeCalled()
    })

    it('Returns 401 when password is incorrect',async()=>{
        const user = await userFactory()
        const expectedError = { type: 'unauthorized', message: 'Incorrect email or password' }
        jest.spyOn(bcrypt,'compare').mockImplementationOnce(()=>false)
        jest.spyOn(userRepository,'findByEmail').mockImplementationOnce(():any=>user)

        const result = userService.authenticate({email:user.email,password:user.password+'x'})

        await expect(result).rejects.toEqual(expectedError)
        expect(jwt.sign).not.toBeCalled()
    })
})