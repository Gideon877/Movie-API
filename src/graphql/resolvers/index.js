const authResolver = require('./auth');
const movieResolver = require('./movie');

const { users, getUser } = authResolver.Query;
const { createUser, signIn, updateUser } = authResolver.Mutation;
const { movies, findUserMovies } = movieResolver.Query;
const { createMovie, removeMovie } = movieResolver.Mutation;
const { EventTypes } = require('../helpers/constants');

const Resolver = {
    Query: {
        users,
        getUser,
        movies,
        findUserMovies
    },
    Mutation: {
        signIn,
        createUser,
        createMovie,
        removeMovie,
        updateUser
    },
    Subscription: {
        onLogin: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(EventTypes.LoggedUser)
        }
    }

};

module.exports = Resolver;