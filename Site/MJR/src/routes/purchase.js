var express = require('express');
var router = express.Router();
var path = require('path');
const authMiddleware = require('../Middlewares/rutas/authorization')
const purchaseController = require('../controllers/purchaseController');

router.get('/:id',authMiddleware, purchaseController.index);
module.exports = router;