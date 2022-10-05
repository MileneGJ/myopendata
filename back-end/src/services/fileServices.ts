import * as filesRepository from '../repositories/filesRepository'
import * as userService from '../services/userServices'
import * as keywordService from '../services/keywordServices'
import { IFileParams, IFileBody, IFileDB } from '../types/fileTypes';
import { IKeywordReturnDB } from '../types/keywordTypes';
import { conflictError, notFoundError } from '../utils/errorUtils';

export async function create (file:IFileBody,userId:number) {
    await userService.verifyIdExists(userId)
    await verifyLinkInUse(file.csvlink)
    await keywordService.validateKeywordArray(file.keywords)
    const newFile = await filesRepository.insert({
        title:file.title,
        description:file.description,
        csvlink: file.csvlink,
        userId
    })
    await keywordService.linkKeywordsToFile(file.keywords,newFile.id)
    return newFile
}

async function verifyLinkInUse (csvlink:string) {
    const foundFile = await filesRepository.findByLink(csvlink)
    if(foundFile) {
        throw conflictError('File link was already posted')
    }
}

export async function getFiles({
    keyword, 
    title, 
    user, 
    userId}: IFileParams) {

    await userService.verifyIdExists(userId)
    if(keyword){
        const rawSearch = await filesRepository.findByKeyword(keyword as string)
        return formatKeywordOutput(rawSearch as IKeywordReturnDB[])
    } else if(title){
        return await filesRepository.findByTitle(title)
    } else if(user){
        return await filesRepository.findByUser(user)
    } else {
        return await filesRepository.findAll()
    }
}

export async function getOneFile (userId:number, fileId:number) {
    await userService.verifyIdExists(userId)
    return await verifyFileExists(fileId)
}

async function verifyFileExists(fileId:number){
    const file = await filesRepository.findById(fileId)
    if(!file){
        throw notFoundError('No files were found with this id')
    }
    return file
}

function formatKeywordOutput (fileArray:IKeywordReturnDB[]) {
    if(fileArray.length) {
    return fileArray.map(k=>k.filesKeywords[0].files)
    }
    return []
}