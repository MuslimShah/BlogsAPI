const express = require('express');
const controller = require('../contollers/auth');
const router = express.Router();

router.get('/', controller.getUsers);

module.exports = router;