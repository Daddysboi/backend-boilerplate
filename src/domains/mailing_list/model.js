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
    const html = `
    
    <div style="width: 70%; margin: 0 auto; background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif; color: #333; text-align: left; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 20px;">
     <img src="https://www.example.com/logo.png" alt="Company Logo" style="max-width: 150px;">
     </div>

     <h2>Thank you for subscribing to our mailing list!</h2>
     <p>You are now part of our community and will receive updates, news, and special offers directly in your inbox.</p>
     <p>If you have any questions or concerns, feel free to contact us.</p>
     <p>Best regards,<br/>Tems</p>
     
     </div>
     `;

    await sendEmail({
      from: process.env.AUTH_EMAIL,
      to: email,
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
    console.log("New document saved to the database");
  }
  next();
});

const MailingListModel = mongoose.model("MailingList", MailingListSchema);

export { MailingListModel };
