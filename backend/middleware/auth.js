const jwt = require("jsonwebtoken");
const userModel = require("./../model/User");
const { errorResponse } = require("../helper/responses");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return errorResponse(res, 401, {
        message: "Unauthorized !! - token Not Found",
      });
    }
    const validToken = token.split(" ");

    if (validToken[0] !== "Bearer") {
      return errorResponse(res, 401, {
        message: "Plz Add Bearer in first of Token",
      });
    }

    const tokenValue = validToken[1];

    if (!tokenValue) {
      return errorResponse(res, 401, {
        message: "Unauthorized !! - Token not correct Format",
      });
    }

    const decoded = await jwt.decode(tokenValue, process.env.JWT_ACCESS_SECRET);

    if (!decoded) {
      return errorResponse(res, 403, {
        message: "Unauthorized !! Token Expired - Plz login first",
      });
    }

    const userId = decoded.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return errorResponse(res, 404, {
        message: "User Not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
