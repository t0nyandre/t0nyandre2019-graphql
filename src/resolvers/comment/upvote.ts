export default {
  Mutation: {
    upvote: (_: any, { id }: any) => {
      console.log(id);
      return 1;
    },
  },
};
