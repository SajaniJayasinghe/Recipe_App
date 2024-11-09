const { StatusCodes } = require("http-status-codes");
const authService = require("./auth.service");
const authUtil = require("./auth.utill");

const BadRequestError = require("../error/error.classes/BadRequestError");
const UnauthorizedError = require("../error/error.classes/UnauthorizedError");
const NotFoundError = require("../error/error.classes/NotFoundError");

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are required!");
  }

  //check if user exists
  const isAuthCheck = await authService.findById(email);

  if (!isAuthCheck) {
    throw new NotFoundError("Invalid Email!");
  }
  const isPasswordCorrect = await authUtil.comparePassword(
    password,
    isAuthCheck.password
  );

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Password");
  }

  const dbPopulatedUser = await isAuthCheck.populate("user");
  const token = authUtil.signToken(dbPopulatedUser.user);

  return res
    .status(StatusCodes.OK)
    .setHeader("authorization", `Bearer ${token}`)
    .json({
      message: "Login Successful",
      token: token,
    });
};
const LogoutUser = (req, res) => {
  res.setHeader("authorization", "");
  res.clearCookie("token");

  return res.status(StatusCodes.OK).json({
    message: "Logout Successful",
  });
};

module.exports = {
  LoginUser,
  LogoutUser,
};
