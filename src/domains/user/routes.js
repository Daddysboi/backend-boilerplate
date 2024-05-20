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
  SearchUserValidationMW,
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
userRouter.post("/search-user", SearchUserValidationMW, searchUser);

export { userRouter };
