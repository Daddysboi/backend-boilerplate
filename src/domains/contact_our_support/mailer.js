import { sendEmail } from "../../config/mailer";
import { ContactOurSupportSchema } from "./model";

async function sendNotificationEmail(email) {
  try {
    const html = `<p>Thank you for contacting support!</p>
         <p>We have received your message and will get back to you as soon as possible.</p>
         <p>If you have any urgent issues or questions, feel free to reach out to us directly.</p>
         <p>Best regards,<br/>Your Support Team</p>`;

    await sendEmail(
      "Tweetbytems <temitopeahmedyusuf@gmail.com>",
      email,
      "Contact Support",
      html,
      "temitopeahmedyusuf@gmail.com"
    );
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
