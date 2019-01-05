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

export const cat_icon = yup
  .string()
  .trim()
  .max(200)
  .required("image for an icon is required");

export const cat_name = yup
  .string()
  .trim()
  .max(150)
  .required("category name is required");

// TODO: add validation on enums
