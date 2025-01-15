const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
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

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

cartSchema.virtual("totalPrice").get(function () {
  let allPrice = 0;
  let allDiscount = 0;

  this.items.forEach((item) => {
    const discountAmount =
      (item.product.price * item.product.discountPercent) / 100;
    const discountedPrice = item.product.price - discountAmount;

    allDiscount += discountAmount * item.quantity;
    allPrice += discountedPrice * item.quantity;
  });

  return {
    allPrice,
    allDiscount,
  };
});
const model = mongoose.model("Cart", cartSchema);

module.exports = model;
