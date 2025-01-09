const { isValidObjectId, default: mongoose } = require("mongoose");
const productModel = require("./../model/product");
const categoryModel = require("./../model/category");
const favoriteModel = require("./../model/favorite");
const { errorResponse, successResponse } = require("../helper/responses");
const validator = require("../middleware/validator");
const { createProductValidator } = require("./../validator/product");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const { createPagination } = require("../utils/paganition");

exports.getAllProducts = async (req, res, next) => {
  try {
    let { title, category, page = 1, limit = 8, discount, isNew } = req.query;
    const user = req.user;
    const fourWeeksAgo = moment().subtract(4, "weeks").toDate();

    const filters = { quantity: { $gt: 0 } };

    if (title) filters.title = { $regex: title, $options: "i" };

    if (isValidObjectId(category)) {
      filters.categoryId =
        mongoose.Types.ObjectId.createFromHexString(category);
    }

    if (discount === "true") filters.discountPercent = { $gt: 0 };

    if (isNew === "true") {
      filters.createdAt = { $gte: fourWeeksAgo };
    }

    const userFavorites = user
      ? await favoriteModel
          .findOne({ user: user._id })
          .then((fav) => fav?.items.map((item) => item.toString()) || [])
      : [];

    let products = await productModel.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "product",
          as: "comments",
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$comments" }, 0] },
              then: { $avg: "$comments.rating" },
              else: 0,
            },
          },
          isNewProduct: { $gte: ["$createdAt", fourWeeksAgo] },
          isFavorite: { $in: [{ $toString: "$_id" }, userFavorites] },
        },
      },
      {
        $project: {
          comments: 0,
          size: 0,
          colors: 0,
          description: 0,
          attributes: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: +limit },
    ]);

    const totalProducts = await productModel.countDocuments(filters);

    return successResponse(res, 200, {
      products,
      pagination: createPagination(+page, +limit, totalProducts, "Products"),
    });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    let {
      name,
      title,
      description,
      categoryId,
      price,
      discountPercent,
      colors,
      quantity,
      size,
      attributes,
    } = req.body;

    attributes = JSON.parse(attributes);
    colors = JSON.parse(colors);
    size = JSON.parse(size);
    let hexColorCode = [];

    let priceAfterDiscount = undefined;
    let images = [];

    validator(createProductValidator);

    colors.forEach((color) => {
      hexColorCode.push(color.hexColorCode);
    });

    const category = await categoryModel.findById(categoryId);
    if (!isValidObjectId(categoryId) || !category) {
      return errorResponse(res, 404, {
        message: "Category Not Found Or CategoryId is not valid",
      });
    }

    if (discountPercent > 0) {
      priceAfterDiscount = price - (price * discountPercent) / 100;
    }

    if (req.files) {
      for (let i = 0; i < req.files?.length; i++) {
        const file = req.files[i];
        const path = file?.filename;

        let color = hexColorCode[i] || "null";

        images.push({
          hexColorCode: color,
          path: `/images/products/${path}`,
        });
      }
    } else {
      return errorResponse(res, 400, {
        message: "Plz Upload images befor Add product",
      });
    }

    const newProduct = await productModel.create({
      name,
      title,
      description,
      categoryId,
      price,
      discountPercent,
      priceAfterDiscount,
      quantity,
      colors,
      size,
      images,
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

    let product = await productModel.aggregate([
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "product",
          as: "comments",
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$comments" }, 0] },
              then: { $avg: `$comments.rating` },
              else: 0,
            },
          },
        },
      },
      {
        $project: {
          comments: 0,
        },
      },
    ]);

    if (product.length === 0) {
      return errorResponse(res, 404, { message: "Product Not Found" });
    }

    return successResponse(res, 200, { product });
  } catch (err) {
    next(err);
  }
};

exports.getAllFavorites = async (req, res, next) => {
  try {
    const user = req.user;
    const userFavorites = await favoriteModel
      .findOne({ user: user._id })
      .populate({
        path: "items",
        select:
          "name title price discountPercent description priceAfterDiscount images slug rating label",
      })
      .populate({
        path: "user",
        select: "-password",
      })
      .select("-createdAt -updatedAt -__v");

    if (!userFavorites) {
      return errorResponse(res, 404, {
        message: "There is no product in your Favorite list!!",
      });
    }

    return successResponse(res, 200, { favorites: userFavorites });
  } catch (err) {
    next(err);
  }
};

exports.addToFavorites = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    const product = await productModel.findById(productId);

    if (!isValidObjectId(productId) || !product) {
      return errorResponse(res, 404, { message: "Poroduct Not Found !!" });
    }

    await favoriteModel.findOneAndUpdate(
      { user: user._id },
      { $addToSet: { items: productId } },
      { upsert: true }
    );

    return successResponse(res, 201, {
      message: "Product Add to Favorite List",
    });
  } catch (err) {
    next(err);
  }
};

exports.removeFromFavorites = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    if (!isValidObjectId(productId)) {
      return errorResponse(res, 400, {
        message: "Poroduct Id not Valid format!!",
      });
    }

    const userFavorites = await favoriteModel.findOne({ user: user._id });
    if (!userFavorites) {
      return errorResponse(res, 404, {
        message: "There is no product in your Favorite list!!",
      });
    }

    const product = userFavorites.items.findIndex((item) => {
      return item.toString() === productId.toString();
    });

    if (product === -1) {
      return errorResponse(res, 404, {
        message: "This Product is not in your Favorite list !!",
      });
    }

    userFavorites.items.splice(product, 1);
    await userFavorites.save();

    return successResponse(res, 200, {
      message: "Product Removed From Your Favorites",
    });
  } catch (err) {
    next(err);
  }
};

exports.searchItem = async (req, res, next) => {
  try {
    let { title, page = 1, limit = 8 } = req.query;

    const filters = {
      quantity: { $gt: 0 },
    };

    if (!title) {
      return errorResponse(res, 400, {
        message: "Please enter a title to search",
      });
    }
    filters.title = { $regex: title, $options: "i" };

    const products = await productModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(+limit)
      .select(
        "-__v -description -size -attributes -createdAt -updatedAt -colors"
      );

    if (products.length === 0) {
      return errorResponse(res, 404, {
        message: "No product found",
      });
    }

    const totalProduct = await productModel.countDocuments(filters);

    return successResponse(res, 200, {
      products,
      pagination: createPagination(page, limit, totalProduct, "SearchProduct"),
    });
  } catch (err) {
    next(err);
  }
};
