const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const checkoutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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

    productItems: [productSchema],

    orderStatus: {
      type: String,
      enum: ["processing", "sent", "Delivered"],
      default: "processing",
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Checkout", checkoutSchema);

module.exports = model;
