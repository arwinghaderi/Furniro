const { isValidObjectId } = require("mongoose");
const yup = require("yup");

exports.createProductValidator = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters long")
    .max(30, "Product name cannot exceed 100 characters"),

  title: yup
    .string()
    .required("Product name is required")
    .min(10, "Product name must be at least 3 characters long")
    .max(50, "Product name cannot exceed 100 characters"),

  description: yup
    .string()
    .required("Product description is required")
    .max(3000, "Product description cannot exceed 3000 characters"),

  category: yup
    .string()
    .required("SubCategory ID is required")
    .test(
      "is-valid-objectid",
      "SubCategory ID must be a valid ObjectId",
      isValidObjectId
    ),

  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),

  discountPercent: yup
    .number()
    .positive("discountPercent must be a positive number")
    .required("discountPercent is required (Beetwin 0 , 100)")
    .min(0, "The discountPercent must beetwin 0 , 100")
    .max(100, "The discountPercent must beetwin 0 , 100")
    .default(0),

  quantity: yup
    .number()
    .required("Stock is required")
    .min(1, "Stock must be a non-negative number"),

  attributes: yup
    .object()
    .test(
      "customFieldsCheck",
      "customFields must be an object with key-value pairs",
      (value) => value === undefined || typeof value === "object"
    ),
});
