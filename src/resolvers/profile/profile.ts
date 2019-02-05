import { User } from "../../models/user";
import { Profile } from "../../models/profile";

export default {
  Query: {
    profile: async (_: any, { id }: any) => {
      const user = await User.findOne(id);
      return await Profile.findOne(user!.profile);
    },
  },
};
