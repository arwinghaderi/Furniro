const { isValidObjectId } = require("mongoose");
const yup = require("yup");

exports.createProductValidator = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters long")
    .max(100, "Product name cannot exceed 100 characters"),

  slug: yup
    .string()
    .required("Slug is required")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly"),

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
    .max(100, "The discountPercent must beetwin 0 , 100"),

  rating: yup
    .number()
    .positive("rating must be a positive number")
    .required("rating is required (Beetwin 1 , 5)")
    .min(1, "The rating must beetwin 1 , 5")
    .max(5, "The rating must beetwin 1 , 5"),

  quantity: yup
    .number()
    .required("Stock is required")
    .min(0, "Stock must be a non-negative number"),

  attributes: yup
    .object()
    .test(
      "customFieldsCheck",
      "customFields must be an object with key-value pairs",
      (value) => value === undefined || typeof value === "object"
    ),
});
