const { body } = require('express-validator');
var path = require('path');



module.exports = {
    product: [
        body("nombre_producto")
            .notEmpty()
            .withMessage("El campo de nombre es obligatorio")
            .isLength({min: 5, max: 20})
            .withMessage("Minimo 5, maximo 20"),
        body("precio")
            .notEmpty()
            .withMessage("El campo de precio es obligatorio")
            .isFloat()
            .withMessage('El campo debe ser un numero'),
        body("imagen")
            .custom(function(value, {req}){
            if(req.file){
                return true;
            }
            return req.file;
            })
            .withMessage("imagen obligatoria")
            .bail()
            .custom(function(value,{req}) {

            const acceptedExtensions = ['.jpg', '.jpeg', '.png'];

            const ext = path.extname(req.file.originalname)

            return acceptedExtensions.includes(ext);      
            })
            .withMessage("El archivo no es valido")

        ],
}