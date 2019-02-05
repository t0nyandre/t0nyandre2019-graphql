import * as yup from "yup";

export const email = yup
  .string()
  .trim()
  .email()
  .required("email is required");
