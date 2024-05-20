import { Router } from "express";

import "../domains/google_auth/auth.js";
import { userRouter } from "../domains/user/routes.js";
import { googleAuthRouter } from "../domains/google_auth/index.js";
import { otpRouter } from "../domains/otp-verification/routes.js";
import { contactRouter } from "../domains/contact_our_support/routes.js";
import { forgotPasswordRouter } from "../domains/forgot_password/routes.js";
import { mailingListRouter } from "../domains/mailing_list/routes.js";

const router = Router();

router.use("/api/v1", googleAuthRouter);
router.use("/api/v1", userRouter);
router.use("/api/v1", otpRouter);
router.use("/api/v1", contactRouter);
router.use("/api/v1", forgotPasswordRouter);
router.use("/api/v1", mailingListRouter);

export default router;
