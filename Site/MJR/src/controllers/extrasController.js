const db= require('../database/models');
const{Extra} = require('../database/models');
const bcrypt = require("bcryptjs");

// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');

const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: async (req,res)=>{
    try {
      const extras=await Extra.findAll();
        res.render('extras/extras',{extras})
    } catch (error) {
      console.log(error)
    }
  },
  destroy: async(req,res)=>{
		try {
			const userId=req.params.id;
			const toDelete = await Extra.findByPk(userId);
			await toDelete.destroy();
			res.redirect('/extras')
		} catch (error) {
			console.log(error)
		}
	
  },
  update:  async (req, res) => {
    try {
      const rol= await Extra.findOne({
        where:{
          id:req.params.id
        }
      })
      
      res.render('extras/update',{rol});
    } catch (error) {
      console.log(error)
    }
    }, 
    change:async (req, res) => {
      try {
        const rolId=req.params.id;
        const changeRol=await Extra.findByPk(rolId)
        await changeRol.update(req.body);
        
        res.redirect('/extras')
      } catch (error) {
        console.log(error)
      }
    },
    register: async (req, res) => {
      try {
        const profiles=await Extra.findAll();
          res.render('extras/crear',{profiles})
        } catch (error) {
          console.log(error)
        } 
    },
    store: async (req, res) => {
      try{          
        const newRol=await Extra.create(req.body)
        res.redirect('/extras');
      }catch (error) {
        console.log(error);
      }
      
    },
}

module.exports = controller;