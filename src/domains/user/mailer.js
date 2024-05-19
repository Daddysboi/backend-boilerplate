import { sendEmail } from "../../config/mailer.js";

export const sendWelcomeEmail = async (email, firstName) => {
  try {
    const html = `
    <div style="width: 70%; margin: 0 auto; background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif; color: #333; text-align: left; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://www.example.com/logo.png" alt="Company Logo" style="max-width: 150px;">
      </div>
      <h2 style="color: #007bff;">Welcome to Our Service, ${firstName} ${lastName}!</h2>
      <p>Thank you for registering with us.</p>
      <p>We are excited to have you on board.</p>
      <p>If you have any questions or need assistance, feel free to contact our support team.</p>
      <p>Best Regards,<br>Tems</p>
    </div>
    `;

    await sendEmail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Welcome to Our Service!",
      html: html,
    });
  } catch (err) {
    console.log("Error occurred while sending welcome email");
    throw err;
  }
};
