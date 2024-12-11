const { errorResponse } = require("../helper/responses");

exports.isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "ADMIN") {
      return next();
    }
    return errorResponse(res, 401, "You can't Access this routes");
  } catch (err) {
    next(err);
  }
};
