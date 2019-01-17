import { ConnectionOptions } from "typeorm";
import {
  User,
  Post,
  PostCategory,
  Comment,
  CommentVote,
  Profile,
} from "../src/models";
// tslint:disable-next-line
require("dotenv").config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

export const DefaultConnection = {
  type: "postgres",
  name: "default",
  host: POSTGRES_HOST || "localhost",
  port: POSTGRES_PORT || 5432,
  username: POSTGRES_USER || "postgres",
  password: POSTGRES_PASSWORD || "postgres",
  database: POSTGRES_DB || "postgres",
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: [User, Post, PostCategory, Comment, CommentVote, Profile],
} as ConnectionOptions;
