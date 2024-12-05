const errorResponse = (res, statusCode, message, data) => {
  return res
    .status(statusCode)
    .json({ status: statusCode, success: false, error: message, data });
};

const successResponse = (res, statusCode = 200, data) => {
  return res
    .status(statusCode)
    .json({ status: statusCode, success: true, data });
};

module.exports = { errorResponse, successResponse };
