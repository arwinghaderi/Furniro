const express = require("express");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const { createCategory, getAllCategories } = require("../controller/category");
const validator = require("../middleware/validator");
const { createCategoryValidator } = require("../validator/category");

const router = express.Router();

router
  .route("/")
  .post(auth, isAdmin, validator(createCategoryValidator), createCategory)
  .get(getAllCategories);

module.exports = router;
