const { errorResponse, successResponse } = require("../helper/responses");
const { generateAccessToken } = require("../helper/token");
const User = require("./../model/User");
const resetPasswordModel = require("./../model/resetPassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

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

exports.getResetPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "Email not Valid!!");
    }

    const resetCode = Math.floor(Math.random() * 99999);

    const resetTokenExpireTime = Date.now() + 1000 * 60 * 3;

    const resetPassword = new resetPasswordModel({
      user: user._id,
      code: resetCode,
      expireIn: resetTokenExpireTime,
    });

    resetPassword.save();

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password Code For Your Forniro Recovery Password",
      html: `
       <h2>Hi, ${user.fullname}</h2>
       <h3> Your Recovery Password Code is ${resetCode} ✌️❤️</h3>
      `,
    };

    transporter.sendMail(mailOptions);

    return successResponse(res, 200, { message: "Reset Password Code Sent" });
  } catch (err) {
    next(err);
  }
};

exports.verifyResetPasswordCode = async (req, res, next) => {
  try {
    const { code, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "Email not Valid!!");
    }

    const findCode = await resetPasswordModel.findOne({ user: user._id });
    if (!findCode) {
      return errorResponse(res, 404, "User Not Found!!");
    }

    if (findCode.expireIn.getTime() < Date.now()) {
      await resetPasswordModel.findByIdAndDelete({ _id: findCode._id });
      return successResponse(res, 403, "The Time of Code has expired");
    }

    if (code === findCode.code && findCode.expireIn.getTime() > Date.now()) {
      await resetPasswordModel.deleteMany({ user: user._id });
      return successResponse(res, 200, "Verified Code Successfully");
    }

    return errorResponse(res, 400, "The entered code is not correct");
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
