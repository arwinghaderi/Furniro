const yup = require("yup");
const { isValidObjectId } = require("mongoose");

exports.addToCartValidator = yup.object({
  productId: yup
    .string()
    .required("Product ID is required")
    .test("is-valid-object-id", "Invalid product ID", (value) =>
      isValidObjectId(value)
    ),

  color: yup
    .string()
    .required("Color is required")
    .matches(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, "Invalid HEX color format"),

  size: yup
    .string()
    .required("Size is required")
    .oneOf(["S", "M", "L", "XL", "XXL", "XS"], "Invalid size"),

  quantity: yup
    .number()
    .required("Quantity is required")
    .positive()
    .integer()
    .min(1)
    .max(5, "You cannot add more than 5 of each product to the cart"),
});

exports.updateProductQuantityValidator = yup.object({
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive()
    .integer()
    .min(1)
    .max(5, "You cannot add more than 5 of each product to the cart"),
});
