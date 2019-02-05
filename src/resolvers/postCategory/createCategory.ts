import { categoryValidation } from "../../utils/validations";
import { PostCategory } from "../../models/postCategory";

export default {
  Mutation: {
    createCategory: async (_: any, { categoryData }: any) => {
      await categoryValidation.validate(categoryData, { abortEarly: false });

      try {
        return await PostCategory.create(categoryData).save();
      } catch (error) {
        return error;
      }
    },
  },
};
