var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var nodemailer = require("nodemailer");
var twilio=require("twilio");

var indexRouter = require("./app/routes/index");
var multer=require("multer");
var upload = multer();

var app = express();
app.use(cors());
// app.use()
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(upload.single('myFile'));

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
  res.render({ message: err.message, status: err.status });
});


//HAVE A LOOK AT THIS (helpful while adding proxy n other things)
// https://www.tabnine.com/code/javascript/functions/express/Express/use
module.exports = app;