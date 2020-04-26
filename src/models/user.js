const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    firstName: { type: String, required: true, unique: false },
    lastName: { type: String, required: true, unique: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, bcrypt: true },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, required: true },
    userType: { type: String, required: true },
    lastSeen: { type: String, required: true, unique: false },
    createdMovies: [
        { type: Schema.Types.ObjectId, ref: 'Movie' }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', User);