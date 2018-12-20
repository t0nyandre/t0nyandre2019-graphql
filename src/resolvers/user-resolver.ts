import { User } from "../entity/User";
import {
  verificationEmailNotSentError,
  invalidVerificationToken,
  invalidLoginError,
  userNotExistError,
  notLoggedInError,
  accountNotVerifiedError,
  accountAlreadyVerifiedError,
} from "../error-messages";
import { verifyAccountMail } from "../mails/verifyAccountMail";
import { transporter } from "../../config/nodemailer";
import { getConnection } from "typeorm";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
// tslint:disable-next-line
require("dotenv").config();

export default {
  Query: {
    me: async (_: any, __: any, { req }: any) => {
      if (!req.session.userId) {
        return notLoggedInError;
      }

      return {
        user: await User.findOne(req.session.userId),
        errors: undefined,
      };
    },
  },
  Mutation: {
    register: async (_: any, args: any) => {
      let user = User.create({
        ...args.input,
      });

      user = await User.save(user);

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
        return verificationEmailNotSentError(user);
      }

      return {
        errors: undefined,
        user,
      };
    },
    logout: async (_: any, __: any, { req, res }: any) => {
      if (!req.session.userId) {
        return notLoggedInError;
      }

      req.session.destroy();
      await res.clearCookie("yourId");

      return {
        errors: undefined,
        user: undefined,
      };
    },
    verify: async (_: any, args: any, { req }: any) => {
      let decoded: any;

      try {
        decoded = await jwt.verify(args.input.hashedId, process.env.JWT_SECRET as string);
      } catch (error) {
        return invalidVerificationToken;
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
      return {
        errors: undefined,
        user: undefined,
      };
    },
    login: async (_: any, args: any, { req }: any) => {
      const user = await User.findOne({ email: args.input.email });
      if (!user) {
        return invalidLoginError;
      }
      const valid = await argon2.verify(user.password, args.input.password);
      if (!valid) {
        return invalidLoginError;
      }

      if (!user.confirmed) {
        return accountNotVerifiedError;
      }

      req.session.userId = user.id;

      return {
        errors: undefined,
        user,
      };
    },
  },
};
