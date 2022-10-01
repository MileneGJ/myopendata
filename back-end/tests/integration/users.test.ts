import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/database";
import invalidUserFactory from "../factories/invalidUserFactory";
import { createScenarioSignUpOneUser, deleteAllData, disconnectPrisma } from "../factories/scenarioFactory";
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