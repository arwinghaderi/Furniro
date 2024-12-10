const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerDocuments = require("./../swagger/swagger.json");

const router = express.Router();

const swaggetOptions = {
  customCss: ".swagger-ui .topbar {display: none};",
};

router.use("/", swaggerUi.serve);

if (process.env.NODE_ENV === "production") {
  router.get("/", swaggerUi.setup(swaggerDocuments, swaggetOptions));
} else {
  router.get("/", swaggerUi.setup(swaggerDocuments, swaggetOptions));
}

module.exports = router;
