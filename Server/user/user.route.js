const express = require("express");
const userController = require("../user/user.controller");

const UserRouter = express.Router();

UserRouter.post("/register", userController.CreateUser);
UserRouter.get("/users/:id", userController.GetUserById);

module.exports = UserRouter;
