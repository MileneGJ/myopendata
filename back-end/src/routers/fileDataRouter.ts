import { Router } from "express"
import multer from "multer";
import { fileFilter, storageTypes, uploadPath } from "../utils/multerUtils";
import * as fileDataController from '../controllers/fileDataControllers'

const fileDataRouter = Router()

fileDataRouter.post('/filedata/:id',multer({dest: uploadPath,storage:storageTypes.s3,fileFilter:fileFilter}).single('file'),fileDataController.uploadNewFile)


export default fileDataRouter