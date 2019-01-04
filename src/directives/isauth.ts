import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { ensureLoggedIn } from "../auth";

export class IsAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition (field: GraphQLField<any, any>) {
        const { resolve = defaultFieldResolver } = field;

        field.resolve = function (...args: any[]) {
            const [ , , context ] = args;

            ensureLoggedIn(context.req);

            return resolve.apply(this, args);
        }
    }
}