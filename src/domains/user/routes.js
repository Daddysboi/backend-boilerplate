import express from "express";

import { VerifyTokenMW } from "../../auth/tokenAuth.js";
import {
  getAllUsers,
  registerUser,
  authenticateUser,
  getUserById,
  changePassword,
  searchUser,
} from "./controllers.js";
import {
  RegisterUserValidationMW,
  AuthenticateUserValidationMW,
  ChangePasswordValidationMW,
} from "../../validators/validators.js";

const userRouter = express.Router();

userRouter.get("/users", VerifyTokenMW, getAllUsers);
userRouter.get("/getUserById/:userId", VerifyTokenMW, getUserById);
userRouter.post("/register", RegisterUserValidationMW, registerUser);
userRouter.post("/signin", AuthenticateUserValidationMW, authenticateUser);
userRouter.patch(
  "/change-password",
  ChangePasswordValidationMW,
  changePassword
);
userRouter.patch("/search-user", ChangePasswordValidationMW, searchUser);

export { userRouter };
