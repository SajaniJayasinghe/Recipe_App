const express = require("express");
const authController = require("./auth.controller");

const AuthRouter = express.Router();
AuthRouter.post("/login", authController.LoginUser);
AuthRouter.post("/logout", authController.LogoutUser);

module.exports = AuthRouter;
