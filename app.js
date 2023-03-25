require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var cors = require("cors");
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const { MONGODB_URI, API_VERSION } = require("./config");
const { SERVER_ERR } = require("./errors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var googleAuthRouter = require('./routes/google_auth');
var partnerRouter = require('./routes/partner');
var customerRouter = require('./routes/customer')
var app = express();

var allowlist = ['http://localhost:4200', 'http://localhost:3000', "https://cred-mantra.netlify.app"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));
app.use(apiLimiter);

app.use(express.static('public')); 
app.use('/images', express.static('images'));

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api' + API_VERSION + '/', indexRouter);
// app.use('/api' + API_VERSION + '/users', usersRouter);
// app.use('/api' + API_VERSION + '/auth', authRouter);
// app.use('/api' + API_VERSION + '/auth/google', googleAuthRouter);
// app.use('/api' + API_VERSION + '/partner', partnerRouter);
app.use('/api' + API_VERSION + '/customer', customerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)

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
