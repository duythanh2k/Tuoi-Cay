const userService = require("../services/user.service");
const bcrypt      = require("bcryptjs");
require("dotenv").config;

exports.signUp = async function (req, res, next) {
  try {
    const hashPass = bcrypt.hashSync(req.body.password, 10);
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashPass,
      dob: req.body.dob,
      gender: req.body.gender,
      avatar: req.body.avatar,
    };
    await userService.signUp(user);
    res.status(200).json({
      status: "Success",
      code: null,
      message: null,
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      code: err.code,
      message: err.message,
      data: null,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const accessToken = await userService.generateToken(
      user,
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.json({
      status: "Success",
      code: null,
      message: null,
      data: accessToken,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      code: err.code,
      message: err.message,
      data: null,
    });
  }
};

exports.profile = async (req, res, next) => {
  try {
    let result = await userService.profile(req.email);
    return res.json({
      status: "Success",
      code: null,
      message: null,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      code: err.code,
      message: err.message,
      data: null,
    });
  }
};

exports.signOut = async (req, res, next) => {
  try {
    await userService.deleteToken(req.headers.authorization);
    return res.json({
      status: "Success",
      code: null,
      message: null,
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      code: err.code,
      message: err.message,
      data: null,
    });
  }
};
