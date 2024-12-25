const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
      default: 0,
      required: false,
    },
    priceAfterDiscount: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },

    colors: [
      {
        name: { type: String, required: true, trim: true },
        hexColorCode: { type: String, required: true, trim: true },
      },
    ],

    images: [
      {
        hexColorCode: { type: String, required: true, trim: true },
        path: { type: String, required: true, trim: true },
      },
    ],

    label: {
      type: [String],
      enum: ["Discount", "New"],
      required: false,
    },
    size: {
      type: [String],
      enum: ["L", "XL", "XS"],
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    attributes: {
      type: Map, //   Map -> Key - Value Pair
      of: mongoose.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  const uniqe = Math.floor(Math.random() * 99999) + 1111;

  if (!this.slug) {
    this.slug = `${this.name.toLowerCase().replace(/ /g, "-")}-${uniqe}`;
  }

  const randomRate = [3, 4, 5];
  const randomIndex = Math.floor(Math.random() * randomRate.length);
  const score = randomRate[randomIndex];
  this.rating = score;

  next();
});

const model = mongoose.model("Product", productSchema);

module.exports = model;
