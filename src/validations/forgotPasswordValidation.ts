import * as yup from "yup";

const email = yup
  .string()
  .trim()
  .email()
  .required("email is required");

export const forgotPasswordValidation = yup.object().shape({
  email,
});
