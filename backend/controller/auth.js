const { errorResponse, successResponse } = require("../helper/responses");
const { generateAccessToken } = require("../helper/token");
const User = require("./../model/User");
const bcrypt = require("bcrypt");

exports.userRegister = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return errorResponse(res, 401, "User Email has Exist");
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const userCount = await User.countDocuments();

    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
      role: userCount >= 1 ? "USER" : "ADMIN",
    });

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateAccessToken({ id: user.id, role: user.role });

    return successResponse(res, 200, {
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    //
  } catch (err) {
    next(err);
  }
};
