import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/database";
import { createScenarioOneFileData, deleteAllData, disconnectPrisma } from "../factories/scenarioFactory";

beforeEach(async () => {
    await deleteAllData()
})

afterAll(async () => {
    await disconnectPrisma()
})

describe('Testing POST /filedata',()=>{

    //Get info on how to create a uploaded file factory

    it.todo('Returns 200 and created file data')

})

describe('Testing DELETE /filedata/:id',()=>{
    
    it('Returns 204 and deletes file data when param is valid',async()=>{
        const {token, fileDataId} = await createScenarioOneFileData()

        const result = await supertest(app).delete(`/filedata/${fileDataId}`)
        .set('Authorization', `Bearer ${token}`)

        const foundData = await prisma.fileData.findFirst({where:{id:fileDataId}})

        expect(result.status).toBe(204)
        expect(foundData?.id).toBeFalsy()
    })
    
    it('Returns 404 when param is not found',async()=>{
        const {token, fileDataId} = await createScenarioOneFileData()

        const result = await supertest(app).delete(`/filedata/${fileDataId+1}`)
        .set('Authorization', `Bearer ${token}`)

        const foundData = await prisma.fileData.findFirst({where:{id:fileDataId}})

        expect(result.status).toBe(404)
        expect(foundData?.id).not.toBeFalsy()
    })

})