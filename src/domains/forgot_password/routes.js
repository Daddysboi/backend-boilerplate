import express from "express";

import {
  RequestPasswordResetMW,
  PasswordResetMW,
} from "../../validators/validators.js";
import { requestPasswordReset, passwordReset } from "./controllers.js";

const forgotPasswordRouter = express.Router();

forgotPasswordRouter.post(
  "/request-password-reset",
  // RequestPasswordResetMW,
  requestPasswordReset
);
forgotPasswordRouter.post("/password-reset", PasswordResetMW, passwordReset);

export { forgotPasswordRouter };
