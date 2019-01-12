import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { ensureLoggedOut } from "../auth";

export class NotAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function(...args: any[]) {
      const [, , context] = args;

      ensureLoggedOut(context.req);

      return resolve.apply(this, args);
    };
  }
}
