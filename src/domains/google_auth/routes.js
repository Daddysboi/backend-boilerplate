import { Router } from "express";
import passport from "passport";

import "./auth.js";
import { redirect } from "./controller.js";

const googleAuthRouter = Router();

googleAuthRouter.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleAuthRouter.get("/redirect", passport.authenticate("google"), redirect);

export { googleAuthRouter };
