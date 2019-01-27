export default {
  Mutation: {
    downvote: (_: any, { id }: any) => {
      console.log(id);
      return -1;
    },
  },
};
