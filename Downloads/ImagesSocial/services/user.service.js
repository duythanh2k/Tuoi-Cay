const User   = require("../models/user.model");
const jwt    = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Kiểm tra chuỗi nhập vào có rỗng hay không
const isEmpty = function (value) {
  if (!value || 0 === value.length) {
    return true;
  }
};

//Kiểm tra có phải email hay không
const isEmail = function (value) {
  let filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  } else {
    return false;
  }
};

//Đăng nhập
exports.signUp = async function (user) {
  if (
    isEmpty(user.email)     ||
    isEmpty(user.password)  ||
    isEmpty(user.first_name) ||
    isEmpty(user.last_name)  ||
    isEmpty(user.dob)
  ) {
    let err = {
      code: "INVALID_INPUT",
      message: "Lack of information!",
    };
    throw err;
  }
  if (!isEmail(user.email)) {
    let err = {
      code: "DATATYPE_ERROR",
      message: "Invalid Email! (E.g some@thing.com)",
    };
    throw err;
  }
  let checkEmail = await User.findOne({ where: { email: user.email } });
  if (checkEmail != null) {
    let err = {
      code: "ER_DUP_ENTRY",
      message: "Email has already exist.",
    };
    throw err;
  }
  var result = await User.create(user);
  
  return result;
};

//Tạo một token mới khi đăng nhập
exports.generateToken = async (user, secretSignature) => {
  try {
    let checkUser = await User.findOne({ where: { email: user.email } });
    if (checkUser === null) {
      let err = {
        code: "NOT_FOUND",
        message: "User not found!",
      };
      throw err;
    }
    let isPassValid = bcrypt.compareSync(user.password, checkUser.password);
    if (!isPassValid) {
      let err = {
        code: "INCORRECT_PASSWORD",
        message: "Incorrect password!",
      };
      throw err;
    }
    const payload = {
      email: checkUser.email,
    };
    return jwt.sign(
      {
        payload,
      },
      secretSignature,
      {
        algorithm: "HS256",
      }
    );
  } catch (error) {
    throw error;
  }
};

// Kiêm tra token
exports.verifyToken = async (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw error;
  }
};

//Xóa token
exports.deleteToken = async (token) => {
  try {
    await jwt.destroy(token);
  } catch (err) {
    throw error;
  }
};

//Lấy thông tin user
exports.profile = async (email) => {
  try {
    let result = await User.findOne({ where: { email: email } });
    return (data = {
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      dob: result.dob,
      gender: result.gender,
      avatar: result.avatar,
    });
  } catch (err) {
    throw error;
  }
};
