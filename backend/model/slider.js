const mongoose = require("mongoose");

const schema = mongoose.Schema({
  imagePath: { type: String, required: true },
  title: { type: String, required: true },
  caption: { type: String, required: true },
});

const model = mongoose.model("Slider", schema);

module.exports = model;
