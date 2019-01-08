import { Post, postValidation } from "../models/post";
import { categoryValidation, PostCategory } from "../models/post-category";

export default {
  Post: {
    authorId: async (parent: any) => {
      return await parent.author;
    },
    categoryId: async (parent: any) => {
      return await parent.category;
    },
    comments: async(parent: any) => {
      return await parent.comments;
    }
  },
  Query: {
    posts: async () => {
      return await Post.find();
    },
    post: async (_: any, args: any) => {
      return await Post.findOne(args.id);
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
