import * as userRepository from "../repositories/userRepository";
import { IUserBody, IUserDB, TUserLogin } from "../types/userTypes";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
  wrongSchemaError,
} from "../utils/errorUtils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function create(user: IUserBody) {
  const password = await validatePassword(user.password);
  await verifyEmailInUse(user.email);
  return await userRepository.insert({
    name: user.name,
    email: user.email,
    password,
  });
}

async function verifyEmailInUse(email: string) {
  const foundUser = await userRepository.findByEmail(email);
  if (foundUser) {
    throw conflictError("Email already in use");
  }
}

async function validatePassword(password: string) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/;
  if (!regex.test(password)) {
    throw wrongSchemaError(
      "Password must include numbers and letters in lower and upper case"
    );
  }
  return await encryptPassword(password);
}

export async function authenticate(user: TUserLogin) {
  const foundUser = await verifyAuthentication(user);
  return generateToken(foundUser.id);
}

async function verifyAuthentication(user: TUserLogin) {
  const foundUser = await userRepository.findByEmail(user.email);
  const encPassword = foundUser?.password || "";
  const matchPassword = await bcrypt.compare(
    user.password,
    encPassword as string
  );
  if (!matchPassword || !foundUser) {
    throw unauthorizedError("Incorrect email or password");
  }
  return foundUser;
}

export async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  return await bcrypt.hash(password, salt);
}

export function generateToken(payload: number) {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET as string, {
    expiresIn: "12h",
  });
  return token;
}
