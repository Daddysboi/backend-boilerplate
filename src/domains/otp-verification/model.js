import dotenv from "dotenv";
import mongoose from "mongoose";
import { sendEmail } from "../../config/mailer.js";

dotenv.config();

//Define a schema
const Schema = mongoose.Schema;

const OtpModelSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes
  },
});

//Define a function to send otp emails
async function sendOtpVerificationEmail(email, otp) {
  try {
    const html = `
    <div style="width: 70%; margin: 0 auto; background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif; color: #333; text-align: left; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 20px;">
     <img src="https://www.example.com/logo.png" alt="Company Logo" style="max-width: 150px;">
    </div>

    <h2 style="color: #007bff;">Email Verification</h2>
    <p>Thank You for registering with us.</p>
    <p>Please use the otp below to verify your email address </p>
    <h1 style="color: #007bff; font-size: 36px; margin: 10px;">${otp}</h1>
    <p>Please keep this code secure and do not share it with anyone.</p>
    <p>If you did not request this change, please ignore this email.</p>
    <p>Best Regards,<br>Tems</p>
  </div>
    `;

    await sendEmail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Email Verification",
      html: html,
    });
  } catch (err) {
    console.log("Error occurred while sending otp verification email");
    throw err;
  }
}

//Define a function to send emails
OtpModelSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document has been created.
  if (this.isNew) {
    await sendOtpVerificationEmail(this.email, this.otp);
  }
  next();
});

const OtpModel = mongoose.model("OtpModel", OtpModelSchema);

export { OtpModel };
