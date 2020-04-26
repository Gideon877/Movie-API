const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Playlist = new Schema({
    title: {
        type: String, 
        required: true
    },
    movies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Playlist', Playlist)