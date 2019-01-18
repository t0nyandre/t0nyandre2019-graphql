import * as yup from "yup";

const image = yup
  .string()
  .trim()
  .max(200)
  .notRequired();

const title = yup
  .string()
  .trim()
  .max(150)
  .required("title is required");

const description = yup
  .string()
  .trim()
  .max(300, "Description cannot be longer than 300 chars for SEO purposes")
  .required("description is required");

const content = yup
  .string()
  .trim()
  .notRequired();

export const postValidation = yup.object().shape({
  image,
  title,
  description,
  content,
});
