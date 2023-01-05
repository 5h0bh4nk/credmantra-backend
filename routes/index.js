var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Hello");
  // send correct working response
  res.status(200).json({
    type: "success",
    message: "Server up and running",
  }); 

});

module.exports = router;
