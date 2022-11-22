import { FilesFileData } from "@prisma/client";

export interface IFileDB {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: Date;
}

export interface IFileBody {
  title: string;
  description: string;
  csvlink: string[];
  keywords: string[];
}

export type TFileInsertDB = Omit<IFileDB, "id" | "createdAt">;

export interface IFileReturnDB {
  id: number;
  title: string;
  description: string;
  csvlink: {
    filedata: {
      name: string;
      url: string;
    };
  }[];
  users: {
    name: string;
    id: number;
  };
  filesKeywords: {
    keywords: {
      name: string;
    };
  }[];
}

export interface IFileParams {
  keyword: string | undefined;
  title: string | undefined;
  user: string | undefined;
  userId: number;
}
