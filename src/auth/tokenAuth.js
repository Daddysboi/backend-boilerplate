import jwt from "jsonwebtoken";

import { config } from "./auth0.js";

const VerifyTokenMW = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    console.log("Failed authentication attempt: No token provided");
    return res
      .status(401)
      .json({ message: "Access Denied", status: 401 })
      .redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, config.secretKey);
    if (decoded && decoded.user !== null && decoded.user !== undefined) {
      const { id, username } = decoded.user;
      req.user = {
        id,
        username,
      };
    }
    next();

    next();
  } catch (error) {
    next({
      message: error.message || "Unauthorized access",
      status: 400,
    });
  }
};

export { VerifyTokenMW };
