import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation";
import tokenVerification from "../middlewares/tokenVerification";
import { newFileSchema } from "../schemas/fileSchemas";
import * as filesController from "../controllers/filesControllers";

const filesRouter = Router();

filesRouter.use(tokenVerification);

filesRouter.post(
  "/files",
  schemaValidation(newFileSchema),
  filesController.createNewFile
);
filesRouter.get("/files", filesController.returnFiles);
filesRouter.get("/files/author/:authorId", filesController.returnAuthorFiles);
filesRouter.get("/files/:id", filesController.returnOneFile);
filesRouter.delete("/files/:id", filesController.deleteOneFile);

export default filesRouter;
