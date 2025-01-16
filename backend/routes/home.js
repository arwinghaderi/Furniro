const express = require("express");
const { homePage, addSlider, sliderInfo } = require("../controller/home");
const { optionalAuth } = require("../middleware/optionalAuth");
const { multerStorage } = require("./../middleware/uploader");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const validator = require("../middleware/validator");
const { addToNewsletterValidator } = require("../validator/slider");

const uploader = multerStorage("public/images/slider");

const router = express.Router();

router.route("/").get(optionalAuth, homePage);
router
  .route("/slider")
  .post(
    auth,
    isAdmin,
    uploader.single("image"),
    validator(addToNewsletterValidator),
    addSlider
  )
  .get(sliderInfo);

module.exports = router;
