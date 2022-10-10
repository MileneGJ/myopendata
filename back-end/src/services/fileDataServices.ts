import { IAWSFile } from "../types/generalTypes"
import * as fileDataRepository from '../repositories/fileDataRepository'
import { notFoundError } from "../utils/errorUtils"

export async function uploadFile (file:IAWSFile, fileId:number) {
    const {originalname:name, key, size, location:url} = file
    const infoForUpload = {name, key, size, url, fileId}
    const updatedFile = await fileDataRepository.upload(infoForUpload)
    return updatedFile
}

export async function verifyIdExists (id:number) {
    const foundFileData = await fileDataRepository.findById(id)
    if(!foundFileData) {
        throw notFoundError('No files were found with this id')
    }
    return foundFileData
}

export async function deleteFileData (id:number) {
    await verifyIdExists(id)
    await fileDataRepository.deleteOne(id)
}

export async function deleteFileDataFromFile(fileId:number) {
    await fileDataRepository.deleteFromFile(fileId)
}

export async function deleteFileDataFromFileFromUser(userId:number) {
    await fileDataRepository.deleteFromFileFromUser(userId)
}