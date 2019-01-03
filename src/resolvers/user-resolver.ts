import { User } from "../models/user";
import {
  verificationEmailNotSentError,
  invalidVerificationTokenError,
  invalidLoginError,
  userNotExistError,
  accountNotVerifiedError,
  accountAlreadyVerifiedError,
  usernameTakenError,
  emailExistError,
} from "../error-messages";
import { verifyAccountMail } from "../mails/verifyAccountMail";
import { transporter } from "../../config/nodemailer";
import { getConnection } from "typeorm";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import * as Auth from "../auth";
// tslint:disable-next-line
require("dotenv").config();

export default {
  Query: {
    me: async (_: any, __: any, { req }: any) => {
      Auth.checkSignedIn(req);

      return User.findOne(req.session.userId);
    },
  },
  Mutation: {
    register: async (_: any, args: any) => {
      let user = User.create({
        ...args.input,
      });

      try {
        user = await User.save(user);
      } catch (error) {
        if (error.detail.search(/username/gi) !== -1) {
          throw usernameTakenError();
        } else if (error.detail.search(/email/gi) !== -1) {
          throw emailExistError();
        } else {
          return error;
        }
      }

      const hashedId = jwt.sign({
        data: user.id,
      },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "2 days",
        },
      );

      try {
        await transporter.sendMail(verifyAccountMail(user.email, hashedId));
      } catch (error) {
        throw verificationEmailNotSentError();
      }

      return user;
    },
    logout: async (_: any, __: any, { req, res }: any) => {
      Auth.checkSignedIn(req);

      req.session.destroy();
      await res.clearCookie(process.env.SESSION_NAME);

      return true;
    },
    verify: async (_: any, args: any, { req }: any) => {
      let decoded: any;

      try {
        decoded = await jwt.verify(args.input.hashedId, process.env.JWT_SECRET as string);
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

      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ confirmed: true })
        .where("id = :id", { id: decoded.data })
        .execute();

      req.session.userId = user.id;
      req.session.userRole = user.role;
      return user;
    },
    login: async (_: any, args: any, { req }: any) => {
      Auth.checkSignedOut(req);

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
