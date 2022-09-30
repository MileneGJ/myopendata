import { Request, Response, NextFunction } from "express";
import { IAppError } from "../types/generalTypes";
import {
  errorTypeToStatusCode,
  isAppError,
} from "../utils/errorUtils";

export function errorHandler(
  err: IAppError,
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
