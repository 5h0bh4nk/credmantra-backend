var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

require("dotenv").config();

const { MONGODB_URI, API_INITIALS } = require("./config");
const { SERVER_ERR } = require("./errors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(API_INITIALS + '/', indexRouter);
app.use(API_INITIALS + '/users', usersRouter);
app.use(API_INITIALS + '/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // set the status and error message
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message || SERVER_ERR,
  });
});

async function main() {
  try {
    const connect = mongoose.connect(MONGODB_URI);
    connect.then(() => {
      console.log("Database connected");
    }, (err) => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();

module.exports = app;
