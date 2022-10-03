import * as filesRepository from '../repositories/filesRepository'
import * as userService from '../services/authServices'
import * as keywordService from '../services/keywordServices'
import { IFileParams, IFileBody } from '../types/fileTypes';
import { conflictError } from '../utils/errorUtils';

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
        return await filesRepository.findByKeyword(keyword)
    } else if(title){
        return await filesRepository.findByTitle(title)
    } else if(user){
        return await filesRepository.findByUser(user)
    } else {
        return await filesRepository.findAll()
    }
}
