import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IJWTDecoded } from '../types/generalTypes'
import { unauthorizedError } from '../utils/errorUtils'

export default function tokenVerification (req:Request, res:Response, next:NextFunction) {
    const {authorization} = req.headers
    if(!authorization) throw unauthorizedError('Missing authorization header')
    const token = authorization.replace('Bearer ','')
    if(!token) throw unauthorizedError('Missing token')
    const SECRET = process.env.JWT_SECRET
    const id = jwt.verify(token as string,SECRET as string,jwtHandler as any)
    res.locals.userId = id
    next()
}

function jwtHandler (error:string|undefined, decoded:IJWTDecoded|undefined):number {
    if (error) throw unauthorizedError('Invalid token')
    const success =  decoded as IJWTDecoded
    return success.payload
}