const express = require("express");

const validator = require("../middleware/validator");
const { checkoutValidator } = require("../validator/checkout");
const { checkout } = require("../controller/checkout");

const router = express.Router();

router.route("/").post(auth, validator(checkoutValidator), checkout);

module.exports = router;
