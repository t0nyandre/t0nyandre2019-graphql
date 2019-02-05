import * as cuid from "cuid";

import { redis, confirmUserPrefix } from "../../../config/redis";
import { Profile } from "../../models/profile";
import { userValidation } from "../../utils/validations";
import { User } from "../../models/user";
import { verifyAccountMail } from "../../utils/mails";
import { transporter } from "../../../config/nodemailer";

export default {
  Mutation: {
    register: async (_: any, { registerData }: any) => {
      await userValidation.validate(registerData, { abortEarly: false });

      let user = User.create(registerData);
      const profile = Profile.create();
      user.profile = profile;

      try {
        user = await user.save();
      } catch (error) {
        return error;
      }

      const token = cuid();
      redis.set(confirmUserPrefix + token, user.id, "EX", 60 * 60 * 24 * 2); // 2 days

      transporter.sendMail(verifyAccountMail(user, token));
      // console.log(token); // console log the token in dev mode

      return user;
    },
  },
};
