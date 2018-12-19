import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { Schema } from "./createSchema";
import { User } from "./entity/User";
// tslint:disable-next-line
require("dotenv").config();

const startServer = async () => {
  const {
    PG_HOST,
    PG_PORT,
    PG_USER,
    PG_PASS,
    PG_DATABASE,
  } = process.env;

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

  const server = new ApolloServer({ schema: Schema });

  const app = express();
  server.applyMiddleware({ app });

  const port = 4000;

  app.listen({ port }, () =>
    // tslint:disable-next-line
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
  );
};

startServer();
