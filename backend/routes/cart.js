const express = require("express");

const validator = require("../middleware/validator");
const { auth } = require("../middleware/auth");
const {
  addToCartValidator,
  updateProductQuantityValidator,
} = require("../validator/cart");
const {
  addToCart,
  showUserCart,
  removeItemFromProduct,
  updateProductQuantity,
} = require("../controller/cart");

const router = express.Router();

router
  .route("/")
  .post(auth, validator(addToCartValidator), addToCart)
  .get(auth, showUserCart);

router
  .route("/:itemId")
  .delete(auth, removeItemFromProduct)
  .patch(
    auth,
    validator(updateProductQuantityValidator),
    updateProductQuantity
  );

module.exports = router;
