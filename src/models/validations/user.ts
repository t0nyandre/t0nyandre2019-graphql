import * as yup from "yup";

export const username = yup
  .string()
  .trim()
  .min(3)
  .max(25)
  .matches(
    /^[a-zA-Z][a-zA-Z0-9]*[_-]?[a-zA-Z0-9]*$/,
    "username has to start with a letter and can contain numbers. words can only be seperated by - or _ once",
  )
  .required("username is required");

export const email = yup
  .string()
  .trim()
  .email()
  .required("email is required");

export const password = yup
  .string()
  .min(6)
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
    "password has to consist of at least one uppercase and lowercase character, one number and a special character",
  )
  .required("password is required");
