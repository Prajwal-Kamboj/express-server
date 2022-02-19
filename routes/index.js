var express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.send({index: 'index page'})
});


router.get('/logout', function(req,res,next){
  res
  .clearCookie("token")
  .send({ logout : 'you logged out succesfully'})

})

module.exports = router;
