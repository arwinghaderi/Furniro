const express = require("express");
const {
  userLogin,
  userRegister,
  getNewAccessToken,
} = require("./../controller/auth");
const validator = require("./../middleware/validator");
const { registerValidator } = require("../validator/auth");

const router = express.Router();

router.route("/register").post(validator(registerValidator), userRegister);
router.route("/login").post(userLogin);

router.route("/refresh").post(getNewAccessToken);

module.exports = router;
