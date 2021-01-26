var express = require('express');
var router = express.Router();
const apiProductsController = require('../../controllers/api/apiProductsController')

/* GET home page. */
router.get('/', apiProductsController.index);

router.get('/:id', apiProductsController.detail)


module.exports = router;
