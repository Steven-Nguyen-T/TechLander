const express = require("express");
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const {schema} = require('./schema.ts')

const app = express();

const PORT = 4000

app.use('/graphql', graphqlHTTP({
	schema:schema, 
	graphiql: true
}))

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
console.log('run graphql server')