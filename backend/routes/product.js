const express = require("express");

const validator = require("../middleware/validator");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const { createProductValidator } = require("../validator/product");
const { createProduct } = require("../controller/product");

const router = express.Router();

router
  .route("/")
  .post(auth, isAdmin, validator(createProductValidator), createProduct);

module.exports = router;
