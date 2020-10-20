var express = require('express');
var router = express.Router();
const productController = require('../controllers/productsController');

router.get('/', productController.index); 
router.get('/detalle', productController.detail);
router.get('/carrito', productController.cart);
router.get('/crear', productController.create);
router.get('/editar', productController.edit);
module.exports = router;

