const User = require("./user.model");

/**
 * Save a new user
 * @param {Object} user - The user object to save
 * @param {Object} session - The session object for transactions (optional)
 * @returns {Promise<User>} - The saved user
 */
const save = async (user, session) => {
  return await user.save({ session });
};

/**
 * Get a user by ID
 * @param {string} userId - The ID of the user to retrieve
 * @returns {Promise<User|null>} - The user object or null if not found
 */
const getUserById = async (userId) => {
  return await User.findById(userId);
};

module.exports = { save, getUserById };
