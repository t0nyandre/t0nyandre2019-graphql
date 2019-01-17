import * as argon2 from "argon2";

import { User } from "../../models";
import { invalidLoginError, accountNotVerifiedError } from "../../error-messages";

export default {
  Mutation: {
    login: async (_: any, { loginData: { email, password } }: any, { req }: any) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw invalidLoginError();
      }

      const valid = await argon2.verify(user.password, password);
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
