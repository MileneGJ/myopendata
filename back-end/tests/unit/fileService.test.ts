import * as filesRepository from '../../src/repositories/filesRepository'
import * as fileService from '../../src/services/fileServices'
import * as userService from '../../src/services/authServices'
import * as keywordService from '../../src/services/keywordServices'
import fileFactory from '../factories/fileFactory';
import idFactory from '../factories/idFactory';

beforeEach(()=>{
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe('Testing create function',()=>{

    it('Returns created file when inputs are valid',async()=>{
        jest.spyOn(userService,'verifyIdExists').mockImplementation(():any=>true)
        jest.spyOn(filesRepository,'insert').mockImplementation(():any=>createdFile)
        jest.spyOn(keywordService,'linkKeywordsToFile').mockImplementation(():any=>{})

        const file = await fileFactory()
        const userId = await idFactory()
        const createdFile = {
            id:1,
            title: file.title,
            description: file.description,
            csvlink: file.csvlink,
            userId,
            createdAt: new Date
        }

        jest.spyOn(filesRepository,'findByLink').mockImplementationOnce(():any=>{})

        const result = fileService.create(file,userId)

        await expect(result).resolves.toEqual(createdFile)
        expect(filesRepository.insert).toBeCalled()
        expect(keywordService.linkKeywordsToFile).toBeCalled()
    })

    it('Returns 409 when file was already posted',async()=>{
        const file = await fileFactory()
        const userId = await idFactory()
        const expectedError = {type: "conflict", message: "File link was already posted"}
        const createdFile = {
            id:1,
            title: file.title,
            description: file.description,
            csvlink: file.csvlink,
            userId,
            createdAt: new Date
        }
        
        jest.spyOn(filesRepository,'findByLink').mockImplementationOnce(():any=>createdFile)

        const result = fileService.create(file,userId)

        await expect(result).rejects.toEqual(expectedError)
        expect(filesRepository.insert).not.toBeCalled()
        expect(keywordService.linkKeywordsToFile).not.toBeCalled()
    })

})