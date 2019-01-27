import { Comment, CommentScore } from "../../models";
import { commentValidation } from "../../validations";

export default {
  Mutation: {
    createComment: async (_: any, { commentData }: any, { req }: any) => {
      const { content, reply, id } = commentData;

      await commentValidation.validate(commentData, { abortEarly: false });

      const comment = await Comment.create({
        content,
        author: req.session.userId,
      }).save();

      comment.score = CommentScore.create();
      reply ? (comment.parentComment = id) : (comment.post = id);

      return await comment.save();
    },
  },
};
