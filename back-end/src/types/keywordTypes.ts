import { IFileDB } from "./fileTypes"

export interface IKeywordReturnDB {
    filesKeywords : {
      files: IFileDB
    }[]
  }