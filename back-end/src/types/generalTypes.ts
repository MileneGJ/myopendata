import { IFileDB } from "./fileTypes";

export interface IAppError {
  type: TAppErrorTypes;
  message: string;
}

export type TAppErrorTypes = "conflict" | "not_found" | "unauthorized" | "wrong_schema";

export interface IJWTDecoded {
  payload:number;
  iat:number;
  exp:number
}

export interface IKeywordReturnDB {
  filesKeywords : {
    files: IFileDB
  }[]
}