import express from "express";
import { MailingListValidationMW } from "../../validators/validators.js";
import { mailingList } from "./controllers.js";

const mailingListRouter = express.Router();

mailingListRouter.post("/mailing-list", MailingListValidationMW, mailingList);

export { mailingListRouter };
