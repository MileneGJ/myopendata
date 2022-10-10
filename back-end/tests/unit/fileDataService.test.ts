import * as fileDataRepository from '../../src/repositories/fileDataRepository'
import * as fileDataService from '../../src/services/fileDataServices'
import * as filesFileDataService from '../../src/services/filesFileDataServices'
import fileDataFactory from '../factories/fileDataFactory'
import fileFactory from '../factories/fileFactory'
import idFactory from '../factories/idFactory'
import rawFileDataFactory from "../factories/rawFileDataFactory"

beforeEach(()=>{
    jest.resetAllMocks();
    jest.clearAllMocks();
});


describe('Testing uploadFile function',()=>{

    it('Creates new fileData when params are valid',async()=>{
        const fileData = await rawFileDataFactory()
        const createdFileData = await fileDataFactory()
        jest.spyOn(fileDataRepository,'upload').mockImplementation(():any=>createdFileData)

        const result = fileDataService.uploadFile(fileData)

        await expect(result).resolves.toEqual(createdFileData)
        expect(fileDataRepository.upload).toBeCalled()
    })

})

describe('Testing updateLinksWithFile function',()=>{

    it('Updates file data when url from data is found',async()=>{
        const file = await fileFactory()
        const fileId = await idFactory()
        const dataId = await idFactory()
        jest.spyOn(filesFileDataService,'updateLinks').mockImplementation(():any=>{})
        jest.spyOn(fileDataRepository,'findByUrl').mockImplementationOnce(():any=>({...file,id:dataId}))

        const result = fileDataService.updateLinksWithFile(file.csvlink,fileId)

        await expect(result).resolves.toBeFalsy()
        expect(filesFileDataService.updateLinks).toBeCalledTimes(file.csvlink.length)
    })

    it('Returns 404 when url from data is not found',async()=>{
        const file = await fileFactory()
        const fileId = await idFactory()
        const expectedError = {type: "not_found", message: "No file data was found with this url"}

        jest.spyOn(fileDataRepository,'findByUrl').mockImplementationOnce(():any=>{})

        const result = fileDataService.updateLinksWithFile(file.csvlink,fileId)

        await expect(result).rejects.toEqual(expectedError)
        expect(filesFileDataService.updateLinks).not.toBeCalled()
    })

})