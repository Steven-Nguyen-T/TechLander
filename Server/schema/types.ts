export {};
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const model = require("./model");

const SignUp = new GraphQLSchema({
  name: "Name",
  description: "Person",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    userid: { type: GraphQLNonNull(GraphQLInt) },
    username: {
      type: GraphQLString,
      resolve: (username: string) => {
        const queryText = "SELECT username FROM users WHERE id=$1";
        return model
          .query(queryText, [name.userid])
          .then((data: any) => data.rows[0].name)
          .catch((err: any) => console.log(err));
      },
    },
  },
});

module.exports = { SignUp };
