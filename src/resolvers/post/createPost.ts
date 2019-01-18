import { postValidation } from "../../validations";
import { Post } from "../../models";

export default {
  Mutation: {
    createPost: async (_: any, { input }: any, { req }: any) => {
      await postValidation.validate(input, { abortEarly: false });

      let post = Post.create(input);

      post.author = req.session.userId;
      post.category = input.category;

      try {
        post = await post.save();
      } catch (error) {
        return error;
      }

      return await Post.findOne(post.id);
    },
  },
};
