import { NextFunction, Request, Response } from "express";
import { IAppError } from "../types/generalTypes.js";
import {
  errorTypeToStatusCode,
  isAppError,
} from "../utils/errorUtils.js";

export function errorHandler(
  err: Error | IAppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }

  return res.sendStatus(500);
}
