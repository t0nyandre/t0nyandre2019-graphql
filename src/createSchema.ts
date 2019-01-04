import { makeExecutableSchema } from "graphql-tools";
import { loadResolversFiles, loadSchemaFiles } from "@graphql-modules/sonar";
import { mergeGraphQLSchemas, mergeResolvers } from "@graphql-modules/epoxy";
import { IsAuthDirective, NotAuthDirective } from "./directives";

const typeDefs = mergeGraphQLSchemas(loadSchemaFiles(__dirname + "/schema/"));
const resolvers = mergeResolvers(loadResolversFiles(__dirname + "/resolvers/"));
export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
  schemaDirectives: {
    isAuth: IsAuthDirective,
    notAuth: NotAuthDirective,
  },
});
