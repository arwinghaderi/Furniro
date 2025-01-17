const express = require("express");

const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const {
  createProduct,
  removeProduct,
  getProduct,
  getAllFavorites,
  addToFavorites,
  removeFromFavorites,
  getAllProducts,
  searchItem,
} = require("../controller/product");
const { multerStorage } = require("../middleware/uploader");
const { optionalAuth } = require("../middleware/optionalAuth");

const upload = multerStorage("public/images/products");

const router = express.Router();

router
  .route("/")
  .get(optionalAuth, getAllProducts)
  .post(auth, isAdmin, upload.array("images", 4), createProduct);

router.route("/:productId").delete(auth, isAdmin, removeProduct);

router.route("/favorites").get(auth, getAllFavorites);
router.route("/:slug").get(optionalAuth, getProduct);
router
  .route("/favorites/:productId")
  .post(auth, addToFavorites)
  .delete(auth, removeFromFavorites);

router.route("/search").post(optionalAuth, searchItem);
module.exports = router;
