import mongoose from "mongoose";
import { logger } from "../middleware/logger.js";
import { NODE_ENV, MONGODB_URL } from "../config/config.js";

export const connectDb = async () => {
  try {
    const Connect = await mongoose.connect(MONGODB_URL);

    NODE_ENV !== "production"
      ? console.log(`Development DB connected @ ${Connect.connection.host}`)
      : logger.info(`Production DB connected @ ${Connect.connection.host}`);
  } catch (error) {
    NODE_ENV !== "production"
      ? console.log(`DB connection failed ${error}`)
      : logger.error(`DB connection failed ${error}`);

    process.exit(1);
  }
};
