const express = require("express");
const path = require("path");
const { setHeaders } = require("./middleware/setHeaders");
const cookieParser = require("cookie-parser");

// Routers
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const apiDocRouter = require("./routes/swagger");

const app = express();

app.use(setHeaders);
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/images", express.static(path.resolve(__dirname, "public/images")));

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/apis", apiDocRouter);

module.exports = app;
