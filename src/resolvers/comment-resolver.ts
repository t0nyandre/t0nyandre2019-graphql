import { Comment, commentValidation } from "../models/comment";
import { ApolloError } from "apollo-server-core";
import { Vote, CommentVote } from "../models/votes";
import { User } from "../models/user";

export default {
  CommentVote: {
    voters: async (parent: any) => {
      return await User.find(parent.voters);
    },
  },
  Comment: {
    childComments: async (parent: any) => {
      return await parent.childComments;
    },
    post: async (parent: any) => {
      return await parent.post;
    },
    author: async (parent: any) => {
      return await parent.author;
    },
    score: async (parent: any) => {
      return await CommentVote.findOne(parent.score);
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
        comment.parentComment = commentId;
      } else {
        throw new ApolloError(
          "You need to provide either a postId or commentId so we can create the relation",
        );
      }
      comment.author = req.session.userId;

      const score = CommentVote.create();

      comment.score = score;

      try {
        comment = await Comment.save(comment);
      } catch (error) {
        return error;
      }

      return await Comment.findOne(comment.id);
    },
    vote: async (_: any, args: any, { req }: any) => {
      const { id, vote } = args;
      let comment: Comment;

      try {
        comment = (await Comment.findOne(id)) as Comment;
      } catch (error) {
        throw new ApolloError("That comment does not exist");
      }

      if (vote === Vote.UP) {
        comment.score.value += 1;
      } else if (vote === Vote.DOWN) {
        comment.score.value -= 1;
      } else {
        throw new ApolloError("You can only vote a comment up or down");
      }

      comment.score.voters = req.session.userId;

      await Comment.save(comment);

      return comment.score.value;
    },
  },
};
