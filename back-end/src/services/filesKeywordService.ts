import * as filesKeywordsRepository from '../repositories/filesKeywordsRepository'

export async function verifyFileKeywordLink (fileId:number, keywordId:number) {
    const foundLink = await filesKeywordsRepository.findByIds(fileId,keywordId)
    if(!foundLink) {
        await filesKeywordsRepository.insert(fileId,keywordId)
    }
}