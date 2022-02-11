var express = require('express');
var router = express.Router();
const dbo = require('../db/conn');
var uuid = require('uuid')


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send({succes:true, msg:'fetching all users'});
  const dbConnect = dbo.getDb();

  const users = dbConnect
    .collection("users")
    .find({}).toArray((res,req)=>{
      console.log(req)
    })

    res.send(users)
    // console.log(users)
    })

router.post('/', function(req, res, next) {
  // res.send({success: true, Task:"Posting user"});
  const dbConnect = dbo.getDb();
  const matchDocument = {
    user_id: uuid.v1(),
    username:req.body.username,
    password: req.body.password,
    last_modified: new Date(),
  };
  console.log(req.body)

  if(!req.body.username || !req.body.password ){
    res.send({msg:'Please define user', succes:false})
  }else{
    dbConnect
    .collection("users")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");

      } else {
        console.log(`Added a new match with id ${matchDocument.username}`);
        res.status(201).send({success:true, msg:`Added a new match with id ${matchDocument.username}`});
      }
    });



  }



  


});
router.put('/:userId', function(req, res, next) {
  res.send(`Updating user with Id ${req.params.userId}`);
});
router.delete('/:userId', function(req, res, next) {
  res.send(`Deleting user with Id ${req.params.userId}`);
});


module.exports = router;
