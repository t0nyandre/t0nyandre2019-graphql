export default {
  Post: {
    author: async (parent: any) => {
      return await parent.author;
    },
    category: async (parent: any) => {
      return await parent.category;
    },
  },
};
