import express from "express";
import { ContactOurSupportMW } from "../../validators/validators.js";
import { contactOurSupport } from "./controllers.js";

const contactRouter = express.Router();

contactRouter.post(
  "/contact-our-support",
  ContactOurSupportMW,
  contactOurSupport
);

export { contactRouter };
