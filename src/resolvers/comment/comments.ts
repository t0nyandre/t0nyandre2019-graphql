import { ApolloError } from "apollo-server-core";
import { Comment } from "../../models";

export default {
  Query: {
    comments: async (_: any, args: any) => {
      try {
        return await Comment.find({ post: args.id });
      } catch (error) {
        throw new ApolloError("No posts exist with that ID");
      }
    },
  },
};
