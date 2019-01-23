import { categoryValidation } from "../../validations";
import { PostCategory } from "../../models";

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
