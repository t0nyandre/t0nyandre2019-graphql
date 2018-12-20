import * as nodemailer from "nodemailer";
// tslint:disable-next-line
require("dotenv").config();

const {
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

const poolConfig = {
  pool: true,
  host: SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
};

export const transporter = nodemailer.createTransport(poolConfig);
