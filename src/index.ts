import "reflect-metadata";
import * as express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { schema } from "./createSchema";
import { User } from "./entity/User";
import { redis } from "../config/redis";
// tslint:disable-next-line
require("dotenv").config();

const {
  SESSION_SECRET,
  NODE_ENV,
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASS,
  PG_DATABASE,
} = process.env;
const RedisStore = connectRedis(session);

async function startServer() {
  await createConnection({
    type: "postgres",
    host: PG_HOST || "localhost",
    port: PG_PORT || 5432,
    username: PG_USER || "postgres",
    password: PG_PASS || "postgres",
    database: PG_DATABASE || "postgres",
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [
       User,
    ],
  } as any);

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:4000", "http://localhost:4001"],
    }),
    session({
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: NODE_ENV === "production",
      },
      name: "yourId",
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
    // tslint:disable-next-line
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
  );
}

startServer();
