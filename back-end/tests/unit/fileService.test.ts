import * as filesRepository from '../../src/repositories/filesRepository'
import * as fileService from '../../src/services/fileServices'
import * as userService from '../../src/services/authServices'
import * as keywordService from '../../src/services/keywordServices'
import fileFactory from '../factories/fileFactory';
import idFactory from '../factories/idFactory';
import fileListFactory from '../factories/fileListFactory';
import wordFactory from '../factories/wordFactory';

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

describe('Testing getFiles function',()=>{

    it('Returns files ordered by user if user is provided',async()=>{
        const fileList = await fileListFactory(5)
        const user = await wordFactory()
        const keyword = undefined
        const title = undefined
        const userId = await idFactory()
        jest.spyOn(filesRepository,'findAll').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByKeyword').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByTitle').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByUser').mockImplementation(():any=>fileList)

        const result = fileService.getFiles({keyword, title, user, userId})

        expect(result).resolves.toEqual(fileList)
    })

    it('Returns files ordered by title if title is provided',async()=>{
        const fileList = await fileListFactory(5)
        const user = undefined
        const keyword = undefined
        const title = await wordFactory()
        const userId = await idFactory()
        jest.spyOn(filesRepository,'findAll').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByKeyword').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByTitle').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByUser').mockImplementation(():any=>fileList)

        const result = fileService.getFiles({keyword, title, user, userId})

        expect(result).resolves.toEqual(fileList)
    })

    it('Returns files ordered by keyword if keyword is provided',async()=>{
        const fileList = await fileListFactory(5)
        const user = undefined
        const keyword = await wordFactory()
        const title = undefined
        const userId = await idFactory()
        jest.spyOn(filesRepository,'findAll').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByKeyword').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByTitle').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByUser').mockImplementation(():any=>fileList)

        const result = fileService.getFiles({keyword, title, user, userId})

        expect(result).resolves.toEqual(fileList)
    })

    it('Returns all files if no search queries are provided',async()=>{
        const fileList = await fileListFactory(5)
        const user = undefined
        const keyword = undefined
        const title = undefined
        const userId = await idFactory()
        jest.spyOn(filesRepository,'findAll').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByKeyword').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByTitle').mockImplementation(():any=>fileList)
        jest.spyOn(filesRepository,'findByUser').mockImplementation(():any=>fileList)

        const result = fileService.getFiles({keyword, title, user, userId})

        expect(result).resolves.toEqual(fileList)
    })

})