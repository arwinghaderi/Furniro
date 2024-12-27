const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: false,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
});

const model = mongoose.model("Contact", schema);

module.exports = model;
