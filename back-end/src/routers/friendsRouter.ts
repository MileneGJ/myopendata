import { Router } from "express";
import tokenVerification from "../middlewares/tokenVerification";
import * as friendsController from '../controllers/friendsControllers'

const friendsRouter = Router()

friendsRouter.use(tokenVerification)

friendsRouter.post('/friends/:id',friendsController.addNewFriend)
friendsRouter.get('/user',friendsController.getNameById)

export default friendsRouter