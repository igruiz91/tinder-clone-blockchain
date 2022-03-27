// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import { userSchema } from "./userSchema";

// Then we give our schema to the builder and provide the result to Sanity

export default createSchema({
  name: "default",
  types: schemaTypes.concat([userSchema]),
});
