import * as argon2 from "argon2";

import { redis, changePasswordUserPrefix } from "../../../config/redis";
import { changePasswordValidation } from "../../utils/validations";
import { invalidTokenError } from "../../utils/errorMessages";
import { User } from "../../models/user";
// import { forgotPasswordMail } from "../../mails";
// import { transporter } from "../../../config/nodemailer";

export default {
  Mutation: {
    changePassword: async (_: any, { changeData }: any, { req }: any) => {
      await changePasswordValidation.validate(changeData, {
        abortEarly: false,
      });

      const [[, id], [,]] = await redis
        .pipeline()
        .get(changePasswordUserPrefix + changeData.token)
        .del(changePasswordUserPrefix + changeData.token)
        .exec();

      if (!id) {
        throw invalidTokenError();
      }

      const user = await User.findOne(id);

      if (!user) {
        throw invalidTokenError();
      }

      user.password = await argon2.hash(changeData.password, {
        type: argon2.argon2d,
      });

      await user.save();

      req.session.userId = user.id;
      req.session.userRole = user.role;

      return true;
    },
  },
};
