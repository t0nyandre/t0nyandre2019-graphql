import { ApolloError } from "apollo-server-core";
import { Comment, CommentScore } from "../../models";
import { getConnection } from "typeorm";

export default {
  Mutation: {
    upvote: async (_: any, { id }: any, { req }: any) => {
      let comment: Comment;

      try {
        comment = (await Comment.findOne(id)) as Comment;
      } catch (error) {
        throw new ApolloError("That comment does not exist");
      }

      if (comment.score) {
        console.log("Found entry in votedDown");
        if (req.session.userId in comment.score.votedDown) {
          console.log("Found entry in votedDown");
          console.log(await getConnection()
            .createQueryBuilder()
            .relation(CommentScore, "votedDown")
            .of(comment.score)
            .remove(req.session.userId));
          }
      }

      if (!(req.session.userId in comment.score.votedUp)) {
        comment.score.votedUp = req.session.userId;
        comment.score.value += 1;
        await comment.save();
      }

      return comment.score.value;
    },
  },
};
