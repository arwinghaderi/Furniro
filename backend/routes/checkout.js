const express = require("express");

const validator = require("../middleware/validator");

const router = express.Router();

router.route("/").post(auth, validator(checkoutValidator), checkout);

module.exports = router;
