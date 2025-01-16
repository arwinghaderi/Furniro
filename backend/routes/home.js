const express = require("express");
const { homePage } = require("../controller/home");
const { optionalAuth } = require("../middleware/optionalAuth");

const router = express.Router();

router.route("/").get(optionalAuth, homePage);

module.exports = router;
