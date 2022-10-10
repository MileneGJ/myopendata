export interface IFileDataInsertDB {
    name:string,
    size:number,
    url:string,
    key:string
}

export interface IFileDataReturnDB extends IFileDataInsertDB{
    id:number;
    createdAt:Date;
}