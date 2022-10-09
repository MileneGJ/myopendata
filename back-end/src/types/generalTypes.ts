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


export type DestinationCallback = (error: Error | null, destination: string) => void
export type FileNameCallback = (error: Error | null, filename: string) => void

export interface IAWSFile extends Express.Multer.File {
  bucket: string;
  key: string;
  acl: string;
  contentType: string|null;
  contentDisposition: string|null;
  storageClass: string;
  serverSideEncryption: string|null,
  metadata:string|undefined;
  location:string;
  etag:string;
  versionId:string|undefined;
}