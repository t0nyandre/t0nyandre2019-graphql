import * as cuid from "cuid";

import { redis, changePasswordUserPrefix } from "../../../config/redis";
import { User } from "../../models";
import { forgotPasswordValidation } from "../../validations";
// import { forgotPasswordMail } from "../../mails";
// import { transporter } from "../../../config/nodemailer";

export default {
  Mutation: {
    forgotPassword: async (_: any, { email }: any) => {
      await forgotPasswordValidation.validate({ email }, { abortEarly: false });

      const user = await User.findOne({ email });

      if (!user) {
        return true;
      }

      const token = cuid();
      redis.set(changePasswordUserPrefix + token, user.id, "EX", 60 * 60 * 24 * 1); // 1 days

      // transporter.sendMail(forgotPasswordMail(user.email, hashedId));
      console.log(token); // don't want to be spamming my mail so logging the id needed to verify account onto the
      // terminal.;

      return true;
    },
  },
};
