import { IAWSFile } from "../types/generalTypes"
import * as fileDataRepository from '../repositories/fileDataRepository'
import * as filesFileDataService from '../services/filesFileDataServices'
import { notFoundError } from "../utils/errorUtils"

export async function uploadFile (file:IAWSFile) {
    const {originalname:name, key, size, location:url} = file
    const infoForUpload = {name, key, size, url}
    const updatedFile = await fileDataRepository.upload(infoForUpload)
    return updatedFile
}

export async function updateLinksWithFile (urlArray:string[],fileId:number) {
    for(let url of urlArray) {
        const foundData = await verifyUrlExists(url)
        await filesFileDataService.updateLinks(foundData.id,fileId)
    }
}

export async function verifyUrlExists (url:string) {
    const foundFileData = await fileDataRepository.findByUrl(url)
    if(!foundFileData) {
        throw notFoundError('No file data was found with this url')
    }
    return foundFileData
}

export async function verifyIdExists (id:number) {
    const foundFileData = await fileDataRepository.findById(id)
    if(!foundFileData) {
        throw notFoundError('No file data was found with this id')
    }
    return foundFileData
}

export async function deleteFileData (id:number) {
    await verifyIdExists(id)
    await filesFileDataService.deleteLinkFromData(id)
    await fileDataRepository.deleteOne(id)
}

export async function deleteFileDataFromFile(fileId:number) {
    await filesFileDataService.deleteLinkFromFile(fileId)
    await deleteOrphanData()
}

export async function deleteFileDataFromFileFromUser(userId:number) {
    await filesFileDataService.deleteLinkFromFileFromUser(userId)
    await deleteOrphanData()
}

async function deleteOrphanData() {
    const orphanData = await fileDataRepository.findOrphans()
    const idArray = orphanData.map(d=>d.id)
    await fileDataRepository.deleteByIds(idArray)
}