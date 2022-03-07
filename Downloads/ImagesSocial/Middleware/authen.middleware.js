const userService = require("../services/user.service");
require("dotenv").config();

exports.isAuth = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({
        status: "Error",
        code: "NOT_FOUND",
        message: "Can not found access token",
        data: null,
      });
    }
    const verified = await userService.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!verified) {
      return res.status(403).json({
        status: "Error",
        code: "UNAUTHOREZID",
        message: "You must login to continue",
        data: null,
      });
    }
    req.email = verified.payload.email;
    return next();
  } catch (err) {
    throw err;
  }
};
