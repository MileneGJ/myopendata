import { Request, Response, NextFunction } from "express";
import { AnySchema } from "joi";
import { wrongSchemaError } from "../utils/errorUtils";

export default function schemaValidation (schema:AnySchema) {
    return (req:Request, res:Response, next: NextFunction) => {
        const {error} = schema.validate(req.body)
        if(error) {
            let message = ''
            error.details.map(d=>message += d.message + '; ')
            throw wrongSchemaError(message)
        }
        next()
    }
}