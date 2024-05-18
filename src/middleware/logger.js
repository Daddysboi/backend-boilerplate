import winston from "winston";
import fs from "fs";
import path from "path";

// Ensure log directory exists
const logDir = "./logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const options = {
  file: {
    level: "info",
    filename: path.join(logDir, "app.log"),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    // new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export { logger };
