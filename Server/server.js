const express = require("express");
const cors = require("cors");
require("express-async-errors");

//Database connection
const databaseConfig = require("./database/database.config");

const errorHandlerMiddleware = require("./error/error.middleware");
const NotFoundError = require("./error/error.classes/NotFoundError");

const constants = require("./constants");
require("dotenv").config();

// Middleware to parse JSON requests
const app = express();
app.use(cors());
app.use(express.json());

//import routes
const AuthRouter = require("./auth/auth.route");
const RecipeRouter = require("./recipe/recipe.route");
const UserRouter = require("./user/user.route");

//defines routes
app.use(constants.API.PREFIX.concat("/auth"), AuthRouter);
app.use(constants.API.PREFIX.concat("/receipe"), RecipeRouter);
app.use(constants.API.PREFIX.concat("/user"), UserRouter);

//error handler middleware
app.use(errorHandlerMiddleware);

//404 not found route
app.use((req, res, next) => {
  throw new NotFoundError("API endpoint not found!");
});

//start the server
const start = async () => {
  const port = process.env.PORT || 5001;
  try {
    await databaseConfig.connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
