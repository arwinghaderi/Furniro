const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    expireIn: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("ResetPassword", schema);

module.exports = model;
