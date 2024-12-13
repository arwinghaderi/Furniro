const { isValidObjectId } = require("mongoose");
const { errorResponse, successResponse } = require("../helper/responses");
const categoryModel = require("./../model/category");

exports.createCategory = async (req, res, next) => {
  try {
    const { title, href } = req.body;

    const isExistCategory = await categoryModel.findOne({
      $or: [{ title }, { href }],
    });
    if (isExistCategory) {
      return errorResponse(res, 400, {
        message: "Category title or href Already exist",
      });
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

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel
      .find({})
      .select("-createdAt -updatedAt -__v");
    if (!categories) {
      return errorResponse(res, 404, { message: "Category Not Found!!" });
    }

    return successResponse(res, 200, { categories });
  } catch (err) {
    next(err);
  }
};

exports.removeCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!isValidObjectId(categoryId)) {
      return errorResponse(res, 400, {
        nessage: "Category ObjectId not valid !!",
      });
    }

    const findAndRemoveCategory = await categoryModel.findOneAndDelete({
      _id: categoryId,
    });
    if (!findAndRemoveCategory) {
      return errorResponse(res, 404, { message: "Category Not found" });
    }

    return successResponse(res, 200, {
      message: "Category Removed successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCategoryInfo = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { title, href } = req.body;

    if (!isValidObjectId(categoryId)) {
      return errorResponse(res, 400, {
        nessage: "Category ObjectId not valid !!",
      });
    }

    const findAndUpdateCategory = await categoryModel.findOneAndUpdate(
      {
        _id: categoryId,
      },
      { title, href },
      { new: true }
    );
    if (!findAndUpdateCategory) {
      return errorResponse(res, 404, {
        message: "Category Not found",
      });
    }

    return successResponse(res, 200, {
      message: "Category Updated successfully",
      updateCategory: findAndUpdateCategory,
    });
  } catch (err) {
    next(err);
  }
};
