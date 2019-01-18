import * as yup from "yup";

const icon = yup
  .string()
  .trim()
  .max(200)
  .required("image for an icon is required");

const name = yup
  .string()
  .trim()
  .max(150)
  .required("category name is required");

export const categoryValidation = yup.object().shape({
    icon,
    name,
});
