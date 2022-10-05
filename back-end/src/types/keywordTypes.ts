import { IFileReturnDB } from "./fileTypes"

export interface IKeywordReturnDB {
    filesKeywords : {
      files: IFileReturnDB
    }[]
  }