var express = require('express');
var router = express.Router();
const dbo = require('../db/conn');


/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  res.send(`Getting user with Id ${req.params.userId}`);
});

router.post('/', function(req, res, next) {
  // res.send({success: true, Task:"Posting user"});
  const dbConnect = dbo.getDb();
  const matchDocument = {
    listing_id: req.body.id,
    last_modified: new Date(),
    session_id: req.body.session_id,
    direction: req.body.direction
  };

  dbConnect
    .collection("users")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });

});
router.put('/:userId', function(req, res, next) {
  res.send(`Updating user with Id ${req.params.userId}`);
});
router.delete('/:userId', function(req, res, next) {
  res.send(`Deleting user with Id ${req.params.userId}`);
});


module.exports = router;
