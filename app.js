import express from "express";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import logger from "morgan";
import passport from "passport";

import router from "./src/routes/index.js";
import { connectDb } from "./src/db/db.js";
import { storage } from "./src/utils/multerConfig.js";
import { PORT, NODE_ENV } from "./src/config/config.js";
import { corsConfig, rateConfig, sessionConfig } from "./src/utils/helpers.js";
import { error404Handler } from "./src/middleware/error_handler.js";

// Initializing Express app
const app = express();

// app.use(authMiddleware);
// Configuration
connectDb();

// Middleware
NODE_ENV === "development" ? app.use(logger("dev")) : null;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); //security middleware
app.set("trust proxy", "loopback"); // Only trust the X-Forwarded-For header from your reverse proxy
app.use(cors(corsConfig));
app.use(rateConfig);
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(router);
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

// Error Handling
app.use(error404Handler);

const multer_upload = multer({ storage });

app.listen(PORT, () => {
  NODE_ENV !== "production"
    ? console.log(`server started on [${NODE_ENV}] mode at port [${PORT}]`)
    : logger.info(`server started on [${NODE_ENV}] mode at port [${PORT}]`);
});
