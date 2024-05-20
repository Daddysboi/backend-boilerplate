import mongoose from "mongoose";
import dotenv from "dotenv";

import { sendEmail } from "../../config/mailer.js";

dotenv.config();
const Schema = mongoose.Schema;

const ContactOurSupportSchema = new Schema({
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

async function sendNotificationEmail(email) {
  try {
    const html = `<p>Thank you for contacting support!</p>
         <p>We have received your message and will get back to you as soon as possible.</p>
         <p>If you have any urgent issues or questions, feel free to reach out to us directly.</p>
         <p>Best regards,<br/>Your Support Team</p>`;

    await sendEmail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Contact Support",
      html,
    });
  } catch (err) {
    console.log("Error occurred while sending password notification email");
    throw err;
  }
}

ContactOurSupportSchema.pre("save", async function (next) {
  console.log("New document saved to the database");

  if (this.isNew) {
    await sendNotificationEmail(this.email);
  }
  next();
});

const ContactOurSupportModel = mongoose.model(
  "ContactOurSupport",
  ContactOurSupportSchema
);

export { ContactOurSupportModel };
