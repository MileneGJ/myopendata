import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/database";
import { IFileDB } from "../../src/types/fileTypes";
import fileFactory from "../factories/fileFactory";
import {
    createScenarioOneUserOneFile,
    createScenarioSignInDeletedUser,
    createScenarioSignInOneUser,
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
            .send({ ...file, keywords: [] })

        const foundFile = await prisma.files.findFirst({ where: { csvlink: file.csvlink } }) as IFileDB

        expect(result.status).toBe(422)
        expect(foundFile).toBeFalsy()
        expect(result.body.id).toBeFalsy()
    })

})