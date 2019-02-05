import { postNotExist } from "../../utils/errorMessages";
import { Post } from "../../models/post";

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
