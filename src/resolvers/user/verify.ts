import { redis, confirmUserPrefix } from "../../../config/redis";
import { User } from "../../models";
import {
  invalidVerificationTokenError,
  accountAlreadyVerifiedError,
} from "../../error-messages";

export default {
  Mutation: {
    verify: async (_: any, { verifyData }: any, { req }: any) => {
      const [[, id], [, ]] = await redis
        .pipeline()
        .get(confirmUserPrefix + verifyData.hashedId)
        .del(confirmUserPrefix + verifyData.hashedId)
        .exec();

      if (!id) {
        throw invalidVerificationTokenError();
      }

      const user = await User.findOne(id!);

      if (!user) {
        throw invalidVerificationTokenError();
      }

      if (user.confirmed) {
        throw accountAlreadyVerifiedError();
      }

      user.confirmed = true;
      await user.save();

      req.session.userId = user.id;
      req.session.userRole = user.role;

      return true;
    },
  },
};
