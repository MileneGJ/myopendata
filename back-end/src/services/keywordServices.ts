import * as keywordRepository from '../repositories/keywordRepository'
import * as filesKeywordService from '../services/filesKeywordService'
import { wrongSchemaError } from '../utils/errorUtils'


export async function linkKeywordsToFile(keywords: string[], fileId: number) {
    const keywordIds = await verifyKeywordsInDB(keywords)
    for (const id of keywordIds) {
        await filesKeywordService.verifyFileKeywordLink(fileId, id as number)
    }
}

export async function validateKeywordArray(keywords: string[]) {
    if (keywords.length === 0) {
        throw wrongSchemaError('At least one keyword must be added to the file')
    }
    for (const k of keywords) {
        if (k.length === 0) {
            throw wrongSchemaError('Empty keywords are not allowed')
        }
    }
}

export async function verifyKeywordsInDB(keywords: string[]) {
    const keywordIds = []
    for (const keyword of keywords) {
        let search = keyword.toLowerCase()
        const foundKeyword = await keywordRepository.findByName(search)
        if (!foundKeyword) {
            const newKeyword = await keywordRepository.insert(search)
            keywordIds.push(newKeyword.id)
        } else {
            keywordIds.push(foundKeyword.id)
        }
    }
    return keywordIds
}