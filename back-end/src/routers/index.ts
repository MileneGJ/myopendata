import { Router } from "express";
import authRouter from "./authRouter";
import fileDataRouter from "./fileDataRouter";
import filesRouter from "./filesRouter";
import friendsRouter from "./friendsRouter";
import userRouter from "./userRouter";

const router = Router()

router.use(authRouter)
router.use(filesRouter)
router.use(friendsRouter)
router.use(userRouter)
router.use(fileDataRouter)

export default router