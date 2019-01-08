import * as yup from "yup";

export const content = yup
  .string()
  .trim()
  .required("content of comment is required");

// TODO: add validation on enums
