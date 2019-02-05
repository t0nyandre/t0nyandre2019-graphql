import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { ensureLoggedIn } from "../utils/authChecker";

export class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function(...args: any[]) {
      const [, , context] = args;

      ensureLoggedIn(context.req);

      return resolve.apply(this, args);
    };
  }
}
