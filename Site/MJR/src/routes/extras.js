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

const extrasController = require('../controllers/extrasController');



router.get('/', extrasController.index); 
router.delete('/delete/:id',extrasController.destroy)
router.get('/update/:id', extrasController.update); 
router.put('/update/:id', extrasController.change); 

router.get('/create', extrasController.register);
router.post('/create', extrasController.store);
module.exports = router;

