import bcrypt from "bcrypt";
import { PassportStatic } from "passport";

import { Strategy as LocalStrategy } from "passport-local";
import { IUser, User } from "../model/user.model";

export const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user: IUser, done) => done(null, user.id));

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};
