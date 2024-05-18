import { sendEmail } from "../../config/mailer";
import { ForgotPasswordSchema } from "./model";

async function sendVerificationEmail(email, redirectUrl, userId, resetString) {
  try {
    const html = `
      <div style="width: 70%; margin: 0 auto; background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif; color: #333; text-align: left; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://www.example.com/logo.png" alt="Company Logo" style="max-width: 150px;">
      </div>
      <h2 style="color: #007bff;">Password Reset</h2>
      <p>Hello,</p>
      <p>Please click the following link to reset your password:</p>
      <a${
        redirectUrl + "/" + userId + "/" + resetString
      } target="_blank style="color: #007bff; text-decoration: none;">Reset Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Best Regards,<br>Tems Corporation</p>
    </div>`;

    await sendEmail(
      "Tweetbytems <temitopeahmedyusuf@gmail.com>",
      email,
      "Password Reset",
      html,
      "temitopeahmedyusuf@gmail.com"
    );
  } catch (err) {
    console.log("Error occurred while sending password verification email");
    throw err;
  }
}

ForgotPasswordSchema.pre("save", async function (next) {
  console.log("New document saved to the database");

  if (this.isNew) {
    await sendVerificationEmail(
      this.email,
      this.redirectUrl,
      this.userId,
      this.resetString
    );
  }
  next();
});
