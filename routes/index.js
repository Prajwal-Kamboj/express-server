var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  
  // res.render('index', { title: 'Prajwal', desc : 'authorisation app' });
  // console.log("hi")
});

module.exports = router;
