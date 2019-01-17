import * as yup from "yup";

const password = yup
  .string()
  .min(6)
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
    "password has to consist of at least one uppercase and lowercase character, one number and a special character",
  )
  .required("password is required");

const token = yup
  .string()
  .trim()
  .required("token is required");

export const changePasswordValidation = yup.object().shape({
  token,
  password,
});
