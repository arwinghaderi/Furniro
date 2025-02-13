const express = require("express");
const {
  getCategoryProducts,
  addProductToCompare,
} = require("../controller/compare");

const router = express.Router();

router.route("/products-by-category").get(getCategoryProducts);

router.route("/:productId").post(addProductToCompare);

module.exports = router;
