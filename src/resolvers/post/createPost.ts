import { postValidation } from "../../validations";
import { Post } from "../../models";

export default {
  Mutation: {
    createPost: async (_: any, { postData }: any, { req }: any) => {
      await postValidation.validate(postData, { abortEarly: false });

      let post = Post.create(postData);

      post.author = req.session.userId;
      post.category = postData.category;

      try {
        post = await post.save();
      } catch (error) {
        return error;
      }

      return await Post.findOne(post.id);
    },
  },
};
