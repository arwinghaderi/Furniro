const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    reply: { replySchema, default: null },
  },
  { timestamps: true }
);

const model = mongoose.model("Comment", commentSchema);

module.exports = model;
