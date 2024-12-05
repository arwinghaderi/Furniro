const jwt = require("jsonwebtoken");

exports.generateAccessToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE,
  });
  return token;
};

exports.generateAccessToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
  return token;
};
