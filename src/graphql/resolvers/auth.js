const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userType, EventTypes } = require('../helpers/constants');
const { user } = require('./merge');


module.exports = {
    Query: {
        users: async (parent, params, context) => {
            if (context.code === 404) throw new Error(context.message);
            try {
                const users = await User.find().populate('createdMovies')
                return users.map(user => {
                    return {
                        ...user._doc
                    }
                })
            } catch (error) {
                throw error;
            }

        },

        getUser: async (parent, params, context) =>
            (context.code === 404)
                ? new Error(context.message)
                : await user(params.userId)

    },

    Mutation: {
        createUser: async (parent, params) => {
            try {
                const { username, password } = params.user;
                const existingUser = await User.findOne({ username })

                if (existingUser) {
                    throw new Error('User already exists.')
                }
                const hashedPassword = await bcrypt.hash(password, 12)
                const user = new User({
                    ...params.user,
                    password: hashedPassword,
                    lastSeen: new Date(),
                    active: true,
                    userType: userType.User
                })
                await user.save();
                return true;
            } catch (error) {
                // throw error;
                return false;
            }

        },

        updateUser: async (parent, params, context) => {
            if (context.code === 404) throw new Error(context.message);
            /* Todo: - check user type ? admin vs user */
            try {
                // Todo: use auth token to get userId
                await User.findOneAndUpdate({ username: params.user.username }, params.user);
                return true;
            } catch (error) {
                // throw new Error('Failed to update user');
                return false;
            }
        },

        signIn: async (parent, params, { pubsub }) => {
            try {
                const { username, password } = params;
                const user = await User.findOne({ username });
                if (!user) {
                    throw new Error('User does not exist!');
                }

                const isEqual = await bcrypt.compare(password, user.password);

                if (!isEqual) {
                    throw new Error('Password is incorrect!');
                }

                const token = jwt.sign({ userId: user.id, username: user.username }, "somesupersecretkey", { expiresIn: '1h' });
                pubsub.publish(EventTypes.LoggedUser, {
                    onLogin: user
                });

                return {
                    userId: user.id,
                    token,
                    tokenExpiration: 1
                }
            } catch (error) {
                throw error;

            }
        }

    }
}