import { sendEmail } from "../../config/mailer";
import { MailingListSchema } from "./model";

async function sendConfirmationEmail(email) {
  try {
    const html = `<p>Thank you for subscribing to our mailing list!</p>
             <p>You are now part of our community and will receive updates, news, and special offers directly in your inbox.</p>
             <p>If you have any questions or concerns, feel free to contact us.</p>
             <p>Best regards,<br/>Your Mailing List Team</p>`;

    await sendEmail(
      "tems <temitopeahmedyusuf@gmail.com>",
      email,
      "Subscription Confirmation",
      html,
      "temitopeahmedyusuf@gmail.com"
    );
  } catch (err) {
    console.log(
      "Error occurred while sending password mail list confirmation email"
    );
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
