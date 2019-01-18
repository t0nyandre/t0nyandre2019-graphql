import { categoryValidation } from "../../validations";
import { PostCategory } from "../../models";

export default {
    Mutation: {
      createCategory: async (_: any, { input }: any) => {
        await categoryValidation.validate(input, { abortEarly: false });

        try {
          return await PostCategory.create(input).save();
        } catch (error) {
          return error;
        }
      },
    },
  };
