const { errorResponse } = require("../helper/responses");
const cartModel = require("./../model/cart");

exports.checkout = async (req, res, next) => {
  try {
    const user = req.user;
    const { firstName, lastName, postallCode, fullAddress, phone, email } =
      req.body;

    const userCart = await cartModel.findOne({ user: user._id });
    if (!userCart || userCart.items.length < 1) {
      return errorResponse(res, 404, "Cart is Empty");
    }
  } catch (err) {
    next(err);
  }
};
