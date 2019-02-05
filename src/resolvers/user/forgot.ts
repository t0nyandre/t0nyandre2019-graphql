import * as cuid from "cuid";

import { redis, changePasswordUserPrefix } from "../../../config/redis";
import { forgotPasswordValidation } from "../../utils/validations";
import { User } from "../../models/user";
import { transporter } from "../../../config/nodemailer";
import { forgotPasswordMail } from "../../utils/mails";

export default {
  Query: {
    forgotPassword: async (_: any, { email }: any) => {
      await forgotPasswordValidation.validate({ email }, { abortEarly: false });

      const user = await User.findOne({ email });

      if (!user) {
        return true;
      }

      const token = cuid();
      redis.set(
        changePasswordUserPrefix + token,
        user.id,
        "EX",
        60 * 60 * 24 * 1
      ); // 1 days

      transporter.sendMail(forgotPasswordMail(user, token));
      // console.log(token); // console log the token in dev mode

      return true;
    },
  },
};
