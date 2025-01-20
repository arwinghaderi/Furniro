const express = require("express");

const validator = require("../middleware/validator");
const { checkoutValidator } = require("../validator/checkout");
const { checkout, getOrdersList } = require("../controller/checkout");
const { auth } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(auth, validator(checkoutValidator), checkout)
  .get(auth, getOrdersList);

module.exports = router;
