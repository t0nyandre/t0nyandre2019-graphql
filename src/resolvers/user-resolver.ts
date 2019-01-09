import { User, registerValidation } from "../models/user";
import {
  invalidVerificationTokenError,
  invalidLoginError,
  userNotExistError,
  accountNotVerifiedError,
  accountAlreadyVerifiedError,
} from "../error-messages";
// import { verifyAccountMail } from "../mails/verifyAccountMail";
// import { transporter } from "../../config/nodemailer";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
// tslint:disable-next-line
require("dotenv").config();

export default {
  Query: {
    me: (_: any, __: any, { req }: any) => {
      return User.findOne(req.session.userId);
    },
  },
  Mutation: {
    register: async (_: any, args: any) => {
      const { username, email, password } = args.input;

      await registerValidation.validate(
        { username, email, password },
        {
          abortEarly: false,
        },
      );

      let user = User.create({ username, email, password });

      try {
        user = await User.save(user);
      } catch (error) {
        return error;
      }

      const hashedId = jwt.sign(
        { data: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "2 days" },
      );

      // transporter.sendMail(verifyAccountMail(user.email, hashedId));
      console.log(hashedId); // don't want to be spamming my mail so logging the id needed to verify account onto the
      // terminal.

      return user;
    },
    logout: async (_: any, __: any, { req, res }: any) => {
      req.session.destroy();
      await res.clearCookie(process.env.SESSION_NAME);

      return true;
    },
    verify: async (_: any, args: any, { req }: any) => {
      let decoded: any;

      try {
        decoded = await jwt.verify(args.input.hashedId, process.env
          .JWT_SECRET as string);
      } catch (error) {
        return invalidVerificationTokenError;
      }

      const user = await User.findOne(decoded.data);

      if (!user) {
        return userNotExistError;
      }

      if (user.confirmed) {
        return accountAlreadyVerifiedError;
      }

      user.confirmed = true;
      await User.save(user);

      req.session.userId = user.id;
      req.session.userRole = user.role;

      return user;
    },
    login: async (_: any, args: any, { req }: any) => {
      const user = await User.findOne({ email: args.input.email });
      if (!user) {
        throw invalidLoginError();
      }

      const valid = await argon2.verify(user.password, args.input.password);
      if (!valid) {
        throw invalidLoginError();
      }

      if (!user.confirmed) {
        throw accountNotVerifiedError();
      }

      req.session.userId = user.id;
      req.session.userRole = user.role;
      return user;
    },
  },
};
