import { Router } from "express";
import authRouter from "./authRouter";
import filesRouter from "./filesRouter";
import friendsRouter from "./friendsRouter";

const router = Router()

router.use(authRouter)
router.use(filesRouter)
router.use(friendsRouter)

export default router