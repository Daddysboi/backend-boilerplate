import express from "express";
import { requestPasswordReset, passwordReset } from "./controllers";
import {
  RequestPasswordResetMW,
  PasswordResetMW,
} from "../../validators/validators";

const router = express.Router();  

router.post(
  "/request-password-reset",
  RequestPasswordResetMW,
  requestPasswordReset
);
router.post("/password-reset", PasswordResetMW, passwordReset);

export { router };
