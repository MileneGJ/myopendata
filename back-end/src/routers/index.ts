import { Router } from "express";
import authRouter from "./authRouter";
import filesRouter from "./filesRouter";

const router = Router()

router.use(authRouter)
router.use(filesRouter)

export default router