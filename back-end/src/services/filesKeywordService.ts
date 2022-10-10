import * as filesKeywordsRepository from '../repositories/filesKeywordsRepository'

export async function verifyFileKeywordLink (fileId:number, keywordId:number) {
    const foundLink = await filesKeywordsRepository.findByIds(fileId,keywordId)
    if(!foundLink) {
        await filesKeywordsRepository.insert(fileId,keywordId)
    }
}

export async function deleteLinksFromFilesFromUser(userId:number) {
    await filesKeywordsRepository.deleteFromFileFromUser(userId)
}

export async function deleteLinksFromFiles(fileId:number) {
    await filesKeywordsRepository.deleteFromFile(fileId)
}