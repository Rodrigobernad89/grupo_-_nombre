var express = require('express');
var router = express.Router();
var path = require('path');
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.index);
router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.post('/register', usersController.store);
router.get('/restore', usersController.restore);
router.delete('/delete/:id', usersController.destroy);
router.get('/update/:id', usersController.update); 
router.put('/update/:id', usersController.change); 
router.post('/search', usersController.search); 
module.exports = router;
