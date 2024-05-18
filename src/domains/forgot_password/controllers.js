import { v4 as uuidv4 } from "uuid";
import userModel from "../user/model";
import {ForgotPasswordModel} from "./model";
import hashedData from "../../utils/hashedData";
import verifyHashedData from "../../utils/verifyHashedData";
import dotenv from "dotenv";

dotenv.config();

async function requestPasswordReset(req, res) {
  let { email, redirectUrl } = req.body;
  try {
    const fetchedUser = await userModel.find({ email });
    if (!fetchedUser?.length) {
      return res.json({
        message: "No account with the supplied email exist",
        status: 401,
      });
    }

    const { _id, email: fetchedUserEmail } = fetchedUser[0];
    const resetString = uuidv4() + _id;
    await ForgotPasswordModel.deleteMany({ userId: _id });

    const hashedResetString = await hashedData(resetString);
    const newPasswordReset = new ForgotPasswordModel({
      email: fetchedUserEmail,
      userId: _id,
      resetString,
      hashedResetString,
      redirectUrl: redirectUrl,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000,
    });

    await newPasswordReset.save();

    res.json({
      message: "Reset password mail sent successfully",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Something went wrong while sending reset password email",
      status: 500,
    });
  }
}

async function passwordReset(req, res) {
  let { userId, resetString, newPassword } = req.body;
  try {
    const passwordReset = await ForgotPasswordModel.find({ userId });
    if (passwordReset?.length > 0) {
      const { expiredAt } = passwordReset[0];
      const hashedResetString = passwordReset[0].hashedResetString;
      if (expiredAt < Date.now()) {
        await PasswordReset.deleteOne({ userId });
        return res.json({
          message: "Password reset link has expired",
          status: 401,
        });
      }

      const resetStringMatch = await verifyHashedData(
        resetString,
        hashedResetString
      );

      if (!resetStringMatch) {
        return res.json({
          message: "Invalid password reset details provided",
          status: 401,
        });
      }
      const hashedNewPassword = await hashedData(newPassword);
      await userModel.updateOne(
        { _id: userId },
        { password: hashedNewPassword }
      );
      await ForgotPasswordModel.deleteOne({ userId });
      res.json({
        message: "Password updated successfully",
        status: 200,
      });
    } else {
      res.json({
        message: "Password reset request not found",
        status: 401,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong while resetting your password",
      status: 500,
    });
  }
}

export { requestPasswordReset, passwordReset };
