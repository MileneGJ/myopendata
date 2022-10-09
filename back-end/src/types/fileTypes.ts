import { IFileDataReturnDB } from "./fileDataTypes";

export interface IFileDB {
    id: number;
    title: string;
    description: string;
    csvlink: string;
    userId: number;
    createdAt: Date;
}

export interface IFileBody {
    title: string;
    description: string;
    csvlink: string;
    keywords:string[];
}

export type TFileInsertDB = Omit<IFileDB,'id' | 'createdAt'>

export interface IFileReturnDB {
    id: number;
    title: string;
    description: string;
    csvlink: IFileDataReturnDB[];
    users: {
        name:string;
    };
    filesKeywords:{
        keywords:{
            name:string;
        }
    }[]
}

export interface IFileParams {
    keyword: string | undefined;
    title: string | undefined;
    user: string | undefined;
    userId:number;
}