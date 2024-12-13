const express = require("express");

const validator = require("../middleware/validator");
const {
  addToNewsletter,
  getAllNewsletters,
} = require("../controller/newsletter");
const { addToNewsletterValidator } = require("../validator/newsletter");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(validator(addToNewsletterValidator), addToNewsletter)
  .get(auth, isAdmin, getAllNewsletters);

module.exports = router;
