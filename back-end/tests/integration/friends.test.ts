import prisma from "../../src/database/database";
import supertest from "supertest";
import app from "../../src/app";
import { 
    createScenarioSignInDeletedUser,
    createScenarioTwoUsers, 
    createScenarioTwoUsersOneDeleted, 
    deleteAllData, 
    disconnectPrisma } from "../factories/scenarioFactory";
import { Friends } from "@prisma/client";


beforeEach(async () => {
    await deleteAllData()
})

afterAll(async () => {
    await disconnectPrisma()
})

describe('Testing POST /friends/:id',()=>{

    it('Returns 200 and created friend link when params are valid',async()=>{
        const {token, userId, friendId} = await createScenarioTwoUsers()

        const result = await supertest(app).post(`/friends/${friendId}`)
        .set('Authorization',`Bearer ${token}`)

        const friendLink = await prisma.friends.findFirst({where:{user2Id:friendId, user1Id: userId}}) as Friends

        expect(result.status).toBe(200)
        expect(friendLink).not.toBeFalsy()
        expect(result.body.id).toEqual(friendLink.id)
    })

    it('Returns 409 when friend was already added',async()=>{
        const {token, userId, friendId} = await createScenarioTwoUsers()

        await supertest(app).post(`/friends/${friendId}`)
        .set('Authorization',`Bearer ${token}`)

        const result = await supertest(app).post(`/friends/${friendId}`)
        .set('Authorization',`Bearer ${token}`)

        const friendLink = await prisma.friends.findFirst({where:{user2Id:friendId, user1Id: userId}})

        expect(result.status).toBe(409)
        expect(friendLink).not.toBeFalsy()
        expect(result.body.id).toBeFalsy()
    })

    it('Returns 404 when id param is not found',async ()=>{
        const {token, userId, friendId} = await createScenarioTwoUsers()

        const result = await supertest(app).post(`/friends/${friendId*(-1)}`)
        .set('Authorization',`Bearer ${token}`)

        const friendLink = await prisma.friends.findFirst({where:{user2Id:friendId, user1Id: userId}})

        expect(result.status).toBe(404)
        expect(friendLink).toBeFalsy()
        expect(result.body.id).toBeFalsy()
    })

    it('Returns 404 when authenticated user is not found',async ()=>{
        const {token, userId, friendId} = await createScenarioTwoUsersOneDeleted()

        const result = await supertest(app).post(`/friends/${friendId}`)
        .set('Authorization',`Bearer ${token}`)

        const friendLink = await prisma.friends.findFirst({where:{user2Id:friendId, user1Id: userId}})

        expect(result.status).toBe(404)
        expect(friendLink).toBeFalsy()
        expect(result.body.id).toBeFalsy()
    })

    it('Returns 401 when token is invalid',async ()=>{
        const {token, userId, friendId} = await createScenarioTwoUsers()

        const result = await supertest(app).post(`/friends/${friendId}`)
        .set('Authorization',`Bearer ${token+'x'}`)

        const friendLink = await prisma.friends.findFirst({where:{user2Id:friendId, user1Id: userId}})

        expect(result.status).toBe(401)
        expect(friendLink).toBeFalsy()
        expect(result.body.id).toBeFalsy()
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
        const token = await createScenarioSignInDeletedUser()

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