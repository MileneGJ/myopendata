import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/database";
import { IFileDB } from "../../src/types/fileTypes";
import fileFactory from "../factories/fileFactory";
import {
    createScenarioFourFiles,
    createScenarioOneUserOneFile,
    createScenarioSignInDeletedUser,
    createScenarioSignInOneUser,
    createScenarioTwoUsersFourFiles,
    deleteAllData,
    disconnectPrisma
} from "../factories/scenarioFactory";

beforeEach(async () => {
    await deleteAllData()
})

afterAll(async () => {
    await disconnectPrisma()
})

describe('Testing POST /files', () => {

    it('Returns 201 and created file when input is correct', async () => {
        const token = await createScenarioSignInOneUser()
        const file = await fileFactory()

        const result = await supertest(app).post('/files').set('Authorization', `Bearer ${token}`).send(file)

        const foundFile = await prisma.files.findFirst({ where: { csvlink: file.csvlink } }) as IFileDB

        expect(result.status).toBe(201)
        expect(foundFile).not.toBeFalsy()
        expect(result.body.id).toEqual(foundFile.id)
    })

    it('Returns 401 when authorization header is missing', async () => {
        const token = await createScenarioSignInOneUser()
        const file = await fileFactory()

        const result = await supertest(app).post('/files').set('Authorization', '').send(file)

        const foundFile = await prisma.files.findFirst({ where: { csvlink: file.csvlink } }) as IFileDB

        expect(result.status).toBe(401)
        expect(foundFile).toBeFalsy()
        expect(result.body.id).toBeFalsy()
    })

    it('Returns 401 when token is invalid', async () => {
        const token = await createScenarioSignInOneUser()
        const file = await fileFactory()

        const result = await supertest(app).post('/files').set('Authorization', `Bearer ${token + "x"}`).send(file)

        const foundFile = await prisma.files.findFirst({ where: { csvlink: file.csvlink } }) as IFileDB

        expect(result.status).toBe(401)
        expect(foundFile).toBeFalsy()
        expect(result.body.id).toBeFalsy()
    })

    it('Returns 404 when user from token is not found', async () => {
        const token = await createScenarioSignInDeletedUser()
        const file = await fileFactory()

        const result = await supertest(app).post('/files').set('Authorization', `Bearer ${token}`).send(file)

        const foundFile = await prisma.files.findFirst({ where: { csvlink: file.csvlink } }) as IFileDB

        expect(result.status).toBe(404)
        expect(foundFile).toBeFalsy()
        expect(result.body.id).toBeFalsy()
    })

    it('Returns 409 when file was already posted', async () => {
        const { token, file } = await createScenarioOneUserOneFile()

        const result = await supertest(app).post('/files').set('Authorization', `Bearer ${token}`).send(file)

        const foundFile = await prisma.files.findMany({ where: { csvlink: file.csvlink } }) as IFileDB[]

        expect(result.status).toBe(409)
        expect(foundFile.length).toEqual(1)
        expect(result.body.id).toBeFalsy()
    })

    it('Returns 422 when keyword array is empty', async () => {
        const token = await createScenarioSignInOneUser()
        const file = await fileFactory()

        const result = await supertest(app).post('/files')
            .set('Authorization', `Bearer ${token}`)
            .send({ ...file, keywords: [] })

        const foundFile = await prisma.files.findFirst({ where: { csvlink: file.csvlink } }) as IFileDB

        expect(result.status).toBe(422)
        expect(foundFile).toBeFalsy()
        expect(result.body.id).toBeFalsy()
    })

    it('Returns 422 when keyword is an empty string', async () => {
        const token = await createScenarioSignInOneUser()
        const file = await fileFactory()

        const result = await supertest(app).post('/files')
            .set('Authorization', `Bearer ${token}`)
            .send({ ...file, keywords: [''] })

        const foundFile = await prisma.files.findFirst({ where: { csvlink: file.csvlink } }) as IFileDB

        expect(result.status).toBe(422)
        expect(foundFile).toBeFalsy()
        expect(result.body.id).toBeFalsy()
    })

})

describe('GET /files',()=>{

    it('Returns list of files ordered by user when user is provided',async()=>{
        const {token,name, id} = await createScenarioTwoUsersFourFiles()

        const result = await supertest(app).get(`/files?user=${name}`)
        .set('Authorization', `Bearer ${token}`)

        expect(result.status).toBe(200)
        expect(result.body.length).toBeGreaterThan(0)
        expect(result.body[0].userId).toEqual(id)
    })

    it('Returns list of files ordered by keyword when keyword is provided',async()=>{
        const {token, keyName} = await createScenarioFourFiles()

        const result = await supertest(app).get(`/files?keyword=${keyName}`)
        .set('Authorization', `Bearer ${token}`)

        expect(result.status).toBe(200)
        expect(result.body.length).toBeGreaterThan(0)
    })

    it('Returns list of files ordered by title when title is provided',async()=>{
        const {token, title} = await createScenarioFourFiles()

        const result = await supertest(app).get(`/files?title=${title}`)
        .set('Authorization', `Bearer ${token}`)

        expect(result.status).toBe(200)
        expect(result.body.length).toBeGreaterThan(0)
        expect(result.body[0].title).toEqual(title)
    })

    it('Returns list of all files when no search queries are provided',async()=>{
        const {token} = await createScenarioFourFiles()

        const result = await supertest(app).get('/files')
        .set('Authorization', `Bearer ${token}`)

        expect(result.status).toBe(200)
        expect(result.body.length).toBeGreaterThan(0)
    })

    it('Returns 401 when token provided is invalid',async()=>{
        const {token} = await createScenarioFourFiles()

        const result = await supertest(app).get('/files')
        .set('Authorization', `Bearer ${token+'x'}`)

        expect(result.status).toBe(401)
        expect(result.body.length).toBeFalsy()
    })
})