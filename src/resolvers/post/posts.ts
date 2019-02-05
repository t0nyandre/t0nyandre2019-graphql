import { Post } from "../../models/post";

export default {
  Query: {
    posts: async () => {
      return await Post.find();
    },
  },
};
