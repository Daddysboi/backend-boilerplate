import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Schema = mongoose.Schema;

export const ForgotPasswordSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  resetString: {
    type: String,
    required: true,
  },
  hashedResetString: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    default: Date.now,
  },
});

const ForgotPasswordModel = mongoose.model(
  "ForgotPassword",
  ForgotPasswordSchema
);

export { ForgotPasswordModel };
