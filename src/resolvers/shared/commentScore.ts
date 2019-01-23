export default {
  CommentScore: {
    votedUp: async (parent: any) => {
      return await parent.votedUp;
    },
    votedDown: async (parent: any) => {
      return await parent.votedDown;
    },
  },
};
