var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');
const validator = require("../Middlewares/rutas/validator");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  var upload = multer({ 
        
    storage: storage,

    fileFilter: (req,file,cb) => {
        const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname);
        if (!acceptedExtensions.includes(ext)){
            req.file = file;
        }
        cb(null, acceptedExtensions.includes(ext));
    }
})

const productController = require('../controllers/productsController');



router.get('/', productController.index); 
router.get('/crear', productController.create);
router.get('/carrito', productController.cart);
router.get('/:id', productController.detail);
router.post('/',upload.single('image'), validator.product,productController.store);
router.get('/:id/edit', productController.edit);
router.put('/:id',upload.single('image'),validator.product,productController.update)
router.delete('/:id',productController.destroy)
module.exports = router;

