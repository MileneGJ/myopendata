import { Request, Response } from "express";
import * as fileDataService from '../services/fileDataServices'
import { IAWSFile } from "../types/generalTypes";

export async function uploadNewFile (req:Request, res:Response) {
    const file = req.file
    const {fileId} = req.params
    const uploadedFile = await fileDataService.uploadFile(file as IAWSFile,Number(fileId))
    res.status(200).send(uploadedFile)
}

export async function deleteOneFileData (req:Request, res:Response) {
    const {id} = req.params
    await fileDataService.deleteFileData(Number(id))
    res.sendStatus(204)
}