import { Router } from "express";
import passport from "passport";

import "./auth.js";
import { redirect } from "./controller.js";

const googleAuthRouter = Router();

googleAuthRouter.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with google</a>');
});

googleAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleAuthRouter.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  redirect
);

// googleAuthRouter.get('/logout', (req, res) => {
//   req.logout()
//   res.redirect('/')
// })

export { googleAuthRouter };
