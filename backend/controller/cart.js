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
          item.product.toString() === productId && item.color === req.body.color
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
              message: "You cannot add more than 5 of each product to the cart",
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
    //
  } catch (err) {
    next(err);
  }
};
