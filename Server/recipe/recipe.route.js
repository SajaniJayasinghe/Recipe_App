const express = require("express");
const recipeController = require("./recipe.controller");

const RecipeRouter = express.Router();

RecipeRouter.post("/createrecipe", recipeController.CreateRecipe);
RecipeRouter.get("/getAllRecipes", recipeController.GetAllCategories);
RecipeRouter.get("/category/:id", recipeController.GetCategoryById);
RecipeRouter.get("/categories/:name", recipeController.GetCategoryByName);
RecipeRouter.get("/favorites", recipeController.GetFavoriteCategories);
RecipeRouter.put(
  "/category/favorite/:id",
  recipeController.UpdateCategoryStatus
);

module.exports = RecipeRouter;
