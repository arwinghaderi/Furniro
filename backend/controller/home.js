const { errorResponse, successResponse } = require("../helper/responses");
const productModel = require("./../model/product");
const favoriteModel = require("./../model/favorite");
const sliderModel = require("./../model/slider");

exports.homePage = async (req, res, next) => {
  try {
    const user = req.user;

    let fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const userFavorites = user
      ? await favoriteModel
          .findOne({ user: user._id })
          .then((fav) => fav?.items.map((item) => item.toString()) || [])
      : [];

    let products = await productModel.aggregate([
      { $match: {} },
      { $sample: { size: 8 } },
      {
        $addFields: {
          isNewProduct: { $gte: ["$updatedAt", fourWeeksAgo] },
          isFavorite: { $in: [{ $toString: "$_id" }, userFavorites] },
        },
      },
      {
        $project: {
          size: 0,
          colors: 0,
          description: 0,
          attributes: 0,
          __v: 0,
        },
      },
    ]);

    return successResponse(res, 200, {
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.addSlider = async (req, res, next) => {
  try {
    const { caption, title } = req.body;

    if (!req.file) {
      return errorResponse(res, 400, "Pleaz Upload an Image for Slider");
    }
    let sliderCount = await sliderModel.countDocuments();
    const countFormat =
      sliderCount < 9 ? `0${sliderCount + 1}-` : `${sliderCount + 1}-`;

    const slider = await sliderModel.create({
      imagePath: `/images/slider/${req.file.filename}`,
      title: countFormat + title,
      caption,
    });

    return successResponse(res, 201, { slider });
  } catch (err) {
    next(err);
  }
};

exports.sliderInfo = async (req, res, next) => {
  try {
    const sliders = await sliderModel.find().lean().select("-__v");
    if (!sliders) {
      return errorResponse(res, 404, "Slider Not Found!");
    }

    return successResponse(res, 200, { sliders });
  } catch (err) {
    next(err);
  }
};
