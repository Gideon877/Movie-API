const mongoose = require('mongoose');
const validate = require('mongoose-validator')
const _ = require('lodash');

const Schema = mongoose.Schema;

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 50],
        message: (props) => `${props.value} should be between {ARGS[0]} and {ARGS[1]} characters`,
    }),
    validate({
        validator: 'isAlpha',
        passIfEmpty: true,
        message: (props) => `${props.value} should contain only letters (a-zA-Z)`,
    }),
]

const User = new Schema({
    firstName: {
        type: String,
        required: true,
        validate: nameValidator,
        set: (firstName) => {
            firstName = _.capitalize(firstName.trim());
            this._previousFirstName = firstName;
            return firstName;
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: nameValidator,
        set: (lastName) => {
            lastName = _.capitalize(lastName.trim());
            this._previousLastName = lastName;
            return lastName;
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        set: (username) => {
            this._previousUsername = username;
            return username;
        },
        validate: [
            validate({
                validator: 'isLength',
                arguments: [2, 10],
                message: (props) => `${props.value} should be between {ARGS[0]} and {ARGS[1]} characters`
            })
        ]
    },
    password: { type: String, required: true, bcrypt: true },
    email: {
        type: String,
        required: true,
        unique: true,
        set: (email) => {
            this._previousEmail = email;
            return email;
        },
        validate: [
            validate({
                validator: 'isEmail'
            })
        ]
    },
    active: { type: Boolean, required: true },
    userType: {
        type: String,
        required: true,
        set: (userType) => {
            this._previousUserType = userType;
            return userType;
        }
    },
    lastSeen: { type: String, required: true, unique: false },
    createdMovies: [
        { type: Schema.Types.ObjectId, ref: 'Movie' }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', User);