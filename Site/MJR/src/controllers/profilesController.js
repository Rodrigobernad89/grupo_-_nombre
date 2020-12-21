const db= require('../database/models');
const{User,Role,Profile} = require('../database/models');
const bcrypt = require("bcryptjs");

// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');

const controller = {
  destroy: async(req,res)=>{
		try {
			const profileId=req.params.id;
			const toDelete = await Profile.findByPk(profileId,{include:['roles']})

			await toDelete.destroy();
			res.redirect('/roles')
		} catch (error) {
			console.log(error)
		}
	
  },
  update:  async (req, res) => {
    try {
      const data= await Profile.findOne({
        where:{
          id:req.params.id
        }
      })      
      res.render('profiles/update',{data});
    } catch (error) {
      console.log(error)
    }
    }, 
    change:async (req, res) => {
      try {
        const profileId=req.params.id;
        const changeProfile=await Profile.findByPk(profileId)
        await changeProfile.update(req.body)
        res.redirect('/roles')
      } catch (error) {
        console.log(error)
      }
    },
    register: async (req, res) => {
    
          res.render('profiles/crear')
       
    },
    store: async (req, res) => {
     
      try{          
        const newProfile=await Profile.create(req.body)	
        res.redirect('/roles');
      }catch (error) {
        console.log(error);
      }
      
    },
}

module.exports = controller;