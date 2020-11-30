var express = require('express');
var router = express.Router();
var path = require('path');
const usersController = require('../controllers/usersController');

/* GET users listing. */
 
router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.post('/register', usersController.store);
router.get('/restore', usersController.restore);

module.exports = router;
