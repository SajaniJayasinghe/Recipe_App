const { StatusCodes } = require("http-status-codes");
const { startSession } = require("mongoose");
const userUtil = require("./user.util");
const User = require("./user.model");
const Auth = require("../auth/auth.model");
const UserService = require("./user.service");
const AuthService = require("../auth/auth.service");

//Error messages
const BadRequestError = require("../error/error.classes/BadRequestError");
const NotFoundError = require("../error/error.classes/NotFoundError");

//Create User
const CreateUser = async (req, res) => {
  const { password } = req.body;
  const user = new User(req.body);

  //validate Password
  if (!password) {
    throw new BadRequestError("Password is required");
  }
  // Construct auth object
  const auth = new Auth();
  auth._id = user.email;
  auth.password = await userUtil.getEncryptedPassword(password);
  auth.user = user;

  let createdUser = null;

  // Start mongoose default session to handle transactions
  const session = await startSession();
  try {
    session.startTransaction();

    // Save user and auth
    createdUser = await UserService.save(user, session);
    await AuthService.save(auth, session);
    await session.commitTransaction();

    return res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

// Get User by ID
const GetUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return res.status(StatusCodes.OK).json({
      message: "User found",
      user: user,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

module.exports = { CreateUser, GetUserById };
