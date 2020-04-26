const Movie = require('../../models/movie');
const User = require('../../models/user');
const { dateToString } = require('../helpers/date');


const transformMovie = movie => {
    return {
        ...movie._doc,
        // date: dateToString(movie._doc.date),
        creator: user.bind(this, movie.creator),
        posterPath: movie.poster_path,
        backdropPath: movie._doc.backdrop_path,
        originalLanguage: movie._doc.original_language,
        releaseDate: movie._doc.release_date,
        voteAverage: movie._doc.vote_average,
    }
}

const transformPlaylist = movie => {
    return {
        ...movie._doc,
        // date: dateToString(movie._doc.date),
        posterPath: movie._doc.poster_path,
        creator: user.bind(this, movie.creator)
    }
}

// const singleMovie = async (movieId) => {
//     try {
//         const movie = await Movie.findById(movieId);
//         return transformMovie(movie);
//     } catch (error) {
//         throw new Error('Movie not found')
//     }
// }

const user = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdMovies: movies.bind(this, user._doc.createdMovies)
        }
    } catch (error) {
        throw new Error('User not found')
    }
}


const movies = async (ids) => {
    try {
        const movies = await Movie.find({ _id: { $in: ids } });
        return movies.map(movie => {
            return transformMovie(movie);
        })
    } catch (error) {
        throw error;
    }
}

exports.transformMovie = transformMovie;
exports.user = user;
