const express = require("express");
const {
  userLogin,
  userRegister,
  getNewAccessToken,
  getMe,
  resetPassword,
  verifyResetPasswordCode,
  getResetPasswordCode,
  logOut,
} = require("./../controller/auth");
const validator = require("./../middleware/validator");
const {
  registerValidator,
  getResetPassCodeValidator,
  resetPasswordValidator,
} = require("../validator/auth");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(validator(registerValidator), userRegister);
router.route("/login").post(userLogin);

router.route("/refresh").post(getNewAccessToken);

router.route("/me").get(auth, getMe);

router
  .route("/getCode")
  .post(validator(getResetPassCodeValidator), getResetPasswordCode);

router.route("/verifyCode").post(verifyResetPasswordCode);

router
  .route("/reset-password/:token")
  .post(validator(resetPasswordValidator), resetPassword);

router.route("/log-out").post(auth, logOut);

module.exports = router;
