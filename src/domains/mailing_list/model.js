import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const Schema = mongoose.Schema;

export const MailingListSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const MailingListModel = mongoose.model("MailingList", MailingListSchema);

export { MailingListModel };
