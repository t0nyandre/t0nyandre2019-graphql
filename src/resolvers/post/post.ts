import { Post } from "../../models";
import { postNotExist } from "../../error-messages";

export default {
  Query: {
    post: async (_: any, { id }: any) => {
      const post = await Post.findOne(id);

      if (!post) {
        throw postNotExist();
      }

      return post;
    },
  },
};
