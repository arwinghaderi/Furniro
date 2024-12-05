const express = require("express");
const { userLogin, userRegister } = require("./../controller/auth");
const validator = require("./../middleware/validator");
const { registerValidator } = require("../validator/auth");

const router = express.Router();

router.route("/register").post(validator(registerValidator), userRegister);
router.route("/login").post(userLogin);

module.exports = router;
