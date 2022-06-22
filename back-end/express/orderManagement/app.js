var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var flash = require('connect-flash');
var session = require('express-session');

var adminDashRouter = require("./routes/adminDash");
var indexRouter = require("./routes/users");
const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

const app = express();
app.locals.moment = require('moment');

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',
resave: false,
saveUninitialized: true,
cookie: { secure: true }}));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use("/adminDash", adminDashRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, (req, res) => {
  console.log(`Express server listening on PORT ${PORT}`);
});

module.exports = app;
