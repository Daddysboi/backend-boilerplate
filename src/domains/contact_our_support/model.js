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

async function sendNotificationEmail(clientEmail, supportEmail, message) {
  try {
    const clientHtml = `
    <div style="width: 70%; margin: 0 auto; background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif; color: #333; text-align: left; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://www.example.com/logo.png" alt="Company Logo" style="max-width: 150px;">
      </div>
      <p>Thank you for contacting support!</p>
      <p>We have received your message and will get back to you as soon as possible.</p>
      <p>If you have any urgent issues or questions, feel free to reach out to us directly.</p>
      <p>Best regards,<br/>Your Support Team</p>
    </div>
  `;

    const supportHtml = `
      <div style="width: 70%; margin: 0 auto; background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif; color: #333; text-align: left; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://www.example.com/logo.png" alt="Company Logo" style="max-width: 150px;">
        </div>
        <p>You have received a new support message from ${clientEmail}:</p>
        <p>${message}</p>
        <p>Please respond to the client as soon as possible.</p>
        <p>Best regards,<br/>Support Team</p>
      </div>
    `;
    // Send email to client
    await sendEmail({
      from: process.env.AUTH_EMAIL,
      to: clientEmail,
      subject: "Contact Support",
      html: clientHtml,
    });

    // Send email to support team
    await sendEmail({
      from: process.env.AUTH_EMAIL,
      to: supportEmail,
      subject: "New Support Message",
      html: supportHtml,
    });
  } catch (err) {
    console.log("Error occurred while sending password notification email");
    throw err;
  }
}

ContactOurSupportSchema.pre("save", async function (next) {
  console.log("New document saved to the database");

  if (this.isNew) {
    const supportEmail = process.env.SUPPORT_EMAIL;
    await sendNotificationEmail(this.email, supportEmail, this.message);
  }
  next();
});

const ContactOurSupportModel = mongoose.model(
  "ContactOurSupport",
  ContactOurSupportSchema
);

export { ContactOurSupportModel };
