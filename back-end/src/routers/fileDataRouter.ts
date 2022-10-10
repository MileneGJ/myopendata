import { Router } from "express"
import multer from "multer";
import { fileFilter, storageTypes, uploadPath } from "../utils/multerUtils";
import * as fileDataController from '../controllers/fileDataControllers'
import tokenVerification from "../middlewares/tokenVerification";

const fileDataRouter = Router()

fileDataRouter.use(tokenVerification)
fileDataRouter.post('/filedata/:fileId',multer({dest: uploadPath,storage:storageTypes.s3,fileFilter:fileFilter}).single('file'),fileDataController.uploadNewFile)
fileDataRouter.delete('/filedata/:id',fileDataController.deleteOneFileData)

export default fileDataRouter