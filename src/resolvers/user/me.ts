import { User } from "../../models";

export default {
  Query: {
    me: (_: any, __: any, { req }: any) => {
      return User.findOne(req.session.userId);
    },
  },
};
