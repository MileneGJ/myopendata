import { Router } from "express";
import * as authController from '../controllers/authControllers';
import schemaValidation from "../middlewares/schemaValidation";
import { signInSchema, signUpSchema } from "../schemas/authSchemas";

const authRouter = Router()

authRouter.post('/signup',schemaValidation(signUpSchema),authController.createNewUser)
authRouter.post('/signin',schemaValidation(signInSchema),authController.loginUser)

export default authRouter