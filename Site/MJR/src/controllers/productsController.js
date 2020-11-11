const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');
const productsFilePath = path.join(__dirname, '../database/db_products.json');
const leerJson = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");




const controller = {
    index: (req, res) => {
        const productos = leerJson();
		res.render('products/productos', {productos});
      },
    detail: (req, res) => {
        const productos = leerJson();
		let id = req.params.id;
		const productoEncontrado = productos.find(producto => producto.id == id);
		res.render('products/detalle-producto', {productoEncontrado,toThousand})
    },
    cart:(req, res) => {
        res.render('products/carrito');
    },
    create:(req,res) => {
        res.render('products/formulario-creacion');
    },
    store: (req, res) => {

		const errors = validationResult(req);

		if(errors.isEmpty()){
			const productos = leerJson();
			let nuevo_producto = {
				id:productos[productos.length -1].id +1,
				...req.body,
				imagen:req.file.filename
            }
            
			let nuevaDB = JSON.stringify([...productos,nuevo_producto],null,2);
			fs.writeFileSync(productsFilePath,nuevaDB);
			res.redirect('/products/');	
		} else {
			res.render("products/formulario-creacion", { errors: errors.errors});
		}
	},
    edit:(req,res) => {
        const productos = leerJson();
		let id = req.params.id;
		productoAEditar = productos.find(producto => producto.id == id)
		res.render('products/formulario-editar', {productoAEditar, id});
    },
    update: (req, res) => {
		var productos = leerJson();
        let id = req.params.id;
		productos = productos.map(producto => {
			if(producto.id == id){
				producto.nombre_producto = req.body.nombre_producto;
                producto.descripcion = req.body.descripcion;
                producto.indicaciones = req.body.indicaciones;
				producto.precio = req.body.precio;
				producto.imagen = req.file.filename;
			}	
			return producto;
        });
		console.log(id);
		let baseEditada =JSON.stringify(productos,null,2);
		fs.writeFileSync(productsFilePath,baseEditada);
		res.redirect('/products');	
	},
    destroy:(req,res) => {
            const productos = leerJson();
            let id = req.params.id;
            let productos_restantes = productos.filter(producto => producto.id != id);
            let nueva_base = JSON.stringify(productos_restantes,null,2);
            fs.writeFileSync(productsFilePath,nueva_base);
            res.redirect('/products/');
    }
}

module.exports = controller;
