export interface IUserDB {
    id:number;
    name:string;
    email:string;
    password:string;
    createdAt:Date;
}

export interface IUserBody {
    name:string;
    email:string;
    password:string;
    confirmPassword: string;
}

export type TUserInsertDB = Omit<IUserDB, 'id' | 'createdAt'>
export type TUserLogin = Omit<IUserBody, 'confirmPassword' | "name">