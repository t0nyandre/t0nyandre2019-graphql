import * as yup from "yup";

const content = yup
  .string()
  .trim()
  .required("content of comment is required");

export const commentValidation = yup.object().shape({
  content,
});
