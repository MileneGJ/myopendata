import { Router } from "express";
import tokenVerification from "../middlewares/tokenVerification";
import * as userController from "../controllers/userControllers";

const userRouter = Router();

userRouter.use(tokenVerification);

userRouter.get("/user", userController.getNameById);
userRouter.delete("/user", userController.deleteUser);

export default userRouter;
