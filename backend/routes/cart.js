const express = require("express");

const validator = require("../middleware/validator");
const { auth } = require("../middleware/auth");
const { addToCartValidator } = require("../validator/cart");
const {
  addToCart,
  showUserCart,
  removeItemFromProduct,
} = require("../controller/cart");

const router = express.Router();

router
  .route("/")
  .post(auth, validator(addToCartValidator), addToCart)
  .get(auth, showUserCart);

router.route("/:itemId").delete(auth, removeItemFromProduct);

module.exports = router;
