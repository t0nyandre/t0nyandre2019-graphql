// tslint:disable-next-line
require("dotenv").config();

export default {
  Mutation: {
    logout: async (_: any, __: any, { req, res }: any) => {
      req.session.destroy();
      await res.clearCookie(process.env.SESSION_NAME);

      return true;
    },
  },
};
