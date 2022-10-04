import { Request, Response } from "express";
import * as userService from '../services/friendServices'

export async function addNewFriend (req:Request, res:Response) {
    const {id} = req.params
    const {userId} = res.locals
    const friendLink = await userService.addNewFriend(Number(id),userId)
    res.status(200).send(friendLink)
}