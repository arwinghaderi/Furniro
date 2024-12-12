const { errorResponse } = require("../helper/responses");

exports.isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "ADMIN") {
      return next();
    }
    return errorResponse(res, 403, {
      message: "Forbidden. Only admins can access this route",
    });
  } catch (err) {
    next(err);
  }
};
