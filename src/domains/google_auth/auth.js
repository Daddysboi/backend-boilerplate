import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";

import { UserModel } from "../user/model.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      try {
        // Find user by Google ID first
        let existingUser = await UserModel.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        // If no user found by Google ID, attempt to find by email
        existingUser = await UserModel.findOne({
          email: profile.emails[0].value,
        });
        console.log("here");

        if (existingUser) {
          // If user found by email, update their Google ID
          existingUser.googleId = profile.id;
          await existingUser.save();
          return done(null, existingUser);
        }
        console.log("here oooo");

        // If no user found, create a new user
        const newUser = new UserModel({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          googleId: profile.id,
          profilePicture: profile.photos[0].value,
          role: "client", // Default role
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
