const { errorResponse, successResponse } = require("../helper/responses");
const cartModel = require("./../model/cart");
const checkoutModel = require("./../model/checkoute");

exports.checkout = async (req, res, next) => {
  try {
    const user = req.user;
    const { firstName, lastName, postallCode, fullAddress, phone, email } =
      req.body;

    const userCart = await cartModel.findOne({ user: user._id });
    if (!userCart || userCart.items.length < 1) {
      return errorResponse(res, 404, "Cart is Empty");
    }
    await userCart.populate({
      path: "items.product",
      select:
        "-categoryId -description -label -rating -size -attributes -createdAt -updatedAt -__v",
    });

    const totalPrice = userCart.totalPrice;

    const checkoute = await checkoutModel.create({
      firstName,
      lastName,
      productItems: userCart.items,
      totalPrice: totalPrice.allPrice,
      postallCode,
      fullAddress,
      phone,
      email,
    });

    await cartModel.updateOne({ user: user._id }, { $set: { items: [] } });

    return successResponse(res, 201, {
      message: "Your order has been successfully placed",
      checkoute,
    });
  } catch (err) {
    next(err);
  }
};
