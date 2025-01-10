const { errorResponse, successResponse } = require("../helper/responses");
const productModel = require("./../model/product");

exports.homePage = async (req, res, next) => {
  try {
    const product = await productModel.find().limit(8);

    if (!product) {
      return errorResponse(res, 404, { message: "No Product found !" });
    }

    return successResponse(res, 200, { product });
  } catch (err) {
    next(err);
  }
};
