import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//nodemailer transporter
let transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.PASSWORD,
  },
});
// const transporter = createTransport({
//   host: process.env.SMTP_SERVER,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.BREVO_LOGIN,
//     pass: process.env.BREVO_PASSWORD,
//   },
// });

// test transporter
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for message");
    console.log(success);
  }
});

const sendEmail = async ({ from, to, subject, html, replyTo }) => {
  try {
    const emailSent = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      replyTo,
    });
    return emailSent;
  } catch (e) {
    throw e;
  }
};

export { sendEmail };
