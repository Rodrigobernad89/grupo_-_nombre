var express = require('express');
var router = express.Router();
var path = require('path');

const apiUsersController = require('../../controllers/api/apiUsersController');



/*Rutas para la api Users*/ 


/* GET users listing. */
router.get('/', apiUsersController.users);
router.get('/:id', apiUsersController.detail)
module.exports = router;
