import { sendEmail } from "../config/mailer.js";


export const emailVerfication = async ( email, OTP) => {
    const html = `
      <div style="width: 70%; margin: 0 auto; background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif; color: #333; text-align: left; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
         <img src="https://www.example.com/logo.png" alt="Company Logo" style="max-width: 150px;">
        </div>

        <h2 style="color: #007bff;">Email Verification</h2>
        <p>Thank You for registering with us.</p>
        <p>Please use the otp below to verify your email address </p>
        <h1 style="color: #007bff; font-size: 36px; margin: 10px;">${OTP}</h1>
        <p>Please keep this code secure and do not share it with anyone.</p>
        <p>If you did not request this change, please ignore this email.</p>
        <p>Best Regards,<br>HireLucy</p>
      </div>
    `;

    return await sendEmail(
        "HireLucy <gohirelucy@gmail.com>",
        email,
        "Email Verification",
        html,
        "gohirelucy@gmail.com"
    );
};
