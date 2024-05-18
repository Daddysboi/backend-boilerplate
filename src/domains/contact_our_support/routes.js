import express from "express";
import { ContactOurSupportMW } from "../../validators/validators";
import { contactOurSupport } from "./controllers";

const router = express.Router();

router.post("/contact-our-support", ContactOurSupportMW, contactOurSupport);

export { router };
