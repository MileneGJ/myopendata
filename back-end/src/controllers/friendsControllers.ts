import { Request, Response } from "express";
import * as friendService from '../services/friendServices'

export async function addNewFriend (req:Request, res:Response) {
    const {id} = req.params
    const {userId} = res.locals
    const friendLink = await friendService.addNewFriend(Number(id),userId)
    res.status(200).send(friendLink)
}

export async function getNameById (req: Request, res:Response) {
    const {id} = req.query
    const {userId} = res.locals
    const name = await friendService.getUserNameById(Number(id),userId)
    res.status(200).send({name})
}