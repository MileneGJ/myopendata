import { Request, Response } from "express";
import * as fileService from "../services/fileServices";
import { IFileAuthorParams, IFileParams } from "../types/fileTypes";

export async function createNewFile(req: Request, res: Response) {
  const file = req.body;
  const { userId } = res.locals;
  const createdFile = await fileService.create(file, userId);
  res.status(201).send(createdFile);
}

export async function returnFiles(req: Request, res: Response) {
  const { userId } = res.locals;
  const { keyword, title, user } = req.query;
  const files = await fileService.getFiles({
    keyword,
    title,
    user,
    userId,
  } as IFileParams);
  res.status(200).send(files);
}

export async function returnAuthorFiles(req: Request, res: Response) {
  const { userId } = res.locals;
  const { authorId } = req.params;
  const files = await fileService.getAuthorFiles({
    authorId: parseInt(authorId),
    userId,
  } as IFileAuthorParams);
  res.status(200).send(files);
}

export async function returnOneFile(req: Request, res: Response) {
  const { userId } = res.locals;
  const { id } = req.params;
  const file = await fileService.getOneFile(userId, Number(id));
  res.status(200).send(file);
}

export async function deleteOneFile(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = res.locals;
  await fileService.deleteOneFile(Number(id), userId);
  res.sendStatus(204);
}
