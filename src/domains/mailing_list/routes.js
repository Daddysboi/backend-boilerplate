import express from "express";
import { MailingListValidationMW } from "../../validators/validators";
import { mailingList } from "./controllers.js";

const router = express.Router();

router.post("/mailing-list", MailingListValidationMW, mailingList);

export { router };
