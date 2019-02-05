import * as yup from "yup";

export const password = yup
  .string()
  .min(6)
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
    "password has to consist of at least one uppercase and lowercase character, one number and a special character",
  )
  .required("password is required");
