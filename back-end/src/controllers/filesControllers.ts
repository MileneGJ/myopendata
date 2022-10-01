import { Request, Response } from "express";
import * as fileService from '../services/fileServices'

export async function createNewFile (req:Request, res:Response) {
    const file = req.body
    const {userId} = res.locals
    const createdFile = await fileService.create(file,userId)
    res.status(201).send(createdFile)
}