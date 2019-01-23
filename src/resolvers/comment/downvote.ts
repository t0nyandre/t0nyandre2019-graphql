import { ApolloError } from "apollo-server-core";
import { Comment, CommentScore } from "../../models";
import { getConnection } from "typeorm";

export default {
  Mutation: {
    downvote: async (_: any, { id }: any, { req }: any) => {
      let comment: Comment;

      try {
        comment = (await Comment.findOne(id)) as Comment;
      } catch (error) {
        throw new ApolloError("That comment does not exist");
      }

      if (comment.score) {
        if (req.session.userId in comment.score.votedUp) {
          console.log("Found entry in votedUp");
          console.log(
            await getConnection()
              .createQueryBuilder()
              .relation(CommentScore, "votedUp")
              .of(comment.score)
              .remove(req.session.userId),
          );
        }
      }

      if (!(req.session.userId in comment.score.votedDown)) {
        comment.score.votedDown = req.session.userId;
        comment.score.value -= 1;
        await comment.save();
      }

      return comment.score.value;
    },
  },
};
