import { Router } from "express";
import tokenVerification from "../middlewares/tokenVerification";
import * as usersController from '../controllers/friendsControllers'

const friendsRouter = Router()

friendsRouter.use(tokenVerification)

friendsRouter.post('/friends/:id',usersController.addNewFriend)

export default friendsRouter