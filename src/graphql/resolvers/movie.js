
const Movie = require('../../models/movie');
const User = require('../../models/user');
const { transformMovie } = require('./merge');

module.exports = {
    Query: {
        movies: async () => {
            try {
                const movies = await Movie.find().populate('creator');
                return movies.map(movie => {
                    return transformMovie(movie);
                })
            } catch (error) {
                throw error;
            }
        },

        findUserMovies: async (parent, params, context) => {
            try {
                if (context.code === 404) throw new Error(context.message);
                const movie = await Movie.findById(params.movieId);
                return transformMovie(movie)
            } catch (error) {
                throw error;
            }
        }
    },

    Mutation: {
        createMovie: async (parent, params, context) => {
            if (context.code === 404) throw new Error(context.message);
            try {
                const {
                    userId,
                    posterPath,
                    backdropPath,
                    originalLanguage,
                    releaseDate,
                    voteAverage
                } = params.movie;

                const movie = new Movie({
                    ...params.movie,
                    creator: userId,
                    poster_path: posterPath,
                    backdrop_path: backdropPath,
                    original_language: originalLanguage,
                    release_date: releaseDate,
                    vote_average: voteAverage,
                });
                
                const addedMovie = await Movie.findOne({ title: params.movie.title, creator: userId });
                
                if (addedMovie) {
                    throw new Error('Movie already liked');
                }

                await movie.save();
                const user = await User.findById(userId);

                if (!user) {
                    throw new Error('User not found')
                }

                user.createdMovies.push(movie);
                await user.save();

                return true;
            } catch (error) {
                return false;
            }
        },

        removeMovie: async (parent, params, context) => {
            if (context.code === 404) throw new Error(context.message);
            try {
                const { userId, movieId } = params;
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found')
                }
                user.createdMovies = user.createdMovies.filter(id => movieId !== id);
                await user.save();
                await Movie.deleteOne({ _id: movieId });
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}