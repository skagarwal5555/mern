var express = require("express");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/product");
var orderRouter = require("./routes/order");
var cartRouter = require("./routes/cart");
var adminProductRouter = require("./routes/adminProduct");
const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());

//To allow a specific origin
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/admin/orders", orderRouter);
app.use("/api/v1/checkout", orderRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/admin/products", adminProductRouter);
app.use("/api/v1/profile", usersRouter);
app.use("/api/v1/homepage", indexRouter);
app.use("/api/v1/category", indexRouter);
app.use("/api/v1/products", productsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Express auth demo API works!" });
});

app.listen(PORT, (req, res) => {
  console.log(`Express server listening on PORT ${PORT}`);
});

module.exports = app;
