const { isValidObjectId } = require("mongoose");
const { successResponse, errorResponse } = require("../helper/responses");
const cartModel = require("./../model/cart");
const productModel = require("./../model/product");

exports.addToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId, quantity, color, size } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return errorResponse(res, 404, { message: "Product Not Found" });
    }

    const existCart = await cartModel.findOne({ user: user._id });
    if (existCart) {
      const productIndexInItems = existCart.items.findIndex((item) => {
        return (
          item.product.toString() === productId &&
          item.color === req.body.color &&
          item.size === req.body.size
        );
      });

      if (productIndexInItems !== -1) {
        const item = existCart.items[productIndexInItems];

        if (item.size === size && item.color === color) {
          const totalQuantity = item.quantity + quantity;
          if (totalQuantity <= 5) {
            existCart.items[productIndexInItems].quantity += quantity;
          } else {
            return errorResponse(res, 400, {
              message: `You cannot add more than 5 of each product to the cart You have ${item.quantity} of this product in your cart`,
            });
          }
        } else {
          existCart.items.push({
            product: productId,
            quantity,
            color,
            size,
          });
        }
      } else {
        existCart.items.push({
          product: productId,
          quantity,
          color,
          size,
        });
      }

      await existCart.save();
      const finalResponse = await existCart.populate({
        path: "items.product",
        select:
          "-categoryId -description -label -rating -size -attributes -createdAt -updatedAt -__v",
      });

      return successResponse(res, 200, {
        message: "Product Add to Cart Successfully",
        cart: finalResponse,
      });
    } else {
      const cart = await cartModel.create({
        user,
        items: [
          {
            product: productId,
            quantity,
            color,
            size,
          },
        ],
      });

      const finalResponse = await cartModel
        .findOne({ _id: cart._id })
        .populate({
          path: "items.product",
          select:
            "-categoryId -description -label -rating -size -attributes -createdAt -updatedAt -__v",
        })
        .lean();

      return successResponse(res, 201, {
        message: "Product Add to Cart Successfully",
        cart: finalResponse,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.showUserCart = async (req, res, next) => {
  try {
    const user = req.user;

    const userCart = await cartModel.findOne({ user: user._id });
    if (!userCart) {
      return errorResponse(res, 404, {
        message: "No products were found in your shopping cart",
      });
    }

    await userCart.populate({
      path: "items.product",
      select:
        "-categoryId -description -label -rating -size -attributes -createdAt -updatedAt -__v",
    });

    return successResponse(res, 200, { cart: userCart });
  } catch (err) {
    next(err);
  }
};

exports.removeItemFromProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const { itemId } = req.params;
    if (!isValidObjectId(itemId)) {
      return errorResponse(res, 404, { message: "Product Item Id Not Valid" });
    }

    const userCart = await cartModel.findOne({ user: user._id });
    if (userCart.items.length === 0) {
      return errorResponse(res, 400, { message: "Your Cart is Empty" });
    }

    const item = userCart.items.find((item) => {
      return item._id.toString() === itemId;
    });

    if (!item) {
      return errorResponse(res, 404, {
        message: "Product not Found in your Cart Items",
      });
    }

    userCart.items.pull(item);
    await userCart.save();

    return successResponse(res, 200, { message: "Product Removed From Cart" });
  } catch (err) {
    next(err);
  }
};

exports.updateProductQuantity = async (req, res, next) => {
  try {
    const user = req.user;
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!isValidObjectId(itemId)) {
      return errorResponse(res, 404, { message: "Product Item Id Not Valid" });
    }

    const userCart = await cartModel.findOne({ user: user._id });
    if (userCart.items.length === 0) {
      return errorResponse(res, 400, { message: "Your Cart is Empty" });
    }

    const item = userCart.items.find((item) => {
      return item._id.toString() === itemId;
    });

    if (!item) {
      return errorResponse(res, 404, {
        message: "Product not Found",
      });
    }

    if (quantity <= 5) {
      item.quantity = quantity;
    } else {
      return errorResponse(res, 400, {
        message:
          "You cannot add more than 5 of each product to the cart You have ",
      });
    }

    await userCart.save();
    userCart.populate({
      path: "items.product",
      select:
        "-categoryId -description -label -rating -size -attributes -createdAt -updatedAt -__v",
    });

    return successResponse(res, 200, {
      message: "Your shopping cart has been updated",
      cart: userCart,
    });
  } catch (err) {
    next(err);
  }
};
