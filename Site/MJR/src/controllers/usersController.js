const db= require('../database/models');
const{User,Role} = require('../database/models');
const bcrypt = require("bcryptjs");

// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');

const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const controller = {
    showLogin:(req, res) => {
      res.render('users/login')
      },
    processLogin: async (req,res) =>{
      try{
        const userFound = await User.findOne({
          include:['roles'],
          where: {email: req.body.email}})
        await userFound
        req.session.user = userFound;
        const rol = await Role.findOne({
          include:['profiles'],
          where: {id: userFound.roles[0].id}})
        req.session.rolsession = rol;
        if(req.body.rememberme){
          res.cookie("recordame", userFound.email, {maxAge: 1000 * 60})
        }
      
        res.redirect('/');
        
      } catch(error) {
        console.log(error)
      }
    },
    register: async (req, res) => {
      try {
        const roles=await Role.findAll();
          res.render('users/registrarse',{roles})
        } catch (error) {
          console.log(error)
        }
        
    },
    store: async (req, res) => {
      let passwordHash = bcrypt.hashSync(req.body.password, 10);
      try{          
        const newUser=await User.create(req.body)
        await newUser.addRoles(6)
        // console.log(passwordHash);
        // res.json(req.body);		
        res.redirect('/');
      }catch (error) {
        console.log(error);
      }
      
    },
    
      search: async (req, res) => {
        let userResults = req.body.results;
        try {
            userResults = await User.findAll({
				include:['roles'],
                where: {
                    first_name: { [Op.like]: '%' + userResults + '%' }
                }
			})
            res.render('users/index', { users: userResults });
        } catch (err) {
            console.log(err)
        }
        
    },
      update:  async (req, res) => {
        try {
          const user= await User.findOne({
            include:['roles'],
            where:{
              id:req.params.id
            }
          })
          const roles=await Role.findAll();
      //res.send(pelicula)
          res.render('users/update',{user,roles});
        } catch (error) {
          console.log(error)
        }
        },
        change:async (req, res) => {
          try {
            const userId=req.params.id;
            const changeUser=await User.findByPk(userId,{include:['roles']})
            await changeUser.removeRoles(changeUser.roles)
            await changeUser.addRoles(req.body.roles)
            await changeUser.update(req.body)
            res.redirect('/users')
          } catch (error) {
            console.log(error)
          }
  
        },
      restore: (req, res) => {
        res.render('users/restaurarContraseña')
      },
      index: async (req,res)=>{
        
        try {
          const users=await User.findAll({
            include:['roles']
            })
            res.render('users/index',{users})
        } catch (error) {
          console.log(error)
        }
    
       
      },

	destroy: async(req,res)=>{
		try {
			const userId=req.params.id;
			const toDelete = await User.findByPk(userId,{include:['roles']})
			
			await toDelete.removeRoles(toDelete.roles);
			await toDelete.destroy();
			res.redirect('/users')
		} catch (error) {
			console.log(error)
		}
	
  },
  logout: (req,res) => {
    req.session.destroy();
    res.clearCookie("recordame");
    res.redirect("/");
  }

    
}

module.exports = controller;