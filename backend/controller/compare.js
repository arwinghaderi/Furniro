const { isValidObjectId } = require("mongoose");
const categoryModel = require("./../model/category");
const productModel = require("./../model/product");
const { errorResponse, successResponse } = require("../helper/responses");

exports.getCategoryProducts = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    if (!isValidObjectId(categoryId)) {
      return errorResponse(res, 403, { message: "Category ID is not Valid!" });
    }

    const category = await categoryModel.findOne({ _id: categoryId });
    if (!category) {
      return errorResponse(res, 404, { message: "Category not Found!" });
    }

    const products = await productModel.find({ categoryId });
    return successResponse(res, 200, { products });
  } catch (err) {
    next(err);
  }
};

exports.addProductToCompare = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!isValidObjectId(productId)) {
      return errorResponse(res, 403, { message: "Product ID is not Valid!" });
    }

    const product1 = await productModel.findOne({ _id: productId });
    if (!product1) {
      return errorResponse(res, 404, { message: "Product not Found!" });
    }

    const categoryId = product1.categoryId;
    const otherProducts = await productModel.find({
      categoryId,
      _id: { $ne: product1._id },
    });

    return successResponse(res, 200, {
      product1,
      otherProducts,
    });
  } catch (err) {
    next(err);
  }
};
