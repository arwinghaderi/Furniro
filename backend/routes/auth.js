const express = require("express");
const {
  userLogin,
  userRegister,
  getNewAccessToken,
  getMe,
} = require("./../controller/auth");
const validator = require("./../middleware/validator");
const { registerValidator } = require("../validator/auth");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(validator(registerValidator), userRegister);
router.route("/login").post(userLogin);

router.route("/refresh").post(getNewAccessToken);

router.route("/me").get(auth, getMe);

module.exports = router;
