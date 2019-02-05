import { User } from "../../models/user";
import { Profile } from "../../models/profile";

export default {
  Mutation: {
    editProfile: async (
      _: any,
      { profileInput, profileSocialInput }: any,
      { req }: any
    ) => {
      const user = await User.findOne(req.session.userId);
      let profile = await Profile.findOne(user!.profile);
      profile = {
        id: await profile!.id,
        ...profileInput,
        ...profileSocialInput,
      };

      return await Profile.save(profile!);
    },
  },
};
