import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { ensureLoggedOut } from "../utils/authChecker";

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
