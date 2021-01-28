// const fs = require('fs');
const path = require('path');
const db= require('../database/models');
const{Cart, Item} = require('../database/models')
// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');



const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");




const controller = {
    index: async(req,res) =>{
        try{
            const cart = await Cart.findByPk(req.params.id,{
                include: {
                    model: Item,
                    as: 'items',
                    where: {deleted_at: null},
                    include: ['product', 'extra']
                }
            });         
            res.render('purchases/purchase',{ cart})
            // res.json(products);
        }catch (error) {
            console.log(error);
        }
    }
}

module.exports = controller;
