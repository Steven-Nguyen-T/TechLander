const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const axios = require("axios");
const bcrypt = require("bcrypt");
const model = require("./model.ts");

// //Hardcoded Data
// const customers = [
//   { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 35 },
//   { id: "2", name: "Steven Nguyen", email: "steven@gmail.com", age: 23 },
//   { id: "3", name: "Evan Berghoff", email: "evan@gmail.com", age: 25 },
// ];

// //Customer Type
// const CustomerType = new GraphQLObjectType({
//   name: "Customer",
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     email: { type: GraphQLString },
//     age: { type: GraphQLInt },
//   }),
// });

//User Type
const UserType = new GraphQLObjectType({
  name: "Users",
  fields: {
    // id: { type: GraphQLString },
    username: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    jobs: { type: GraphQLString },
  },
});

// User Root Query
const UserQuery = new GraphQLObjectType({
  name: "UserQueryType",
  description: "Query users",
  fields: {
    user: {
      type: UserType,
      args: {
        // id: { type: GraphQLString },
        username: { type: GraphQLString },
      },
      resolve: (parentValue, args) => {
        console.log("args", args);
        const { username } = args;
        const queryText = `SELECT * from users WHERE username=$1`;
        return model
          .query(queryText, [username])
          .then((data) => /*data.rows[0]*/ console.log(data))
          .catch((err) => console.log(err));
      },
    },
    users: {
      type: GraphQLList(UserType),
      description: "query all users",
      resolve: () => {
        console.log("hi");
        return model
          .query(`SELECT * FROM users`)
          .then((data) => data.rows)
          .catch((err) => console.log(err));
      },
    },
  },
});

//User mutation
// const UserMutation = new GraphQLObjectType({
//   name: "UserMutation",
//   fields: () => ({
//     addUser: {
//       type: UserType,
//       args: {
//         username: { type: GraphQLNonNull(GraphQLString) },
//         password: { type: GraphQLNonNull(GraphQLString) },
//         jobs: { type: GraphQLString },
//       },
//       resolve: async (parent, args) => {
//         const { username, password, jobs } = args;
//         const hashedPass = await bcrypt.hash(password, 10);
//         const queryText = `INSERT INTO users (username, password, jobs) VALUES ($1, $2, $3)`;
//         model
//           .query(queryText, [username, password, jobs])
//           .then((data) => console.log(data))
//           .catch((err) => console.log(err));
//       },
//     },
//   }),
// });

//Root Query
// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     customer: {
//       type: CustomerType,
//       args: {
//         id: { type: GraphQLString },
//       },
//       resolve(parentValue, args) {
//         // for (let i = 0; i < customers.length; i++) {
//         //   if (customers[i].id === args.id) {
//         //     return customers[i];
//         //   }
//         // }
//         return axios
//           .get("http://localhost:3000/customers/" + args.id)
//           .then((res) => res.data);
//       },
//     },
//     customers: {
//       type: new GraphQLList(CustomerType),
//       resolve(parentValue, args) {
//         return axios
//           .get("http://localhost:3000/customers")
//           .then((res) => res.data);
//       },
//     },
//   },
// });

// // Mutations
// const mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     addCustomer: {
//       type: CustomerType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         email: { type: new GraphQLNonNull(GraphQLString) },
//         age: { type: new GraphQLNonNull(GraphQLInt) },
//       },
//       resolve(parentValue, args) {
//         return axios
//           .post("http://localhost:3000/customers", {
//             name: args.name,
//             email: args.email,
//             age: args.age,
//           })
//           .then((res) => res.data);
//       },
//     },
//     deleteCustomer: {
//       type: CustomerType,
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLString) },
//       },
//       resolve(parentValue, args) {
//         return axios
//           .delete("http://localhost:3000/customers/" + args.id)
//           .then((res) => res.data);
//       },
//     },
//     editCustomer: {
//       type: CustomerType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         email: { type: GraphQLString },
//         age: { type: GraphQLInt },
//       },
//       resolve(parentValue, args) {
//         return axios
//           .post("http://localhost:3000/customers/" + args.id, args)
//           .then((res) => res.data);
//       },
//     },
//   },
// });

const schema = new GraphQLSchema({
  query: UserQuery,
  // mutation: UserMutation,
});

module.exports = { schema };
