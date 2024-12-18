const express = require("express");
const path = require("path");
const { setHeaders } = require("./middleware/setHeaders");
const cookieParser = require("cookie-parser");

// Routers
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const newsletterRouter = require("./routes/newsletter");
const concatRouter = require("./routes/contact");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const apiDocRouter = require("./routes/swagger");
const { errorResponse } = require("./helper/responses");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(setHeaders);
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/images", express.static(path.resolve(__dirname, "public/images")));

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/newsletter", newsletterRouter);
app.use("/concat", concatRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/apis", apiDocRouter);
app.use("*", (req, res) => {
  return errorResponse(res, 404, {
    message: "404 Error ! Not Found this Routes :)",
  });
});

app.use(errorHandler);

module.exports = app;
