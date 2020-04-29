const authResolver = require('./auth');
const movieResolver = require('./movie');

const { users, getUser } = authResolver.Query;
const { createUser, signIn, updateUser } = authResolver.Mutation;
const { movies, findUserMovies } = movieResolver.Query;
const { createMovie, removeMovie } = movieResolver.Mutation;

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
    }

}

module.exports = Resolver;