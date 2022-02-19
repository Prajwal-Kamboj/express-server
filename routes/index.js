var express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let token;

  if(req.headers.authorization){
    token = req.headers.authorization.split(' ')[1];
    console.log('token', token)
  }else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if( token ){
    try{
      let decoded  = jwt.verify(token, process.env.JWT_SECRET);
      let user = await Users.findById(decoded.id);
      res.status(200).json({
        success: true,
        data: user
    })

    }catch(err){
      res.send({eror: err.message})
    }
  }else{
    res.send({msg:'Please log in '})
  }
});


router.get('/logout', function(req,res,next){
  res
  .clearCookie("token")
  .send({ logout : 'you logged out succesfully'})

})

module.exports = router;
