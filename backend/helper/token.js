const jwt = require("jsonwebtoken");

exports.generateAccessToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE + "d",
  });
  return token;
};

exports.generateAccessToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE + "d",
  });
  return token;
};
