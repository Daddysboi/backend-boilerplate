import express from "express";

import { sendOtp } from "./controllers.js";
import { OtpValidationMW } from "../../validators/validators.js";

const otpRouter = express.Router();

// send otp
otpRouter.post("/send-otp", OtpValidationMW, sendOtp);

export { otpRouter };
