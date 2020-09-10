export {};
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const { SignUp } = require("./types");
const model = require("./model");

const AddType = new GraphQLObjectType({
  name: "Add",
  description: "Add Query",
  fields: () => ({
    user: {
      type: SignUp,
      description: "Add a person",
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        jobs: { type: GraphQLString },
      },
      resolve: (parent: any, args: any) => {
        const { username, password, jobs } = args;
        const queryText = `INSERT INTO users (username, password, jobs) VALUES ($1, $2, $3)`;
        model
          .query(queryText, [username, password, jobs])
          .then((data: any) => console.log(data))
          .catch((err: any) => console.log(err));
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: AddType,
});

module.exports = { schema };
