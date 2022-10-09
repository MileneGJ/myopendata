import * as filesRepository from '../repositories/filesRepository'
import * as userService from '../services/userServices'
import * as keywordService from '../services/keywordServices'
import { IFileParams, IFileBody, IFileReturnDB } from '../types/fileTypes';
import { IKeywordReturnDB } from '../types/keywordTypes';
import { conflictError, notFoundError } from '../utils/errorUtils';

export async function create(file: IFileBody, userId: number) {
    await userService.verifyIdExists(userId)
    await verifyLinkInUse(file.csvlink)
    await keywordService.validateKeywordArray(file.keywords)
    const newFile = await filesRepository.insert({
        title: file.title,
        description: file.description,
        csvlink: file.csvlink,
        userId
    })
    await keywordService.linkKeywordsToFile(file.keywords, newFile.id)
    return newFile
}

async function verifyLinkInUse(csvlink: string) {
    const foundFile = await filesRepository.findByLink(csvlink)
    if (foundFile) {
        throw conflictError('File link was already posted')
    }
}

export async function getFiles({
    keyword,
    title,
    user,
    userId }: IFileParams) {

    await userService.verifyIdExists(userId)
    if (keyword) {
        const rawSearch = await filesRepository.findByKeyword(keyword as string)
        return formatKeywordOutput(rawSearch as IKeywordReturnDB[])
    } else if (title) {
        const rawSearch = await filesRepository.findByTitle(title)
        return formatFileOutput(rawSearch)
    } else if (user) {
        const rawSearch = await filesRepository.findByUser(user)
        return formatFileOutput(rawSearch)
    } else {
        const rawSearch = await filesRepository.findAll()
        return formatFileOutput(rawSearch)
    }
}

export async function getOneFile(userId: number, fileId: number) {
    await userService.verifyIdExists(userId)
    const file = await verifyFileExists(fileId)
    const keywords = file.filesKeywords.map(fk=>fk.keywords.name)
    return ({
        id: file.id,
        title: file.title,
        description: file.description,
        csvlink: file.csvlink,
        author: file.users.name,
        keywords
    })
}

async function verifyFileExists(fileId: number) {
    const file = await filesRepository.findById(fileId)
    if (!file) {
        throw notFoundError('No files were found with this id')
    }
    return file
}

function formatKeywordOutput(fileArray: IKeywordReturnDB[]) {
    if (fileArray.length) {
        return fileArray.map(k => {
            const f = k.filesKeywords[0].files
            const keywords = f.filesKeywords.map(fk=>fk.keywords.name)
            return ({
                id: f.id,
                title: f.title,
                description: f.description,
                csvlink: f.csvlink,
                author: f.users.name,
                keywords
            })
        })
    }
    return []
}

function formatFileOutput(fileArray: IFileReturnDB[]) {
    if (fileArray.length) {
        return fileArray.map(f => {
            const keywords = f.filesKeywords.map(fk=>fk.keywords.name)
            return ({
                id: f.id,
                title: f.title,
                description: f.description,
                csvlink: f.csvlink,
                author: f.users.name,
                keywords
            })
        })
    }
    return []
}

export async function deleteFilesFromUserId(userId: number) {
    await keywordService.deleteKeywordsFromFilesFromUser(userId)
    await filesRepository.deleteFromUserId(userId)
}