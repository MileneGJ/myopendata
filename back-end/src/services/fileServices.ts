import * as filesRepository from '../repositories/filesRepository'
import * as userService from '../services/userServices'
import * as keywordService from '../services/keywordServices'
import * as fileDataService from '../services/fileDataServices'
import { IFileParams, IFileBody, IFileReturnDB } from '../types/fileTypes';
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
        return formatArrayOutput(rawSearch)
    } else if (title) {
        const rawSearch = await filesRepository.findByTitle(title)
        return formatArrayOutput(rawSearch)
    } else if (user) {
        const rawSearch = await filesRepository.findByUser(user)
        return formatArrayOutput(rawSearch)
    } else {
        const rawSearch = await filesRepository.findAll()
        return formatArrayOutput(rawSearch)
    }
}

export async function getOneFile(userId: number, fileId: number) {
    await userService.verifyIdExists(userId)
    const file = await verifyFileExists(fileId)
    return formatFileOutput(file)
}

async function verifyFileExists(fileId: number) {
    const file = await filesRepository.findById(fileId)
    if (!file) {
        throw notFoundError('No files were found with this id')
    }
    return file
}

function formatArrayOutput(fileArray: IFileReturnDB[]) {
    if (fileArray.length) {
        return fileArray.map(f => {
            return formatFileOutput(f)
        })
    }
    return []
}

function formatFileOutput(file: IFileReturnDB) {
    if (file.id) {
        const keywords = file.filesKeywords.map(fk => fk.keywords.name)
        return ({
            id: file.id,
            title: file.title,
            description: file.description,
            csvlink: file.csvlink,
            author: file.users.name,
            keywords
        })
    }
    return {}
}

export async function deleteFilesFromUserId(userId: number) {
    await fileDataService.deleteFileDataFromFileFromUser(userId)
    await keywordService.deleteKeywordsFromFilesFromUser(userId)
    await filesRepository.deleteFromUserId(userId)
}

export async function deleteOneFile(fileId:number) {
    await verifyFileExists(fileId)
    await fileDataService.deleteFileDataFromFile(fileId)
    await keywordService.deleteKeywordsFromFilesFromUser(fileId)
    await filesRepository.deleteOne(fileId)
}