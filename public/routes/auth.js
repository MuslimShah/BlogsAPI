const express = require('express');
const {
    register,
    login
} = require('../contollers/auth');
const router = express.Router();

//POST==>REGISTERING USER
router.post('/register', register);
//POST ==>LOGIN USER
router.post('/login', login);
module.exports = router;