import { Request, Response } from "express";
import * as userService from '../services/userServices'

export async function getNameById (req: Request, res:Response) {
    const {id} = req.query
    const {userId} = res.locals
    const name = await userService.getUserNameById(Number(id),userId)
    res.status(200).send({name})
}

export async function deleteUser (req:Request, res:Response) {
    const {userId} = res.locals
    await userService.deleteUserById(userId)
    res.sendStatus(204)
}