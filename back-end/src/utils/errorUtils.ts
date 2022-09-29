import { IAppError, TAppErrorTypes } from "../types/generalTypes";


export function isAppError(error: object): error is IAppError {
  return (error as IAppError).type !== undefined;
}

export function errorTypeToStatusCode(type: TAppErrorTypes) {
  if (type === "conflict") return 409;
  if (type === "not_found") return 404;
  if (type === "unauthorized") return 401;
  if (type === "wrong_schema") return 422;
  return 400;
}

export function conflictError(message?: string): IAppError {
  return { type: "conflict", message: message ?? "" };
}

export function notFoundError(message?: string): IAppError {
  return { type: "not_found", message: message ?? "" };
}

export function unauthorizedError(message?: string): IAppError {
  return { type: "unauthorized", message: message ?? "" };
}

export function wrongSchemaError(message?: string): IAppError {
  return { type: "wrong_schema", message: message ?? "" };
}
