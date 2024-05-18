import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const Schema = mongoose.Schema;

export const ContactOurSupportSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const ContactOurSupportModel = mongoose.model(
  "ContactOurSupport",
  ContactOurSupportSchema
);

export { ContactOurSupportModel };
