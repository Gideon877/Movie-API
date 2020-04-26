const mongoose = require('mongoose');
const graphqlSchema = require('./src/graphql/schema');
const graphqlResolvers = require('./src/graphql/resolvers');
const { ApolloServer } = require('apollo-server');
const isAuth = require('./src/middleware/is-auth')

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// })


const app = new ApolloServer({ 
	typeDefs: graphqlSchema, 
	resolvers: graphqlResolvers,
	// context: isAuth
});


mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-nhnpr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
	.then(() => {
		app.listen(4004, () => console.log(`🚀App running on http://localhost:4004`));
	}).catch(err => console.log(err))


