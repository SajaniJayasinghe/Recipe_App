const jwt = require("jsonwebtoken");
const authUtil = require("./auth.utill");
const UnauthorizedError = require("../error/error.classes/UnauthorizedError");
require("dotenv").config();

const authorize = () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authentication invalid!");
    }

    const token = authUtil.extractToken(authHeader);
    if (token) {
      let payload = null;

      // Verify token
      try {
        payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      } catch (err) {
        if (err.name === "TokenExpiredError")
          throw new UnauthorizedError("Your session is expired!");
        return next(
          new UnauthorizedError(`You're unauthorized to access this resource!`)
        );
      }
      req.auth = payload;
      return next();
    } else {
      return next(
        new UnauthorizedError(`You're unauthorized to access this resource!`)
      );
    }
  };
};

module.exports = { authorize };
