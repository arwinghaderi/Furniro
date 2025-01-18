const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  postallCode: {
    type: String,
    required: true,
  },
  fullAddress: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Checkout", schema);

module.exports = model;
