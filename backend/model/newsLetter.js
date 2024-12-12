const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

const model = mongoose.model("Newsletter", schema);

module.exports = model;
