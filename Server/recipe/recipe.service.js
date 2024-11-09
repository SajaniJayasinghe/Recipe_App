const Recipe = require("./recipe.model");

//Save a new recipe
const save = async (recipe, session) => {
  return await recipe.save({ session });
};

//Find all recipes based on query object
const findAll = async (queryObj) => {
  return await Recipe.find(queryObj).sort({ createdAt: -1 });
};

//Find a recipe by its ID
const findById = async (id) => {
  return await Recipe.findById(id);
};

//Find a recipe by its ID and update it
const findByIdAndUpdate = async (id, update, session) => {
  if (session) {
    return await Recipe.findByIdAndUpdate(id, update, { new: true }).session(
      session
    );
  } else {
    return await Recipe.findByIdAndUpdate(id, update, { new: true });
  }
};

//Find a recipe by its ID and delete it
const findByIdAndDelete = async (id, session) => {
  if (session) {
    return await Recipe.findByIdAndDelete(id).session(session);
  } else {
    return await Recipe.findByIdAndDelete(id);
  }
};

//Find recipes by category
const findCategoryById = async (categoryId) => {
  const recipe = await Recipe.findOne(
    { "categories.idCategory": categoryId },
    { categories: { $elemMatch: { idCategory: categoryId } } }
  );
  return recipe ? recipe.categories[0] : null;
};

//Find recipes by category name
const findCategoryByName = async (name) => {
  const recipe = await Recipe.findOne(
    {
      "categories.strCategory": name,
    },
    { categories: { $elemMatch: { strCategory: name } } }
  );
  return recipe ? recipe.categories[0] : null;
};

// Find all favorite recipes
const findFavorites = async () => {
  return await Recipe.find({
    "categories.status": "favourite",
  }).sort({ createdAt: -1 });
};

// Update the status of a category (either 'favourite' or 'unfavourite')
const updateCategoryStatus = async (categoryId, status) => {
  const recipe = await Recipe.findOne(
    { "categories.idCategory": categoryId },
    { categories: { $elemMatch: { idCategory: categoryId } } }
  );
  if (!recipe) {
    return null;
  }
  const categoryIndex = recipe.categories.findIndex(
    (cat) => cat.idCategory === categoryId
  );
  if (categoryIndex !== -1) {
    recipe.categories[categoryIndex].status = status;
    await recipe.save();
  }
  return recipe.categories[categoryIndex];
};

module.exports = {
  save,
  findAll,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findCategoryById,
  findCategoryByName,
  findFavorites,
  updateCategoryStatus,
};
