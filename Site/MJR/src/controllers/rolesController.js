const db= require('../database/models');
const{User,Role,Profile} = require('../database/models');
const bcrypt = require("bcryptjs");

// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');

const controller = {
  index: async (req,res)=>{
    try {
      const roles=await Role.findAll({include:['profiles']})
      const profiles=await Profile.findAll({include:['roles']});
     
        res.render('roles/roles',{roles,profiles})
    } catch (error) {
      console.log(error)
    }
   
  },
  destroy: async(req,res)=>{
		try {
			const rolId=req.params.id;
			const toDelete = await Role.findByPk(rolId,{include:['profiles']})
			
			await toDelete.removeProfiles(toDelete.profiles);
			await toDelete.destroy();
			res.redirect('/roles')
		} catch (error) {
			console.log(error)
		}
	
  },
  update:  async (req, res) => {
    try {
      const rol= await Role.findOne({
        include:['profiles'],
        where:{
          id:req.params.id
        }
      })

      const profiles=await Profile.findAll();
      
      res.render('roles/update',{rol,profiles});
    } catch (error) {
      console.log(error)
    }
    }, 
    change:async (req, res) => {
      try {
        const rolId=req.params.id;
        const changeRol=await Role.findByPk(rolId,{include:['profiles']})
        await changeRol.removeProfiles(changeRol.profiles)
        await changeRol.addProfiles(req.body.profiles)
        await changeRol.update(req.body);
        const rol = await Role.findOne({
          include:['profiles'],
          where: {id: req.session.user.roles[0].id}})
      req.session.rolsession = rol;
        res.redirect('/roles')
      } catch (error) {
        console.log(error)
      }
    },
    register: async (req, res) => {
      try {
        const profiles=await Profile.findAll();
          res.render('roles/crear',{profiles})
        } catch (error) {
          console.log(error)
        } 
    },
    store: async (req, res) => {
     console.log(req.body.profiles)
      try{          
        const newRol=await Role.create(req.body)
        
        await newRol.addProfiles(req.body.profiles)
        res.json(newRol)
        res.redirect('/roles');
      }catch (error) {
        console.log(error);
      }
      
    },
    addProfiles: async (req, res) => {
      try {
        const profiles=await Profile.findAll();
        const rolId=req.params.id;
        const rol=await Role.findByPk(rolId,{include:['profiles']})
          res.render('roles/addProfiles',{rol,profiles})
        } catch (error) {
          console.log(error)
        } 
    },

 

}

module.exports = controller;