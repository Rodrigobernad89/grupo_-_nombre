var express = require('express');
var router = express.Router();
var path = require('path');
const authMiddleware = require('../Middlewares/rutas/authorization')
const cartController = require('../controllers/cartController');

router.get('/',authMiddleware, cartController.index);
router.post('/',authMiddleware,cartController.store);
router.put('/:id',authMiddleware,cartController.update);
router.get('/purchase/:id',authMiddleware,cartController.purchase);
router.delete('/:id', cartController.destroy);
module.exports = router;