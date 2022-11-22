export interface IFileDataInsertDB {
  name: string;
  size: number;
  url: string;
  key: string;
  userId: number;
}

export interface IFileDataReturnDB extends IFileDataInsertDB {
  id: number;
  createdAt: Date;
}
