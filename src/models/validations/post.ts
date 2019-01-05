import * as yup from "yup";

export const image = yup
  .string()
  .trim()
  .max(200)
  .notRequired();

export const title = yup
  .string()
  .trim()
  .max(150)
  .required("title is required");

export const description = yup
  .string()
  .trim()
  .max(300, "Description cannot be longer than 300 chars for SEO purposes")
  .required("description is required");

export const content = yup
  .string()
  .trim()
  .notRequired();

// TODO: add validation on enums
