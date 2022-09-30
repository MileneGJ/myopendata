import { Request, Response } from "express";
import * as authService from '../services/authServices'

export async function createNewUser (req: Request, res:Response) {
    const user = req.body
    const createdUser = authService.create(user)
    res.status(201).send(createdUser)
}

export async function loginUser (req: Request, res:Response) {
    const user = req.body
    const token = authService.authenticate(user)
    res.status(200).send(token)
}