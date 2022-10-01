export interface IFileDB {
    id: number;
    title: string;
    description: string;
    csvlink: string;
    userId: number;
    createdAt: Date;
}

export interface TFileBody {
    title: string;
    description: string;
    csvlink: string;
    keywords:string[];
}

export type TFileInsertDB = Omit<IFileDB,'id' | 'createdAt'>