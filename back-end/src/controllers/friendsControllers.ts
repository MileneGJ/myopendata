import { Request, Response } from "express";
import * as friendService from '../services/friendServices'

export async function addNewFriend (req:Request, res:Response) {
    const {id} = req.params
    const {userId} = res.locals
    const friendLink = await friendService.addNewFriend(Number(id),userId)
    res.status(200).send(friendLink)
}
