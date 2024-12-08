const jwt = require("jsonwebtoken");
const userModel = require("./../model/User");
const { successResponse, errorResponse } = require("./../helper/token");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return errorResponse(res, 401, {
        message: "Token not found , Plz Login or Register first",
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
        message: "Token not found , Plz Login or Register first",
      });
    }

    const decoded = await jwt.decode(tokenValue, process.env.JWT_ACCESS_SECRET);

    if (!decoded) {
      return errorResponse(res, 401, {
        message: "Token Expired already, Plz Login first",
      });
    }

    const userId = decoded.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return errorResponse(res, 404, {
        message: "User Not found , Plz Send Valid token",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
