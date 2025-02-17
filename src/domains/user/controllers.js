import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { hashedData, verifyHashedData } from "../../utils/utils.js";
import {
  sendWelcomeEmail,
  sendSignInEmail,
  sendPasswordUpdateEmail,
} from "./mailer.js";

// Models
import { UserModel } from "./model.js";
import { OtpModel } from "../otp-verification/model.js";

async function registerUser(req, res) {
  const user = req.body;
  const { firstName, lastName, email, password, role, otp } = user;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.json({
        status: 400,
        message: "User with the provided email already exists",
      });
    }

    const otpResponse = await OtpModel.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (otpResponse.length === 0 || otp !== otpResponse[0].otp) {
      return res.json({
        status: 400,
        message: "The OTP is not valid",
      });
    }

    const hashedPassword = await hashedData(password);
    user.lastUpdateAt = new Date();

    if (!UserModel.schema.path("role").enumValues.includes(role)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid role value",
      });
    } else {
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword,
      });
      const createdUser = await newUser.save();

      await sendWelcomeEmail(email, firstName); // Send a welcome mail notification to the user
      res.json({
        data: createdUser,
        status: 201,
        message: "User created successfully",
      });
    }
  } catch (err) {
    console.log(err, err.message);
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}

function getAllUsers(req, res) {
  UserModel.find()
    .then((users) => {
      res.json({
        data: {
          users: users,
        },
        status: 200,
        message: "Users fetched successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

async function authenticateUser(req, res) {
  const { email, password } = req.body;
  try {
    const fetchedUser = await UserModel.find({ email });
    if (!fetchedUser?.length) {
      return res.json({
        message: "Invalid credentials entered",
        status: 401,
      });
    }
    const hashedPassword = fetchedUser[0].password;
    const fetchedUserId = fetchedUser[0]._id;
    const passwordMatch = await verifyHashedData(password, hashedPassword);

    if (!passwordMatch) {
      return res.json({
        message: "Invalid password entered",
        status: 401,
      });
    }

    const token = jwt.sign({ userId: fetchedUserId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await sendSignInEmail(email); // TO DO: send a sign in alert mail notification to the user

    res.json({
      data: {
        user: fetchedUser,
        token: token,
      },
      message: "Signed in successfully",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.json({
        status: 401,
        message: "User not found",
      });
    }

    return res.json({
      status: 200,
      message: "User fetched successfully",
      data: {
        user,
      },
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

async function changePassword(req, res) {
  const { userId, newPassword, oldPassword } = req.body;
  try {
    let user = await UserModel.findById(userId);

    if (!user) {
      return res.json({
        status: 401,
        message: "User not found",
      });
    }

    const hashedPassword = user?.password;

    const resetPasswordMatch = await verifyHashedData(
      oldPassword,
      hashedPassword
    );

    if (!resetPasswordMatch) {
      return res.json({
        message: "Something went wrong",
        status: 401,
      });
    }
    const hashedNewPassword = await hashedData(newPassword);
    await UserModel.updateOne({ _id: userId }, { password: hashedNewPassword });

    await sendPasswordUpdateEmail(email); // TO DO: send a sign in alert mail notification to the user

    res.json({
      message: "Password updated successfully",
      status: 200,
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

const searchUser = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.query
      ? {
          $or: [
            { firstName: { $regex: query, $options: "i" } },
            { lastName: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        }
      : {};
    const users = await UserModel.find(keyword);

    if (!users.length) {
      return res.status(404).json({
        message: "No user found!",
      });
    }

    res.json({
      data: users,
      status: 200,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
});

export {
  getAllUsers,
  registerUser,
  authenticateUser,
  getUserById,
  changePassword,
  searchUser,
};
