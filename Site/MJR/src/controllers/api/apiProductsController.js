const path = require('path');
const db= require('../../database/models');
const{Product} = require('../../database/models')
const {Op} = require('sequelize');

const { validationResult } = require('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    index: async(req,res) =>{
        try{
            const products = await Product.findAll();

    
            
            if(products.length > 0){
                let results ={
                    
                    metadata:{
                        status:200,
                        count: products.length,
                    },

                    data: {products}
                }

                res.json(results);
            }         
        }catch (error) {
            res.render(error);
            console.log(error);
        }
    },
    detail:async(req,res) =>{
        try {
            let id = req.params.id;
            const productDetail = await Product.findByPk(id);
            
            if(productDetail){
                let results = {
                    metadata:{
                        status:200,
                    },
                    
                    data:{productDetail}
                }

                res.json(results);
            }
            
        } catch (error) {
            console.log(error);
        }
    },
    
}

module.exports = controller;
