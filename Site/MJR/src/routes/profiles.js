var express = require('express');
var router = express.Router();
var path = require('path');
const profilesController = require('../controllers/profilesController');

/* GET users listing. */

router.delete('/delete/:id', profilesController.destroy);
router.get('/update/:id', profilesController.update); 
router.put('/update/:id', profilesController.change); 

router.get('/create', profilesController.register);
router.post('/create', profilesController.store);
module.exports = router;
