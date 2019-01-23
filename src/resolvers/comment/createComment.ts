import { ApolloError } from "apollo-server-core";
import { Comment, CommentScore } from "../../models";
import { commentValidation } from "../../validations";

export default {
  Mutation: {
    createComment: async (_: any, { commentData }: any, { req }: any) => {
      const { content, postId, commentId } = commentData;

      await commentValidation.validate(commentData, { abortEarly: false });

      const comment = Comment.create({ content });

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
      comment.score = CommentScore.create();

      try {
        return await comment.save();
      } catch (error) {
        return error;
      }
    },
  },
};
