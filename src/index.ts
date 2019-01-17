import "reflect-metadata";
import * as express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";

import { DefaultConnection } from "../config/typeorm";
import { schema } from "./createSchema";
import { redis } from "../config/redis";
// tslint:disable-next-line
require("dotenv").config();

const { SESSION_SECRET, SESSION_NAME, NODE_ENV } = process.env;

async function startServer() {
  await createConnection(DefaultConnection);

  const app = express();
  const RedisStore = connectRedis(session);

  app.use(
    cors({
      origin: ["http://localhost:4000", "http://localhost:3000"],
      credentials: true,
    }),
    session({
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: NODE_ENV === "production",
      },
      name: SESSION_NAME,
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET as string,
      store: new RedisStore({
        client: redis as any,
      }),
    }),
  );

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
    }),
  });

  server.applyMiddleware({
    app,
    cors: false,
  });

  const port = 4000;

  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
    ),
  );
}

startServer();
