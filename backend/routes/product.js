const express = require("express");

const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const { createProduct, removeProduct } = require("../controller/product");
const { multerStorage } = require("../middleware/uploader");

const upload = multerStorage("public/images/products");

const router = express.Router();

router.route("/").post(auth, isAdmin, upload.array("images", 4), createProduct);

router.route("/:productId").delete(auth, isAdmin, removeProduct);
module.exports = router;
