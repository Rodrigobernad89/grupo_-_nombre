var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* GET users listing. */
 
router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/restore', usersController.restore);

module.exports = router;
