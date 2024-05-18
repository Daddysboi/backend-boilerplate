import { Router } from "express";

import "../auth/auth.js";
import { userRouter } from "../domains/user/routes.js";
import { googleAuthRouter } from "../domains/googleAuth/index.js";
import { otpRouter } from "../domains/otp-verification/routes.js";

const router = Router();

router.use("/auth/google", googleAuthRouter);
router.use("/auth/v1", userRouter);
router.use("/auth/v1", otpRouter);

export default router;
