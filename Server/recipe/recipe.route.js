const express = require("express");
const recipeController = require("./recipe.controller");

const RecipeRouter = express.Router();

RecipeRouter.post("/createrecipe", recipeController.CreateRecipe);
RecipeRouter.get("/getAllRecipes", recipeController.GetAllCategories);
RecipeRouter.get("/category/:id", recipeController.GetCategoryById);

module.exports = RecipeRouter;
