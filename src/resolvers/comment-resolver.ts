import { Comment, commentValidation } from "../models/comment";
import { ApolloError } from "apollo-server-core";

export default {
  Comment: {
    parentCommentId: async (parent: any) => {
      return await parent.child_comments;
    },
    postId: async (parent: any) => {
      return await parent.post;
    },
    authorId: async (parent: any) => {
      return await parent.author;
    },
  },
  Query: {
    comments: async (_: any, args: any) => {
      try {
        return await Comment.find({ post: args.id });
      } catch (error) {
        throw new ApolloError("No posts exist with that ID");
      }
    },
  },
  Mutation: {
    newComment: async (_: any, args: any, { req }: any) => {
      const { input } = args;
      const { content, postId, commentId } = input;

      await commentValidation.validate(input, { abortEarly: false });

      let comment = Comment.create({ content });

      if (postId && commentId) {
        throw new ApolloError(
          "You can only comment on a post or on another comment.",
        );
      } else if (postId) {
        comment.post = postId;
      } else if (commentId) {
        comment.parent_comment = commentId;
      } else {
        throw new ApolloError(
          "You need to provide either a postId or commentId so we can create the relation",
        );
      }

      comment.author = req.session.userId;

      try {
        comment = await Comment.save(comment);
      } catch (error) {
        return error;
      }

      return await Comment.findOne(comment.id);
    },
    upvote: async (_: any, args: any) => {
      const { id } = args;
      let comment: Comment;

      try {
        comment = (await Comment.findOne(id)) as Comment;
      } catch (error) {
        throw new ApolloError("That comment does not exist");
      }

      comment.score += 1;
      await Comment.save(comment);

      return comment.score;
    },
    downvote: async (_: any, args: any) => {
      const { id } = args;
      let comment: Comment;

      try {
        comment = (await Comment.findOne(id)) as Comment;
      } catch (error) {
        throw new ApolloError("That comment does not exist");
      }

      comment.score -= 1;
      await Comment.save(comment);

      return comment.score;
    },
  },
};
