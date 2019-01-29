import { User, Profile } from "../../models";

export default {
  Query: {
    profile: async (_: any, { id }: any) => {
      const user = await User.findOne(id);
      return await Profile.findOne(user!.profile);
    },
  },
};
