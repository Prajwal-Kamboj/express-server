const express = require('express');
const {register, login, googleSuccess} = require('../controllers/auth');


const {protect} = require('../middleware/auth');
// const Users = require('../models/Users');

const router = express.Router();

router.get('/',googleSuccess);

module.exports = router;