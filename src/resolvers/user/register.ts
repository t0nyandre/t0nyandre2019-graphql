import * as cuid from "cuid";

import { redis, confirmUserPrefix } from "../../../config/redis";
import { Profile } from "../../models/profile";
import { User } from "../../models";
import { registerValidation } from "../../models/validations";
// import { verifyAccountMail } from "../mails/verifyAccountMail";
// import { transporter } from "../../config/nodemailer";

export default {
  Mutation: {
    register: async (_: any, { registerData }: any) => {
      await registerValidation.validate(registerData, { abortEarly: false });

      let user = User.create(registerData);
      const profile = Profile.create();
      user.profile = profile;

      try {
        user = await user.save();
      } catch (error) {
        return error;
      }

      const hashedId = cuid();
      redis.set(confirmUserPrefix + hashedId, user.id, "EX", 60 * 60 * 24 * 2); // 2 days

      // transporter.sendMail(verifyAccountMail(user.email, hashedId));
      console.log(hashedId); // don't want to be spamming my mail so logging the id needed to verify account onto the
      // terminal.

      return user;
    },
  },
};
