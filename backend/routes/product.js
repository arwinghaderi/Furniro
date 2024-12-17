const express = require("express");

const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const { createProduct } = require("../controller/product");
const { multerStorage } = require("../middleware/uploader");
const validator = require("../middleware/validator");
const { createProductValidator } = require("./../validator/product");

const upload = multerStorage("public/images/products");

const router = express.Router();

router.route("/").post(auth, isAdmin, upload.array("images", 4), createProduct);

module.exports = router;
