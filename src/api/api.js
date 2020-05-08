const User = require('../models/user');

module.exports.getUserById = async (_id) => await User.findById(_id);
module.exports.findUsers = async () => await User.findOne().populate('createdMovies');