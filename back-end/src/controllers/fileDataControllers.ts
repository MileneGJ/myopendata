import { Request, Response } from "express";
import * as fileDataService from "../services/fileDataServices";
import { IAWSFile } from "../types/generalTypes";

export async function uploadNewFile(req: Request, res: Response) {
  const { userId } = res.locals;
  const file = req.file;
  const uploadedFile = await fileDataService.uploadFile(
    file as IAWSFile,
    userId
  );
  res.status(200).send(uploadedFile);
}

export async function deleteOneFileData(req: Request, res: Response) {
  const { id } = req.params;
  await fileDataService.deleteFileData(Number(id));
  res.sendStatus(204);
}

export async function listOrphanData(req: Request, res: Response) {
  const { userId } = res.locals;
  const files = await fileDataService.getOrphansFromUser(userId);
  res.status(200).send(files);
}
