var express = require('express');
var router = express.Router();
var path = require('path');
const authMiddleware = require('../Middlewares/rutas/authorization')
const cartController = require('../controllers/cartController');

router.get('/',authMiddleware, cartController.index);
router.post('/',authMiddleware,cartController.store);
router.delete('/:id', cartController.destroy);
module.exports = router;