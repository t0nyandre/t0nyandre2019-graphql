import * as Redis from "ioredis";
// tslint:disable-next-line
require("dotenv").config();

export const redis = new Redis(process.env.REDIS_URL);
export const confirmUserPrefix = "confirm:";
export const changePasswordUserPrefix = "changePassword:";
