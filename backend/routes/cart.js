const express = require("express");

const validator = require("../middleware/validator");
const { auth } = require("../middleware/auth");
const { addToCartValidator } = require("../validator/cart");
const { addToCart, showUserCart } = require("../controller/cart");

const router = express.Router();

router
  .route("/")
  .post(auth, validator(addToCartValidator), addToCart)
  .get(auth, showUserCart);

module.exports = router;
