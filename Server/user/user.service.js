const User = require("./user.model");

//Save a new user
const save = async (user, session) => {
  return await user.save({ session });
};

//Get a user by ID
const getUserById = async (userId) => {
  return await User.findById(userId);
};

module.exports = { save, getUserById };
