const { isValidObjectId, default: mongoose } = require("mongoose");
const productModel = require("./../model/product");
const categoryModel = require("./../model/category");
const favoriteModel = require("./../model/favorite");
const { errorResponse, successResponse } = require("../helper/responses");
const validator = require("../middleware/validator");
const { createProductValidator } = require("./../validator/product");
const path = require("path");
const fs = require("fs");
const { createPagination } = require("../utils/paganition");

exports.getAllProducts = async (req, res, next) => {
  try {
    let { title, category, page = 1, limit = 8 } = req.query;
    const user = req.user;
    let fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const filters = { quantity: { $gt: 0 } };

    if (title) filters.title = { $regex: title, $options: "i" };

    if (category && isValidObjectId(category)) {
      const categoryDoc = await categoryModel.findById(category);
      if (categoryDoc) {
        const { href } = categoryDoc;

        if (href.toLowerCase() === "all") {
        } else if (href.toLowerCase() === "new") {
          filters.createdAt = { $gte: fourWeeksAgo };
        } else if (href.toLowerCase() === "discount") {
          filters.discountPercent = { $gt: 0 };
        } else {
          filters.categoryId =
            mongoose.Types.ObjectId.createFromHexString(category);
        }
      }
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
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryId",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                href: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$categoryId",
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
              then: { $avg: "$comments.rating" },
              else: 0,
            },
          },
          isNewProduct: { $gte: ["$updatedAt", fourWeeksAgo] },
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
    const user = req.user;
    let fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const userFavorites = user
      ? await favoriteModel
          .findOne({ user: user._id })
          .then((fav) => fav?.items.map((item) => item.toString()) || [])
      : [];

    let product = await productModel.aggregate([
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryId",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                href: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$categoryId",
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
              then: { $avg: "$comments.rating" },
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

    const productId = product[0]._id.toString();
    const categoryId = product[0].categoryId._id.toString();
    const relatedProducts = await productModel.aggregate([
      {
        $match: {
          categoryId: new mongoose.Types.ObjectId(categoryId),
          _id: { $ne: new mongoose.Types.ObjectId(productId) },
        },
      },
      {
        $addFields: {
          isFavorite: { $in: [{ $toString: "$_id" }, userFavorites] },
          isNewProduct: { $gte: ["$updatedAt", fourWeeksAgo] },
        },
      },
      {
        $project: {
          description: 0,
          colors: 0,
          size: 0,
          attributes: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);

    return successResponse(res, 200, {
      product,
      relatedProducts,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllFavorites = async (req, res, next) => {
  try {
    const user = req.user;
    let { page = 1, limit = 4 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const userFavorites = await favoriteModel
      .findOne({ user: user._id })
      .populate({
        path: "items",
        select:
          "name title price discountPercent priceAfterDiscount images slug updatedAt",
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

    const totalFavorites = userFavorites.items.length;

    const paginatedItems = userFavorites.items
      .slice((page - 1) * limit, page * limit)
      .map((item) => ({
        ...item._doc,
        isFavorite: true,
        isNewProduct: new Date(item.updatedAt) >= fourWeeksAgo,
      }));

    return successResponse(res, 200, {
      favorites: paginatedItems,
      pagination: createPagination(+page, +limit, totalFavorites, "Favorites"),
    });
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

    const userFavorites = await favoriteModel
      .findOne({ user: user._id })
      .then((fav) => fav?.items.map((item) => item.toString()) || []);

    return successResponse(res, 201, {
      message: "Product Add to Favorite List",
      userFavorites,
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
    let { title, page = 1, limit = 4 } = req.query;
    const user = req.user;
    page = parseInt(page);
    limit = parseInt(limit);

    let fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const filters = {
      quantity: { $gt: 0 },
    };

    if (!title) {
      return errorResponse(res, 400, {
        message: "Please enter a title to search",
      });
    }

    filters.title = { $regex: title, $options: "i" };

    const userFavorites = user
      ? await favoriteModel
          .findOne({ user: user._id })
          .then((fav) => fav?.items.map((item) => item.toString()) || [])
      : [];

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

    const productsWithFlags = products.map((product) => ({
      ...product,
      isFavorite: userFavorites.includes(product._id.toString()),
      isNewProduct: new Date(product.updatedAt) >= fourWeeksAgo,
    }));

    const totalProduct = await productModel.countDocuments(filters);

    return successResponse(res, 200, {
      products: productsWithFlags,
      pagination: createPagination(
        +page,
        +limit,
        totalProduct,
        "SearchProduct"
      ),
    });
  } catch (err) {
    next(err);
  }
};
