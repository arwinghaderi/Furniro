const { errorResponse, successResponse } = require("../helper/responses");
const { generateAccessToken } = require("../helper/token");
const User = require("./../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateAccessToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // جلوگیری از دسترسی جاوااسکریپت
      sameSite: "strict", // محافظت در برابر حملات CSRF
      maxAge: 10 * 24 * 60 * 60 * 1000, // مدت اعتبار (مثلاً 7 روز)
    });

    return successResponse(res, 201, {
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 403, "Invalid Email Or Password !!");
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return errorResponse(res, 403, "Invalid Email Or Password !!");
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateAccessToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // جلوگیری از دسترسی جاوااسکریپت
      sameSite: "strict", // محافظت در برابر حملات CSRF
      maxAge: 10 * 24 * 60 * 60 * 1000, // مدت اعتبار (مثلاً 7 روز)
    });

    return successResponse(res, 200, {
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.getNewAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return errorResponse(res, 401, "'Refresh token not provided'");
  }

  try {
    const { id } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, 404, "User Not Found");
    }

    const accessToken = generateAccessToken(user.id);

    return successResponse(res, 200, {
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return errorResponse(res, 404, {
        message: "User Not found Or Token Not Valid!! , Plz login First",
      });
    }

    user.password = undefined;

    return successResponse(res, 200, { user });
  } catch (err) {
    next(err);
  }
};
