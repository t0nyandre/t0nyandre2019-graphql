import { redis, confirmUserPrefix } from "../../../config/redis";
import { User } from "../../models";
import {
  invalidTokenError,
  accountAlreadyVerifiedError,
} from "../../error-messages";

export default {
  Mutation: {
    verify: async (_: any, { verifyData }: any, { req }: any) => {
      const [[, id], [, ]] = await redis
        .pipeline()
        .get(confirmUserPrefix + verifyData.token)
        .del(confirmUserPrefix + verifyData.token)
        .exec();

      if (!id) {
        throw invalidTokenError();
      }

      const user = await User.findOne(id!);

      if (!user) {
        throw invalidTokenError();
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
