import * as filesRepository from '../../src/repositories/filesRepository'
import * as fileService from '../../src/services/fileServices'
import * as userService from '../../src/services/userServices'
import * as keywordService from '../../src/services/keywordServices'
import * as fileDataService from '../../src/services/fileDataServices'
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
        jest.spyOn(fileDataService,'updateLinksWithFile').mockImplementation(():any=>{})

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

        jest.spyOn(filesRepository,'findByTitleAndUser').mockImplementationOnce(():any=>{})

        const result = fileService.create(file,userId)

        await expect(result).resolves.toEqual(createdFile)
        expect(filesRepository.insert).toBeCalled()
        expect(keywordService.linkKeywordsToFile).toBeCalled()
    })

    it('Returns 409 when file title was already posted by user',async()=>{
        const file = await fileFactory()
        const userId = await idFactory()
        const expectedError = {type: "conflict", message: "File title was already posted by this user"}
        const createdFile = {
            id:1,
            title: file.title,
            description: file.description,
            csvlink: file.csvlink,
            userId,
            createdAt: new Date
        }
        
        jest.spyOn(filesRepository,'findByTitleAndUser').mockImplementationOnce(():any=>createdFile)

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
        jest.spyOn(filesRepository,'findAll').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByKeyword').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByTitle').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByUser').mockImplementationOnce(():any=>fileList)

        const result = fileService.getFiles({keyword, title, user, userId})

        await expect(result).resolves.toHaveLength(5)
        expect(filesRepository.findAll).not.toBeCalled()
        expect(filesRepository.findByKeyword).not.toBeCalled()
        expect(filesRepository.findByTitle).not.toBeCalled()

    })

    it('Returns files ordered by title if title is provided',async()=>{
        const fileList = await fileListFactory(5)
        const user = undefined
        const keyword = undefined
        const title = await wordFactory()
        const userId = await idFactory()
        jest.spyOn(filesRepository,'findAll').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByKeyword').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByTitle').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByUser').mockImplementationOnce(():any=>fileList)

        const result = fileService.getFiles({keyword, title, user, userId})

        await expect(result).resolves.toHaveLength(5)
        expect(filesRepository.findAll).not.toBeCalled()
        expect(filesRepository.findByKeyword).not.toBeCalled()
        expect(filesRepository.findByUser).not.toBeCalled()
    })

    it('Returns files ordered by keyword if keyword is provided',async()=>{
        const fileList = await fileListFactory(5)
        const user = undefined
        const keyword = await wordFactory()
        const title = undefined
        const userId = await idFactory()
        jest.spyOn(filesRepository,'findAll').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByKeyword').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByTitle').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByUser').mockImplementationOnce(():any=>fileList)

        const result = fileService.getFiles({keyword, title, user, userId})

        await expect(result).resolves.toHaveLength(5)
        expect(filesRepository.findAll).not.toBeCalled()
        expect(filesRepository.findByTitle).not.toBeCalled()
        expect(filesRepository.findByUser).not.toBeCalled()
    })

    it('Returns formatted empty array if keyword is not found in any file',async()=>{
        const user = undefined
        const keyword = await wordFactory()
        const title = undefined
        const userId = await idFactory()
        jest.spyOn(filesRepository,'findAll').mockImplementationOnce(():any=>[])
        jest.spyOn(filesRepository,'findByKeyword').mockImplementationOnce(():any=>[])
        jest.spyOn(filesRepository,'findByTitle').mockImplementationOnce(():any=>[])
        jest.spyOn(filesRepository,'findByUser').mockImplementationOnce(():any=>[])

        const result = fileService.getFiles({keyword, title, user, userId})

        await expect(result).resolves.toEqual([])
        expect(filesRepository.findAll).not.toBeCalled()
        expect(filesRepository.findByTitle).not.toBeCalled()
        expect(filesRepository.findByUser).not.toBeCalled()
    })

    it('Returns formatted empty array if title is not found in any file',async()=>{
        const user = undefined
        const keyword = undefined
        const title = await wordFactory()
        const userId = await idFactory()
        jest.spyOn(filesRepository,'findAll').mockImplementationOnce(():any=>[])
        jest.spyOn(filesRepository,'findByKeyword').mockImplementationOnce(():any=>[])
        jest.spyOn(filesRepository,'findByTitle').mockImplementationOnce(():any=>[])
        jest.spyOn(filesRepository,'findByUser').mockImplementationOnce(():any=>[])

        const result = fileService.getFiles({keyword, title, user, userId})

        await expect(result).resolves.toEqual([])
        expect(filesRepository.findAll).not.toBeCalled()
        expect(filesRepository.findByKeyword).not.toBeCalled()
        expect(filesRepository.findByUser).not.toBeCalled()
    })

    it('Returns all files if no search queries are provided',async()=>{
        const fileList = await fileListFactory(5)
        const user = undefined
        const keyword = undefined
        const title = undefined
        const userId = await idFactory()
        jest.spyOn(filesRepository,'findAll').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByKeyword').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByTitle').mockImplementationOnce(():any=>fileList)
        jest.spyOn(filesRepository,'findByUser').mockImplementationOnce(():any=>fileList)

        const result = fileService.getFiles({keyword, title, user, userId})

        await expect(result).resolves.toHaveLength(5)
        expect(filesRepository.findByKeyword).not.toBeCalled()
        expect(filesRepository.findByTitle).not.toBeCalled()
        expect(filesRepository.findByUser).not.toBeCalled()
    })

})

describe('Testing getOneFile function',()=>{

    it('Returns requested file when params are valid',async()=>{
        const id = await idFactory()
        const userId = await idFactory()
        const file = await fileFactory()
        const name = await wordFactory()
        const filesKeywords = file.keywords.map(k=>({keywords:{name:k}}))
        const returnedFile = {...file,id,users:{name},filesKeywords}

        jest.spyOn(userService,'verifyIdExists').mockImplementation(():any=>true)

        jest.spyOn(filesRepository,'findById').mockImplementationOnce(():any=>returnedFile)

        const result = fileService.getOneFile(userId,id)

        await expect(result).resolves.toHaveProperty('id')
    })

    it('Returns 404 when params are not valid',async()=>{
        const id = await idFactory()
        const userId = await idFactory()
        const expectedError = {type: "not_found", message: "No files were found with this id"}

        jest.spyOn(filesRepository,'findById').mockImplementationOnce(():any=>{})

        const result = fileService.getOneFile(userId,id)

        await expect(result).rejects.toEqual(expectedError)
    })

})

describe('Testing deleteOneFile function',()=>{

    it('Deletes file and its relations when file id exists',async()=>{
        const file = await fileFactory()
        const id = await idFactory()
        const userId = await idFactory()

        jest.spyOn(fileDataService,'deleteFileDataFromFile').mockImplementation(():any=>{})
        jest.spyOn(keywordService,'deleteKeywordsFromFiles').mockImplementation(():any=>{})
        jest.spyOn(filesRepository,'deleteOne').mockImplementation(():any=>{})

        jest.spyOn(filesRepository,'findByIdAndUserId').mockImplementationOnce(():any=>file)

        const result = fileService.deleteOneFile(id,userId)

        await expect(result).resolves.toBeFalsy()
        expect(filesRepository.deleteOne).toBeCalled()
        expect(fileDataService.deleteFileDataFromFile).toBeCalled()
        expect(keywordService.deleteKeywordsFromFiles).toBeCalled()
    })

    it('Returns 404 when file id is not found',async()=>{
        const id = await idFactory()
        const userId = await idFactory()
        const expectedError = {type: "not_found", message: "No files were found with this id"}

        jest.spyOn(filesRepository,'findByIdAndUserId').mockImplementationOnce(():any=>{})

        const result = fileService.deleteOneFile(id,userId)

        await expect(result).rejects.toEqual(expectedError)
        expect(filesRepository.deleteOne).not.toBeCalled()
        expect(fileDataService.deleteFileDataFromFile).not.toBeCalled()
        expect(keywordService.deleteKeywordsFromFiles).not.toBeCalled()
    })

})