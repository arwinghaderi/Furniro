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
    const findUserOrderDoc = await checkoutModel.findOne({ user: user._id });

    if (findUserOrderDoc) {
      userCart.items.forEach((item) => {
        findUserOrderDoc.productItems.push({
          product: item.product._id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        });
      });
      await findUserOrderDoc.save();

      await cartModel.updateOne({ user: user._id }, { $set: { items: [] } });

      return successResponse(res, 201, {
        message: "Your order has been successfully placed",
        checkoute: findUserOrderDoc,
      });
    }

    const checkoute = await checkoutModel.create({
      user: user._id,
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

exports.getOrdersList = async (req, res, next) => {
  try {
    const user = req.user;

    const checkoutList = await checkoutModel.findOne({ user: user._id });

    await checkoutList.populate({
      path: "productItems.product",
      select:
        "-categoryId -description -label -rating -size -attributes -createdAt -updatedAt -__v",
    });

    checkoutList.productItems.reverse();

    return successResponse(res, 200, { checkoutList });
  } catch (err) {
    next(err);
  }
};
