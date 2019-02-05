import * as yup from "yup";

import { email } from "./shared";

export const forgotPasswordValidation = yup.object().shape({
  email,
});
