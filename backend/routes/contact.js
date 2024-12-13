const express = require("express");

const validator = require("../middleware/validator");
const { createConcatSchema } = require("../validator/concat");
const { createContact, getAllContact } = require("../controller/concat");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(validator(createConcatSchema), createContact)
  .get(auth, isAdmin, getAllContact);

module.exports = router;
