import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/database";
import invalidUserFactory from "../factories/invalidUserFactory";
import { 
    createScenarioSignInDeletedUser,
    createScenarioSignInOneUser,
    createScenarioSignUpOneUser, 
    createScenarioTwoUsers, 
    deleteAllData, 
    disconnectPrisma 
} from "../factories/scenarioFactory";
import userFactory from "../factories/userFactory";
import {IUserDB} from '../../src/types/userTypes'

beforeEach(async()=>{
    await deleteAllData()
})

afterAll(async()=>{
    await disconnectPrisma()
})

describe('Testing POST/signup',()=>{

    it('Returns 201 and created user when email and password are valid',async()=>{
        const user = await userFactory()

        const result = await supertest(app).post('/signup').send(user)

        const foundUser = await prisma.users.findFirst({where:{email:user.email}}) as IUserDB

        expect(result.status).toBe(201)
        expect(foundUser).not.toBeFalsy()
        expect(result.body.id).toEqual(foundUser.id)
    })

    it('Returns 409 when email already exists in database',async()=>{
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const result = await supertest(app).post('/signup').send(user)

        const foundUser = await prisma.users.findMany({where:{email:user.email}})

        expect(result.status).toBe(409)
        expect(result.body.id).toBeFalsy()
        expect(foundUser.length).toBe(1)
    })

    it('Returns 422 when password is not valid',async()=>{
        const user = await invalidUserFactory()
        
        const result = await supertest(app).post('/signup').send(user)

        const foundUser = await prisma.users.findFirst({where:{email:user.email}})

        expect(result.status).toBe(422)
        expect(result.body.id).toBeFalsy()
        expect(foundUser).toBeFalsy()
    })

})

describe('Testing POST /signin',()=>{

    it('Returns 200 and token when email and password are correct',async()=>{
        const user = await createScenarioSignUpOneUser()

        const result = await supertest(app).post('/signin').send({email:user.email, password:user.password})

        expect(result.status).toBe(200)
        expect(result.body.token).not.toBeFalsy()
    })

    it('Returns 401 when user is not found',async()=>{
        const user = await userFactory()

        const result = await supertest(app).post('/signin').send({email:user.email, password:user.password})

        expect(result.status).toBe(401)
        expect(result.body.token).toBeFalsy()
    })

    it('Returns 401 when password is incorrect',async()=>{
        const user = await createScenarioSignUpOneUser()

        const result = await supertest(app).post('/signin').send({email:user.email, password:user.password+'x'})

        expect(result.status).toBe(401)
        expect(result.body.token).toBeFalsy()
    })

})

describe('Testing GET /user',()=>{

    it('Returns 200 and user name from id provided by query string',async()=>{
        const {token, friendId} = await createScenarioTwoUsers()

        const result = await supertest(app).get(`/user?id=${friendId}`)
        .set('Authorization',`Bearer ${token}`)

        expect(result.status).toBe(200)
        expect(result.body.name).not.toBeFalsy()
    })

    it('Returns 200 and user name from token session when no query string is given',async()=>{
        const {token} = await createScenarioTwoUsers()

        const result = await supertest(app).get(`/user`)
        .set('Authorization',`Bearer ${token}`)

        expect(result.status).toBe(200)
        expect(result.body.name).not.toBeFalsy()
    })

    it('Returns 404 when user id from query string is not found',async()=>{
        const {token, friendId} = await createScenarioTwoUsers()

        const result = await supertest(app).get(`/user?id=${friendId*(-1)}`)
        .set('Authorization',`Bearer ${token}`)

        expect(result.status).toBe(404)
        expect(result.body.name).toBeFalsy()
    })

    it('Returns 404 when query string is not provided and user id from token session is not found',async()=>{
        const {token} = await createScenarioSignInDeletedUser()

        const result = await supertest(app).get(`/user`)
        .set('Authorization',`Bearer ${token}`)

        expect(result.status).toBe(404)
        expect(result.body.name).toBeFalsy()
    })

    it('Returns 401 when token is invalid',async()=>{
        const {token} = await createScenarioTwoUsers()

        const result = await supertest(app).get(`/user`)
        .set('Authorization',`Bearer ${token+'x'}`)

        expect(result.status).toBe(401)
        expect(result.body.name).toBeFalsy()
    })

})

describe('Testing DELETE /user',()=>{

    it('Returns 204 when user id was found and deleted successfully',async()=>{
        const {token,userId} = await createScenarioSignInOneUser()

        const result = await supertest(app).delete('/user')
        .set('Authorization',`Bearer ${token}`)

        const foundUser = await prisma.users.findFirst({where:{id:userId}})

        expect(result.status).toBe(204)
        expect(foundUser?.id).toBeFalsy()
    })

    it('Returns 404 when user id was not found',async()=>{
        const {token,userId} = await createScenarioSignInDeletedUser()

        const result = await supertest(app).delete('/user')
        .set('Authorization',`Bearer ${token}`)

        const foundUser = await prisma.users.findFirst({where:{id:userId}})

        expect(result.status).toBe(404)
        expect(foundUser?.id).toBeFalsy()
        
    })

    it('Returns 401 when token is invalid',async()=>{
        const {token,userId} = await createScenarioSignInOneUser()

        const result = await supertest(app).delete('/user')
        .set('Authorization',`Bearer ${token+'x'}`)

        const foundUser = await prisma.users.findFirst({where:{id:userId}})

        expect(result.status).toBe(401)
        expect(foundUser?.id).not.toBeFalsy()
        
    })

})