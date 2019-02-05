import * as yup from "yup";

import { password, email } from "./shared";

const username = yup
  .string()
  .trim()
  .min(3)
  .max(25)
  .matches(
    /^[a-zA-Z][a-zA-Z0-9]*[_-]?[a-zA-Z0-9]*$/,
    "username has to start with a letter and can contain numbers. words can only be seperated by - or _ once",
  )
  .required("username is required");

export const userValidation = yup.object().shape({
  username,
  email,
  password,
});
