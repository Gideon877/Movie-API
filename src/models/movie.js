const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Movie = new Schema({
    adult: { type: Boolean, required: false },
    backdrop_path: { type: String, required: false },
    original_language: { type: String, required: false },
    overview: { type: String, required: false },
    popularity: { type: String, required: false },
    poster_path: { type: String, required: false },
    release_date: { type: String, required: false },
    title: { type: String, required: true, unique: true },
    vote_average: { type: String, required: false },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Movie', Movie);