const Recipe = require("./recipe.model");

/**
 * Save a new recipe
 * @param {Object} recipe - The recipe object to save
 * @param {Object} session - The session object for transactions (optional)
 * @returns {Promise<Recipe>} - The saved recipe
 */
const save = async (recipe, session) => {
  return await recipe.save({ session });
};

/**
 * Find all recipes based on query object
 * @param {Object} queryObj - The query object for filtering recipes (optional)
 * @returns {Promise<Recipe[]>} - Array of recipes
 */
const findAll = async (queryObj) => {
  return await Recipe.find(queryObj).sort({ createdAt: -1 });
};

/**
 * Find a recipe by its ID
 * @param {string} id - The ID of the recipe
 * @returns {Promise<Recipe>} - The recipe object
 */
const findById = async (id) => {
  return await Recipe.findById(id);
};

/**
 * Find a recipe by its ID and update it
 * @param {string} id - The ID of the recipe to update
 * @param {Object} update - The update object
 * @param {Object} session - The session object for transactions (optional)
 * @returns {Promise<Recipe>} - The updated recipe
 */
const findByIdAndUpdate = async (id, update, session) => {
  if (session) {
    return await Recipe.findByIdAndUpdate(id, update, { new: true }).session(
      session
    );
  } else {
    return await Recipe.findByIdAndUpdate(id, update, { new: true });
  }
};

/**
 * Find a recipe by its ID and delete it
 * @param {string} id - The ID of the recipe to delete
 * @param {Object} session - The session object for transactions (optional)
 * @returns {Promise<Recipe>} - The deleted recipe
 */
const findByIdAndDelete = async (id, session) => {
  if (session) {
    return await Recipe.findByIdAndDelete(id).session(session);
  } else {
    return await Recipe.findByIdAndDelete(id);
  }
};

/**
 * Find recipes by category
 * @param {string} category - The category of the recipes to find
 * @returns {Promise<Recipe[]>} - Array of recipes in the given category
 */
const findCategoryById = async (categoryId) => {
  const recipe = await Recipe.findOne(
    { "categories.idCategory": categoryId }, // Query for a recipe with a matching idCategory inside categories
    { categories: { $elemMatch: { idCategory: categoryId } } } // Project only the matched category
  );
  // If recipe is found, return the matched category object
  return recipe ? recipe.categories[0] : null;
};

module.exports = {
  save,
  findAll,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findCategoryById,
};
