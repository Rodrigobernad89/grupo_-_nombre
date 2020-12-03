// const fs = require('fs');
const path = require('path');
const db= require('../database/models');
const{Product} = require('../database/models')
// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');
// const productsFilePath = path.join(__dirname, '../database/db_products.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const controller = {
    index: (req, res) => {
        res.render('index');
      },
      search: async(req,res) => {
        try{
            let searchResults = await Product.findAll({
                where:{
                    name:{[Op.like]: ('%' +req.body.busqueda +'%')}
                }
            })
            res.render('products/search',{searchResults});
        } catch(error) {
            console.log(error);
        }
    },
      
}

module.exports = controller;
