import { makeExecutableSchema } from "graphql-tools";
import { loadResolversFiles, loadSchemaFiles } from "@graphql-modules/sonar";
import { mergeGraphQLSchemas, mergeResolvers } from "@graphql-modules/epoxy";

const typeDefs = mergeGraphQLSchemas(loadSchemaFiles(__dirname + "/schema/"));
const resolvers = mergeResolvers(loadResolversFiles(__dirname + "/resolvers/"));
export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});
