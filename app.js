var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const passport = require("passport");

var app = express();

require("./config/database");
require("./config/passport")(passport);

app.use(passport.initialize()); //required for any passport strategy
app.use(cors());

var indexRouter = require("./routes/index");
var postsRouter = require("./routes/posts");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/posts", postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Return JSON response
  if (req.accepts("json")) {
    res.json({ message: err.message, error: err });
  } else {
    res.render("error");
  }
});

module.exports = app;
