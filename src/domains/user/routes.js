import express from "express";

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
import { VerifyTokenMW } from "../../auth/tokenAuth.js";

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
userRouter.patch("/search-user", searchUser);

export { userRouter };
