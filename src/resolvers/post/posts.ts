import { Post } from "../../models";

export default {
  Query: {
    posts: async () => {
      return await Post.find();
    },
  },
};
