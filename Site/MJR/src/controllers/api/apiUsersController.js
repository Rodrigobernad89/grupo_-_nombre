const db= require('../../database/models');
const{User,Role} = require('../../database/models');

// const { validationResult } = require('express-validator');
const {Op} = require('sequelize');

const { validationResult } = require('express-validator');
const controller = {
      users: async (req,res)=>{
        try {
          const usersList=await User.findAll({
            include:['roles']
            })
             if(usersList.length>0){
               var users=[];
                usersList.map(a=>{
                  users.push({id:a.id,name:a.first_name+' '+a.last_name,email:a.email,detail:'/api/users/'+a.id})
                })
                let result ={
                    count:users.length,
                    users
                }
                res.json(result)
              }
        } catch (error) {
          console.log(error)
        }
    
       
      },
      detail: async(req,res) =>{
        try {
          let id = req.params.id;
          const userDetail = await User.findByPk(id,{
            include:['roles']
            });
          res.json(userDetail)
        } catch (error) {
          console.log(error);
        }
      },

    
}

module.exports = controller;