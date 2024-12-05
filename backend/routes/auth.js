const express = require("express");
const { userLogin, userRegister } = require("./../controller/auth");

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

module.exports = router;
