const db= require('../database/models');
const{User} = require('../database/models')
// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');




const controller = {
    login:(req, res) => {
      res.render('users/login')
      },
      register:(req, res) => {
        res.render('users/registrarse')
        },
      store: async (req, res) => {
        try{ 
          const newUser = await User.create(req.body);
          await newUser;
          // res.json(newUser);
          res.redirect('/');
        }catch (error) {
          console.log(error);
      }
       
      },
      restore: (req, res) => {
        res.render('users/restaurarContraseña')
      },
    
}

module.exports = controller;