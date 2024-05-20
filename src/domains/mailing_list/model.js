import mongoose from "mongoose";
import dotenv from "dotenv";

import { sendEmail } from "../../config/mailer.js";

dotenv.config();
const Schema = mongoose.Schema;

const MailingListSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

async function sendConfirmationEmail(email) {
  try {
    const html = `<p>Thank you for subscribing to our mailing list!</p>
             <p>You are now part of our community and will receive updates, news, and special offers directly in your inbox.</p>
             <p>If you have any questions or concerns, feel free to contact us.</p>
             <p>Best regards,<br/>Tems</p>`;

    await sendEmail({
      from: process.env.AUTH_EMAIL,
      email,
      subject: "Subscription Confirmation",
      html,
    });
  } catch (err) {
    console.log("Error occurred while subscribing to mailing list");
    throw err;
  }
}

MailingListSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  if (this.isNew) {
    await sendConfirmationEmail(this.email);
  }
  next();
});

const MailingListModel = mongoose.model("MailingList", MailingListSchema);

export { MailingListModel };
