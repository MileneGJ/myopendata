import { Request, Response } from "express";
import * as fileService from '../services/fileServices';
import { IFileParams } from "../types/fileTypes";

export async function createNewFile (req:Request, res:Response) {
    const file = req.body
    const {userId} = res.locals
    const createdFile = await fileService.create(file,userId)
    res.status(201).send(createdFile)
}

export async function returnFiles (req:Request, res:Response) {
    const {userId} = res.locals
    const {keyword, title, user} = req.query
    const files = await fileService.getFiles({keyword,title,user, userId} as IFileParams)
    res.status(200).send(files)
}