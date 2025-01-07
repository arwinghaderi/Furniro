const jwt = require("jsonwebtoken");
const userModel = require("./../model/User");
const { errorResponse } = require("../helper/responses");

exports.optionalAuth = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
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

    try {
      const decoded = await jwt.decode(
        tokenValue,
        process.env.JWT_ACCESS_SECRET
      );
      if (!decoded) {
        return errorResponse(res, 403, {
          message: "Unauthorized !! Token Expired",
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
    } catch (err) {
      next(err);
    }
  }

  next();
};
