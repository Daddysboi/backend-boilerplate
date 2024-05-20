import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";

import { UserModel } from "../user/model.js";

dotenv.config();

//stores user into a cookie when sending to the client
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//coverts cookie into a user when coming back to our server
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exist in db
      UserModel.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          //user already exists
          console.log("user is", currentUser);
          done(null, currentUser);
        } else {
          //create new use in db
          new User({
            name: profile.displayName,
            googleId: profile.id,
            profilePicture: profile._json.image.url,
          })
            .save()
            .then((newUser) => {
              console.loog("new user created:", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
