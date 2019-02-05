import { User } from "../../models/user";

export default {
  Query: {
    me: (_: any, __: any, { req }: any) => {
      return User.findOne(req.session.userId);
    },
  },
};
