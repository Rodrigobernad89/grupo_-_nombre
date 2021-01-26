// const fs = require('fs');
const path = require('path');
const db= require('../database/models');
const{Product, Extra} = require('../database/models')
// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');



const { validationResult } = require('express-validator');
// const productsFilePath = path.join(__dirname, '../database/db_products.json');
// const leerJson = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");




const controller = {
    index: async(req,res) =>{
        try{
            const products = await Product.findAll();         
            res.render('products/productos',{products})
            // res.json(products);
        }catch (error) {
            console.log(error);
        }
    },
    detail: async(req,res) =>{
			try {
				let id = req.params.id;
				const productDetail = await Product.findByPk(id);
				const extras = await Extra.findAll({
					where:  {
						active: 1
					}
				});
				res.render('products/detalle-producto', {productDetail,extras,id})
			} catch (error) {
				console.log(error);
			}
    },
    cart:(req, res) => {
        res.render('products/carrito');
    },
    create:(req,res) => {
        res.render('products/formulario-creacion');
    },
    store: async (req, res) => {

		try{
			let nuevo_producto = {
				...req.body,
				image:req.file.filename
			}
			const newProduct = await Product.create(nuevo_producto)
			await newProduct
			// res.json(newProduct);
			res.redirect('/products/')
		}catch (error) {
			console.log(error);
		}

		// const errors = validationResult(req);

		// if(errors.isEmpty()){
		// 	const productos = leerJson();
		// 	let nuevo_producto = {
		// 		id:productos[productos.length -1].id +1,
		// 		...req.body,
		// 		imagen:req.file.filename
        //     }
            
		// 	let nuevaDB = JSON.stringify([...productos,nuevo_producto],null,2);
		// 	fs.writeFileSync(productsFilePath,nuevaDB);
		// 	res.redirect('/products/');	
		// } else {
		// 	res.render("products/formulario-creacion", { errors: errors.errors});
		// }
	},
    edit: async (req,res) =>{
        const productId = req.params.id;
        const toEdit = await Product.findByPk(productId);
        // res.send(toEdit);
        res.render('products/formulario-editar',{toEdit})
        // // const productos = leerJson();
		// let id = req.params.id;
		// productoAEditar = productos.find(producto => producto.id == id)
		// res.render('products/formulario-editar', {productoAEditar, id});
    },
    update: async(req,res)=>{
        const productId = req.params.id;
        const changedProduct = await Product.findByPk(productId)
		await changedProduct.update(req.body);
		// res.json(changedProduct);
		res.redirect('/products')
		// var productos = leerJson();
        // let id = req.params.id;
		// productos = productos.map(producto => {
		// 	if(producto.id == id){
		// 		producto.nombre_producto = req.body.nombre_producto;
        //         producto.descripcion = req.body.descripcion;
        //         producto.indicaciones = req.body.indicaciones;
		// 		producto.precio = req.body.precio;
		// 		producto.imagen = req.file.filename;
		// 	}	
		// 	return producto;
        // });
		// console.log(id);
		// let baseEditada =JSON.stringify(productos,null,2);
		// fs.writeFileSync(productsFilePath,baseEditada);
		// res.redirect('/products');	
	},
    destroy:async(req,res)=>{
        const productId = req.params.id;
        const toDelete = await Product.findByPk(productId);
        await toDelete.destroy();
        res.redirect('/products');
            // const productos = leerJson();
            // let id = req.params.id;
            // let productos_restantes = productos.filter(producto => producto.id != id);
            // let nueva_base = JSON.stringify(productos_restantes,null,2);
            // fs.writeFileSync(productsFilePath,nueva_base);
            // res.redirect('/products/');
    }
}

module.exports = controller;
