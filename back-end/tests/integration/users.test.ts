import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/database";
import invalidUserFactory from "../factories/invalidUserFactory";
import { deleteAllData, disconnectPrisma } from "../factories/scenarioFactory";
import userFactory from "../factories/userFactory";

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

        const foundUser = await prisma.users.findFirst({where:{email:user.email}})

        expect(result.status).toBe(201)
        expect(result.body).toEqual(foundUser)
        expect(foundUser).not.toBeFalsy()
    })

    it('Returns 409 when email already exists in database',async()=>{
        const user = await userFactory()
        await supertest(app).post('/signup').send(user)
        const result = await supertest(app).post('/signup').send(user)

        const foundUser = await prisma.users.findFirst({where:{email:user.email}})

        expect(result.status).toBe(409)
        expect(result.body).toBeFalsy()
        expect(foundUser).toBeFalsy()
    })

    it('Returns 422 when password is not valid',async()=>{
        const user = await invalidUserFactory()
        
        const result = await supertest(app).post('/signup').send(user)

        const foundUser = await prisma.users.findFirst({where:{email:user.email}})

        expect(result.status).toBe(422)
        expect(result.body).toBeFalsy()
        expect(foundUser).toBeFalsy()
    })

})