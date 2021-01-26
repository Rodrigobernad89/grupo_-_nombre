const path = require('path');
const db= require('../database/models');
const{Item, Cart} = require('../database/models')

// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');

const { validationResult } = require('express-validator');
const cart = require('../database/models/cart');
const items = require('../database/models/items');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    index: async(req,res) =>{
        try{
            const items = await Item.findAll({
                where:{deleted_at: null},
                include:
                    [{
                        model: Cart,
                        as: 'cart',
                        where: {
                            user_id : req.session.user.id,
                            purchased_at: null,
                            deleted_at: null
                        }
                    },
                    'product',
                    'extra']
            });
            res.json(items);         
            // res.render('products/carrito', {items});
            // res.json(products);
        }catch (error) {
            console.log(error);
        }
    },
    store: async(req,res) => {
        // Verifico que exista un cart abierto para este usuario. Este tendría que tener las fechas deleted_at y purchased_at como null
        const openCart = await Cart.findAll({
            where:{
                user_id : req.session.user.id,
                deleted_at: null,
                purchased_at: null
            },
            include: {
                model: Item,
                as: 'items',
                include: ['product', 'extra']
            }, 
        });
        // res.json(openCart);
        let output;
        // Existe el carrito abierto?
        if (openCart.length){
            // res.json(openCart);
            //Creo Item
            await Item.create({
                cart_id: openCart[0].id,
                product_id: req.body.product_id,
                extras_id: req.body.extras_id !== '' ? req.body.extras_id : null,
                qty: req.body.qty
            });
            //Actualizo total de carrito
            await openCart[0].update({
                total: parseInt(openCart.total) + parseInt(req.body.total)
            });

            // output = openCart;
        // Si no tiene carrito abierto
        } else {
            //Creo carrito
            let newCart = await Cart.create({
                user_id : req.session.user.id,
                total: req.body.total
            });
            //Creo item con id de carrito
            await Item.create({
                cart_id: newCart.id,
                product_id: req.body.product_id,
                extras_id: req.body.extras_id !== '' ? req.body.extras_id : null,
                qty: req.body.qty
            });
            // output = newCart
        }
        
        // res.json({response: 200, item: output});
        res.redirect('/products')
    },
    destroy: async(req,res) => {
		try {
			const itemId=req.params.id;
			const toDelete = await Item.findByPk(itemId)
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;
            

			await toDelete.update({deleted_at: dateTime});
			res.json({response: 200, item: toDelete});
		} catch (error) {
			console.log(error)
		}
    },
}

module.exports = controller;