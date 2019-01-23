import { CommentScore } from "../../models";

export default {
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
      return await CommentScore.findOne(parent.score);
    },
  },
};
