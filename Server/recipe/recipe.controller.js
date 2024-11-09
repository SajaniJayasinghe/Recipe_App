const { StatusCodes } = require("http-status-codes");
const { startSession } = require("mongoose");
const Recipe = require("./recipe.model");
const RecipeService = require("./recipe.service");

//Create a new Recipe
const CreateRecipe = async (req, res) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const { categories } = req.body;

    if (!categories || categories.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Categories are required" });
    }

    // Create a new Recipe with the passed categories
    const recipeData = { categories };

    const recipe = new Recipe(recipeData);

    const createdRecipe = await RecipeService.save(recipe, session);
    await session.commitTransaction();

    res.status(StatusCodes.CREATED).json({
      message: "Recipe created successfully",
      recipe: createdRecipe,
    });
  } catch (error) {
    await session.abortTransaction();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  } finally {
    session.endSession();
  }
};

//Get All Categories
const GetAllCategories = async (req, res) => {
  try {
    const recipes = await RecipeService.findAll();
    res.status(StatusCodes.OK).json(recipes);
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

//Get one Category by ID
const GetCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await RecipeService.findCategoryById(categoryId);

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Category not found" });
    }

    res.status(StatusCodes.OK).json({
      message: "Category found",
      category: category,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
//Get one Category by Name
const GetCategoryByName = async (req, res) => {
  try {
    const categoryName = req.params.name;
    const category = await RecipeService.findCategoryByName(categoryName);

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Category not found" });
    }

    res.status(StatusCodes.OK).json({
      message: "Category found",
      category: category,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// GetFavoriteCategories
const GetFavoriteCategories = async (req, res) => {
  try {
    const recipes = await RecipeService.findFavorites();

    if (!recipes || recipes.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No favorite categories found",
      });
    }
    res.status(StatusCodes.OK).json(recipes);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Update category's favorite status
const UpdateCategoryStatus = async (req, res) => {
  const { categories } = req.body;

  if (!categories || categories.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Categories are required" });
  }
  const validStatuses = ["favourite", "unfavourite"];
  const invalidStatuses = categories.filter(
    (category) => !validStatuses.includes(category.status)
  );

  if (invalidStatuses.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid status. Status must be 'favourite' or 'unfavourite'.",
      invalidCategories: invalidStatuses,
    });
  }

  try {
    const updatePromises = categories.map((category) =>
      RecipeService.updateCategoryStatus(category.idCategory, category.status)
    );
    await Promise.all(updatePromises);
    res.status(StatusCodes.OK).json({
      message: "Categories status updated successfully",
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  CreateRecipe,
  GetAllCategories,
  GetCategoryById,
  GetCategoryByName,
  GetFavoriteCategories,
  UpdateCategoryStatus,
};
