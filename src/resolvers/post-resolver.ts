import { Post, postValidation } from "../models/post";
import { categoryValidation, PostCategory } from "../models/post-category";

export default {
  Post: {
    authorId: async (parent: any) => {
      console.log(parent);
      return await parent.author;
    },
    categoryId: (parent: any) => {
      return parent.category;
    },
  },
  Query: {
    posts: async () => {
      return await Post.find();
    },
    post: (_: any, args: any) => {
      return Post.findOne(args.id);
    },
  },
  Mutation: {
    newPost: async (_: any, args: any, { req }: any) => {
      const { input } = args;
      await postValidation.validate(input, { abortEarly: false });

      let post = Post.create(input);

      post.author = req.session.userId;
      post.category = input.category;

      try {
        post = await Post.save(post);
      } catch (error) {
        return error;
      }

      console.log(post);

      return await Post.findOne(post.id);
    },
    newCategory: async (_: any, args: any) => {
      const { input } = args;

      await categoryValidation.validate(input, { abortEarly: false });

      let cat = await PostCategory.create(input);

      try {
        cat = await PostCategory.save(cat);
      } catch (error) {
        return error;
      }

      return cat;
    },
  },
};
