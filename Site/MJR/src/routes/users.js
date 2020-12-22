var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');
const validator = require("../Middlewares/rutas/validator");
const usersController = require('../controllers/usersController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname, '../../public/users'))
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



/* GET users listing. */
router.get('/', usersController.index);
router.get('/login', usersController.showLogin);
router.post('/login', usersController.processLogin)
router.get('/register', usersController.register);
router.post('/register', upload.single('image'),validator.user,usersController.store);
router.get('/restore', usersController.restore);
router.delete('/delete/:id', usersController.destroy);
router.get('/update/:id', usersController.update); 
router.put('/update/:id', upload.single('image'),validator.user, usersController.change); 
router.post('/search', usersController.search); 
router.post("/logout",usersController.logout)
module.exports = router;
