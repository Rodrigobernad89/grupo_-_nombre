const path = require('path');
const db= require('../database/models');
const{Item, Cart, Extra, Product} = require('../database/models')

// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');

const { validationResult } = require('express-validator');
const cart = require('../database/models/cart');
const items = require('../database/models/items');
const { product } = require('../Middlewares/rutas/validator');
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
        try {
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
                }).then((item) => {
                    return Item.findByPk(item.id, {include: ['product', 'extra']}); 
                }).then((item) => {
                    // res.json({item: item});
                    let extraItem = item.extras_id !== null ? item.extra.price : 0,
                        productItem = item.product.price,
                        itemTotal = parseInt(extraItem) + parseInt(productItem),
                        newTotal = parseInt(openCart[0].total) + itemTotal ;
    
                    // Actualizo total de carrito
                    return openCart[0].update({
                        total: newTotal
                    })
                }).then(() => {
                    res.redirect('/products');
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
                // res.json({response: 200, item: output});
                res.redirect('/products')
            }
        } catch(error) {
            console.log(error)
        }
    },
    update: async(req,res) => {
        try {
            let itemId = req.params.id;
            const ToUpdate = await Item.findByPk(itemId, {
                include: ['cart', 'product', 'extra']
            });
            let operacion = ToUpdate.qty < req.body.qty ? 'suma' : 'resta';
            itemExtra = ToUpdate.extra !== null ? parseInt(ToUpdate.extra.price) : 0;
            itemProduct = parseInt(ToUpdate.product.price);
            let itemUnit = itemProduct + itemExtra,
                itemTotal = itemUnit * parseInt(req.body.qty);

            await ToUpdate.update(req.body);

            let cart = await Cart.findByPk(ToUpdate.cart_id);
            if(operacion === 'suma')
                await cart.update({total: parseInt(cart.total) + itemUnit});
            else if(operacion === 'resta')
                await cart.update({total: parseInt(cart.total) - itemUnit});

            res.json({response: 200, item: ToUpdate, itemTotal: itemTotal, cart: cart});
        } catch (error) {
            console.log(error);
        }
    },
    purchase: async(req,res) => {
        try{
            let cartId = req.params.id;
            const ToPurchase = await Cart.findByPk(cartId);
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;

            ToPurchase.update({purchased_at: dateTime});
            res.redirect(`/purchase/${ToPurchase.id}`);
        } catch (error) {
            console.log(error);
        }
    },
    destroy: async(req,res) => {
		try {
			const itemId=req.params.id;
			const toDelete = await Item.findByPk(itemId, {include: ['product', 'extra']})
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;

            await toDelete.update({deleted_at: dateTime});
            
            let itemExtra = toDelete.extra !== null ? parseInt(toDelete.extra.price) : 0,
                itemProduct = parseInt(toDelete.product.price),
                itemUnit = itemProduct + itemExtra;
            
            let cart = await Cart.findByPk(toDelete.cart_id);
            
            await cart.update({total: parseInt(cart.total) - itemUnit});

			res.json({response: 200, item: toDelete});
		} catch (error) {
			console.log(error);
		}
    }
}

module.exports = controller;