import * as keywordService from '../../src/services/keywordServices'
import * as keywordsRepository from '../../src/repositories/keywordRepository'
import * as filesKeywordService from '../../src/services/filesKeywordService'
import fileFactory from '../factories/fileFactory'
import idFactory from '../factories/idFactory'

describe('Testing linkKeywordsToFile function',()=>{

    it('Creates corresponding links when keywords and fileId are provided', async()=>{
        const fileId = await idFactory()
        const id = await idFactory()
        const {keywords} = await fileFactory()

        jest.spyOn(keywordsRepository,'findByName').mockImplementation(():any=>{})
        jest.spyOn(keywordsRepository,'insert').mockImplementation(():any=>({id}))
        jest.spyOn(filesKeywordService,'verifyFileKeywordLink').mockImplementation(():any=>{})

        const result = keywordService.linkKeywordsToFile(keywords,fileId)

        await expect(result).resolves.toBeFalsy()
        expect(keywordsRepository.findByName).toBeCalled()
        expect(keywordsRepository.insert).toBeCalled()
        expect(filesKeywordService.verifyFileKeywordLink).toBeCalled()
    })

})