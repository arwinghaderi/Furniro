const { errorResponse, successResponse } = require("../helper/responses");
const productModel = require("./../model/product");
const favoriteModel = require("./../model/favorite");

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
