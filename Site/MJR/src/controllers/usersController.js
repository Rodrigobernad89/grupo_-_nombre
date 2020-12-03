const db= require('../database/models');
const{User,Role} = require('../database/models')
// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');




const controller = {
    login:(req, res) => {
      res.render('users/login')
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
        try{ 
          const newUser=await User.create(req.body)
				await newUser.addRoles(req.body.roles)
		
          res.redirect('/users');
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
	
	}

    
}

module.exports = controller;