const { isValidObjectId } = require("mongoose");
const productModel = require("./../model/product");
const categoryModel = require("./../model/category");
const { errorResponse, successResponse } = require("../helper/responses");
const validator = require("../middleware/validator");
const { createProductValidator } = require("./../validator/product");
const path = require("path");
const fs = require("fs");

exports.createProduct = async (req, res, next) => {
  try {
    let {
      name,
      description,
      categoryId,
      price,
      discountPercent,
      quantity,
      size,
      attributes,
    } = req.body;

    attributes = JSON.parse(attributes);
    size = JSON.parse(size);

    let priceAfterDiscount = undefined;
    let label = ["New"];
    let images = [];

    validator(createProductValidator);

    const category = await categoryModel.findById(categoryId);
    if (!isValidObjectId(categoryId) || !category) {
      return errorResponse(res, 404, {
        message: "Category Not Found Or CategoryId is not valid",
      });
    }

    if (discountPercent > 0) {
      priceAfterDiscount = price - (price * discountPercent) / 100;
      label.push("Discount");
    }

    if (req.files) {
      for (let i = 0; i < req.files?.length; i++) {
        const file = req.files[i];
        const filename = file?.filename;

        images.push({
          filename,
          path: `/images/products/${filename}`,
        });
      }
    } else {
      return errorResponse(res, 400, {
        message: "Plz Upload images befor Add product",
      });
    }

    const newProduct = await productModel.create({
      name,
      description,
      categoryId,
      price,
      discountPercent,
      priceAfterDiscount,
      quantity,
      size,
      images,
      label,
      attributes,
    });

    return successResponse(res, 200, {
      message: "Product Created Successfully",
      newProduct,
    });
  } catch (err) {
    next(err);
  }
};

exports.removeProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return errorResponse(res, 400, {
        message: "productId is not valid",
      });
    }

    const product = await productModel.findOneAndDelete({ _id: productId });

    if (!product) {
      return errorResponse(res, 404, {
        message: "Product Not Found",
      });
    }

    product.images?.forEach((image) => {
      let imagePath = path.join(__dirname, `../public/${image.path}`);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            return errorResponse(res, 400, {
              message: `Err in Remove Product images ->${err}`,
            });
          }
        });
      }
    });

    return successResponse(res, 200, {
      message: "Product and ProductImages Removed Successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await productModel.findOne({ slug });
    if (!product) {
      return errorResponse(res, 404, { message: "Product Not Found" });
    }

    return successResponse(res, 200, { product });
  } catch (err) {
    next(err);
  }
};
