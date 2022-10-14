const {register, login, logout} = require('../controllers/auth');
const express = require('express');

const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
// router.get('/me', protect, getMe);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;