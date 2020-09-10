const express = require("express");
const app = express();
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const PORT = process.env.port || 3000

const schema = buildSchema(`
	type Query {
		hello: String
	}
`);

const root = {
	hello: () => {
		return 'hello world!'
	}
}

app.use('/graphql', graphqlHTTP({schema:schema, rootValue:root, graphiql: true}))

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
console.log('run graphql server')