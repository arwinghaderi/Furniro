const { errorResponse, successResponse } = require("../helper/responses");
const categoryModel = require("./../model/category");

exports.createCategory = async (req, res, next) => {
  try {
    const { title, href } = req.body;

    const isExistCategory = await categoryModel.findOne({
      $or: [{ title }, { href }],
    });
    if (isExistCategory) {
      return errorResponse(res, 400, "Category title or href Already exist");
    }

    const category = await categoryModel.create({
      title,
      href,
    });

    return successResponse(res, 201, category);
  } catch (err) {
    next(err);
  }
};
