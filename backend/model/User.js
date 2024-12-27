const mongoose = require("mongoose");

const schema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("User", schema);

module.exports = model;
