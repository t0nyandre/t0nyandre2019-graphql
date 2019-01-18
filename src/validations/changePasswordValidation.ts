import * as yup from "yup";

import { password } from "./shared";

const token = yup
  .string()
  .trim()
  .required("token is required");

export const changePasswordValidation = yup.object().shape({
  token,
  password,
});
