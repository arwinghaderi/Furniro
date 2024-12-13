const express = require("express");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const {
  createCategory,
  getAllCategories,
  removeCategory,
  updateCategoryInfo,
} = require("../controller/category");
const validator = require("../middleware/validator");
const {
  createCategoryValidator,
  updateCategoryValidator,
} = require("../validator/category");

const router = express.Router();

router
  .route("/")
  .post(auth, isAdmin, validator(createCategoryValidator), createCategory)
  .get(getAllCategories);

router
  .route("/:categoryId")
  .delete(auth, isAdmin, removeCategory)
  .put(auth, isAdmin, validator(updateCategoryValidator), updateCategoryInfo);

module.exports = router;
