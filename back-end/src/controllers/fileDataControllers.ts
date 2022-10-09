import { Request, Response } from "express";
import * as fileDataService from '../services/fileDataServices'
import { IAWSFile } from "../types/generalTypes";

export async function uploadNewFile (req:Request, res:Response) {
    const file = req.file
    const {id} = req.params
    const uploadedFile = await fileDataService.uploadFile(file as IAWSFile,Number(id))
    res.status(200).send(uploadedFile)
}