var express = require('express');
var router = express.Router();
var path = require('path');
const rolesController = require('../controllers/rolesController');

/* GET users listing. */
router.get('/', rolesController.index);
router.delete('/delete/:id', rolesController.destroy);
router.get('/update/:id', rolesController.update); 
router.put('/update/:id', rolesController.change); 

router.get('/create', rolesController.register);
router.post('/create', rolesController.store);
module.exports = router;
