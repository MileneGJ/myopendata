import { IAWSFile } from "../types/generalTypes"
import * as fileDataRepository from '../repositories/fileDataRepository'

export async function uploadFile (file:IAWSFile, fileId:number) {
    const {originalname:name, key, size, location:url} = file
    const infoForUpload = {name, key, size, url, fileId}
    const updatedFile = await fileDataRepository.upload(infoForUpload)
    return updatedFile
}